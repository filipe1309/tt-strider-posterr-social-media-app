import { PostModel, PostType } from 'src/domain/model/post';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';

export class CreatePostUseCases {
  constructor(private readonly postRepository: PostRepository) {}

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
    return await this.postRepository.insert(post);
  }
}
