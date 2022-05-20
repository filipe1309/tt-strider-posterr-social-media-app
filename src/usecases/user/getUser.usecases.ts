import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class GetUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<UserModel> {
    const result = await this.userRepository.findOne(id);
    this.logger.log('GetUserUseCases execute', 'A user have been get');
    return result;
  }
}
