import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ILogger } from '../../domain/logger/logger.interface';
import { PostModel, PostType } from '../../domain/model/post';
import { MentionRepository } from '../../domain/repositories/mentionRepository.interface';
import { PostRepository } from '../../domain/repositories/postRepository.interface';
import { Mention } from '../../infrastructure/entities/mention.entity';

export class CreatePostUseCases {
  constructor(
    private readonly exceptionService: ExceptionsService,
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
    private readonly mentionRepository: MentionRepository,
  ) {}

  async execute(
    content: string,
    user_id: string, // TODO: validate user_id
    type: PostType,
    post_id_from?: string,
  ): Promise<PostModel> {
    if (await this.limitExceded(user_id)) {
      this.exceptionService.badRequestException({
        message: 'Number of posts (5) exceded!',
      });
    }

    this.validateContent(type, content);

    if (post_id_from) {
      try {
        await this.postRepository.findOne(post_id_from);
      } catch (error) {
        this.exceptionService.notFoundException({
          message: "Post (post_id_from) doesn't exists!",
        });
      }
    }

    const post = new PostModel();
    post.content = content;
    post.user_id = user_id;
    post.type = type;
    post.post_id_from = post_id_from;

    const result = await this.postRepository.insert(post);
    this.logger.log(
      'CreatePostUseCases execute',
      'New post have been inserted',
    );

    if (type !== PostType.POST) {
      const mention: Mention = {
        post_id_from: post_id_from,
        post_id_to: result.id.toString(),
      };
      await this.mentionRepository.insert(mention);
    }
    return result;
  }

  private validateContent(type: string, content: string | undefined): void {
    if (type === PostType.REPOST && content !== undefined) {
      this.exceptionService.badRequestException({
        message: 'Reposts can not have content!',
      });
    }

    if (type !== PostType.REPOST && content === undefined) {
      this.exceptionService.badRequestException({
        message: 'Posts & Quotes must have content!',
      });
    }

    if (content.length === 0) {
      this.exceptionService.badRequestException({
        message: 'Content is empty!',
      });
    }

    if (content.length > 777) {
      this.exceptionService.badRequestException({
        message: 'Number of chars of content (777) exceded!',
      });
    }
  }
  private async limitExceded(user_id: string): Promise<boolean> {
    const posts = await this.postRepository.findByUserId(user_id, 0, 0);
    let todayPosts = 0;
    for await (const post of posts) {
      todayPosts += this.isInToday(new Date(post.created_at)) ? 1 : 0;
    }
    console.log(todayPosts, posts.length);
    return todayPosts >= 5;
  }

  private isInToday(inputDate: Date): boolean {
    const today = new Date();
    return today.setHours(0, 0, 0, 0) === inputDate.setHours(0, 0, 0, 0);
  }
}
