import { ILogger } from 'src/domain/logger/logger.interface';
import { UserModel } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class GetUsersUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserModel[]> {
    const result = await this.userRepository.findAll();
    this.logger.log('GetUsersUseCases execute', 'Some users have been get');
    return result;
  }
}
