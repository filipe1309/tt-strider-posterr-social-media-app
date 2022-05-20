import { PostModel } from 'src/domain/model/post';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';

export class GetPostUseCases {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: string): Promise<PostModel> {
    return await this.postRepository.findOne(id);
  }
}
