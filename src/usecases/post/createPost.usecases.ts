import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';
import { PostModel, PostType } from 'src/domain/model/post';
import { MentionRepository } from 'src/domain/repositories/mentionRepository.interface';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';
import { Mention } from 'src/infrastructure/entities/mention.entity';

export class CreatePostUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
    private readonly mentionRepository: MentionRepository,
  ) {}

  async execute(
    content: string,
    user_id: string,
    type: PostType,
    post_id_from?: string,
  ): Promise<PostModel> {
    if (await this.limitExceded(user_id)) {
      throw new ForbiddenException('Number of posts (5) exceded!');
    }

    if (content.length > 777) {
      throw new ForbiddenException('Number of chars of content (777) exceded!');
    }

    if (post_id_from) {
      try {
        await this.postRepository.findOne(post_id_from);
      } catch (error) {
        throw new NotFoundException("Post (post_id_from) doesn't exists!");
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

  private async limitExceded(user_id: string): Promise<boolean> {
    const posts = await this.postRepository.findByUserId(user_id);
    let todayPosts = 0;
    for await (const post of posts) {
      todayPosts += this.isInToday(new Date(post.created_at)) ? 1 : 0;
    }
    return todayPosts >= 5;
  }

  private isInToday(inputDate: Date): boolean {
    const today = new Date();
    return today.setHours(0, 0, 0, 0) == inputDate.setHours(0, 0, 0, 0);
  }
}
