import { UserModel } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class GetUsersUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserModel[]> {
    return await this.userRepository.findAll();
  }
}
