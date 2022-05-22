import { ILogger } from 'src/domain/logger/logger.interface';
import { PostModel } from 'src/domain/model/post';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';

export class GetPostsByUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(user_id: string, skip = 0, amount = 10): Promise<PostModel[]> {
    const result = await this.postRepository.findByUserId(
      user_id,
      skip,
      amount,
    );
    this.logger.log(
      'GetPostsByUserUseCases execute',
      'Some posts of a user have been retrieved',
    );
    return result;
  }
}
