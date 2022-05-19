import { UserModel } from '../model/user';

export interface UserRepository {
  findAll(): Promise<UserModel[]>;
  findOne(id: string): Promise<UserModel>;
}
