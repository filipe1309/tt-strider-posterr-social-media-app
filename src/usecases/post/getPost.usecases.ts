import { ILogger } from 'src/domain/logger/logger.interface';
import { PostModel } from 'src/domain/model/post';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';

export class GetPostUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(id: string): Promise<PostModel> {
    const result = await this.postRepository.findOne(id);
    this.logger.log('GetPostUseCases execute', 'A post have been retrieved');
    return result;
  }
}
