import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}
  async findAll(): Promise<UserModel[]> {
    const todosEntity = await this.userEntityRepository.find();
    return todosEntity.map((userEntity) => this.toUser(userEntity));
  }

  async findOne(id: string): Promise<UserModel> {
    const userEntity = await this.userEntityRepository.findOneOrFail({
      where: { id: id },
    });
    return this.toUser(userEntity);
  }

  private toUser(userEntity: User): UserModel {
    const user: UserModel = new UserModel();

    user.id = userEntity.id;
    user.name = userEntity.name;
    user.username = userEntity.username;
    user.created_at = userEntity.created_at;
    user.updated_at = userEntity.updated_at;

    return user;
  }

  private toUserEntity(user: UserModel): User {
    const userEntity: User = new User();

    userEntity.id = user.id;
    userEntity.name = user.name;
    userEntity.username = user.username;
    userEntity.created_at = user.created_at;
    userEntity.updated_at = user.updated_at;

    return userEntity;
  }
}
