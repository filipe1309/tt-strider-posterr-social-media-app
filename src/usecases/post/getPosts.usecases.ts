import { ILogger } from '../../domain/logger/logger.interface';
import { PostModel } from '../../domain/model/post';
import { PostRepository } from '../../domain/repositories/postRepository.interface';

export class GetPostsUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(skip = 0, amount = 10): Promise<PostModel[]> {
    const result = await this.postRepository.loadByAmount(skip, amount);
    this.logger.log(
      'GetPostsUseCases execute',
      'Some posts have been retrieved',
    );
    return result;
  }
}
