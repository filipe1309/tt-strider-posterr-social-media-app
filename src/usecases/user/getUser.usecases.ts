import { UserModel } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

export class GetUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserModel> {
    return await this.userRepository.findOne(id);
  }
}
