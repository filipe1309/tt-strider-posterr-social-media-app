import { ILogger } from 'src/domain/logger/logger.interface';
import { PostModel, PostType } from 'src/domain/model/post';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';

export class CreatePostUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(
    content: string,
    user_id: string,
    type: PostType,
    post_id_from?: string,
  ): Promise<PostModel> {
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
    return result;
  }
}
