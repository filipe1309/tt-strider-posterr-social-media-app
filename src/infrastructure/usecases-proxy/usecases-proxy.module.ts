import { DynamicModule, Module } from '@nestjs/common';
import { GetUserUseCases } from '../../usecases/user/getUser.usecases';
import { GetUsersUseCases } from '../../usecases/user/getUsers.usecases';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_USER_USECASES_PROXY = 'getUserUsecasesProxy';
  static GET_USERS_USECASES_PROXY = 'getUsersUsecasesProxy';
  static POST_FOLLOW_USER_USECASES_PROXY = 'postFollowUserUsecasesProxy';
  static POST_UNFOLLOW_USER_USECASES_PROXY = 'postUnfollowUserUsecasesProxy';
  static POST_POST_USECASES_PROXY = 'postPostUsecasesProxy';
  static GET_POST_USECASES_PROXY = 'getPostUsecasesProxy';
  static GET_POSTS_USECASES_PROXY = 'getPostsUsecasesProxy';
  static GET_POST_BY_USER_USECASES_PROXY = 'getPostByUserUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new GetUserUseCases(logger, userRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new GetUsersUseCases(logger, userRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
      ],
    };
  }
}
