import { PostModel } from 'src/domain/model/post';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';

export class GetPostsByUserUseCases {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(
    user_id: string,
    skip: number,
    amount = 10,
  ): Promise<PostModel[]> {
    return await this.postRepository.findByUserId(user_id, skip, amount);
  }
}
