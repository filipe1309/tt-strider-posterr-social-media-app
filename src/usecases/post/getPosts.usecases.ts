import { PostModel } from 'src/domain/model/post';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';

export class GetPostsUseCases {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(skip: number, amount = 10): Promise<PostModel[]> {
    return await this.postRepository.loadByAmount(skip, amount);
  }
}
