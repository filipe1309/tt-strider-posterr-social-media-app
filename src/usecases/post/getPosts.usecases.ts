import { ILogger } from 'src/domain/logger/logger.interface';
import { PostModel } from 'src/domain/model/post';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';

export class GetPostsUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(skip: number, amount = 10): Promise<PostModel[]> {
    const result = await this.postRepository.loadByAmount(skip, amount);
    this.logger.log(
      'GetPostsUseCases execute',
      'Some posts have been retrieved',
    );
    return result;
  }
}
