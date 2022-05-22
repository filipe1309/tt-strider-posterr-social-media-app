import { DynamicModule, Module } from '@nestjs/common';
import { CreatePostUseCases } from '../../usecases/post/createPost.usecases';
import { GetPostUseCases } from '../../usecases/post/getPost.usecases';
import { GetPostsUseCases } from '../../usecases/post/getPosts.usecases';
import { GetPostsByFollowerUseCases } from '../../usecases/post/getPostsByFollower.usecases';
import { GetPostsByUserUseCases } from '../../usecases/post/getPostsByUser.usecases';
import { FollowUserUseCases } from '../../usecases/user/followUser.usecases';
import { UnfollowUserUseCases } from '../../usecases/user/unfollowUser.usecases';
import { GetUserUseCases } from '../../usecases/user/getUser.usecases';
import { GetUsersUseCases } from '../../usecases/user/getUsers.usecases';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { DatabaseFollowRepository } from '../repositories/follow.repository';
import { DatabaseMentionRepository } from '../repositories/mention.repository';
import { DatabasePostRepository } from '../repositories/post.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [
    LoggerModule,
    RepositoriesModule,
    ExceptionsModule,
    EnvironmentConfigModule,
  ],
})
export class UsecasesProxyModule {
  static GET_USER_USECASES_PROXY = 'getUserUsecasesProxy';
  static GET_USERS_USECASES_PROXY = 'getUsersUsecasesProxy';
  static POST_FOLLOW_USER_USECASES_PROXY = 'postFollowUserUsecasesProxy';
  static POST_UNFOLLOW_USER_USECASES_PROXY = 'postUnfollowUserUsecasesProxy';
  static POST_POST_USECASES_PROXY = 'postPostUsecasesProxy';
  static GET_POST_USECASES_PROXY = 'getPostUsecasesProxy';
  static GET_POSTS_USECASES_PROXY = 'getPostsUsecasesProxy';
  static GET_POSTS_BY_USER_USECASES_PROXY = 'getPostsByUserUsecasesProxy';
  static GET_POSTS_BY_FOLLOWER_USECASES_PROXY =
    'getPostsByFollowerUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            DatabaseUserRepository,
            DatabaseFollowRepository,
            DatabasePostRepository,
          ],
          provide: UsecasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
            followRepository: DatabaseFollowRepository,
            postRepository: DatabasePostRepository,
          ) =>
            new UseCaseProxy(
              new GetUserUseCases(
                logger,
                userRepository,
                followRepository,
                postRepository,
              ),
            ),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new GetUsersUseCases(logger, userRepository)),
        },
        {
          inject: [LoggerService, DatabaseFollowRepository],
          provide: UsecasesProxyModule.POST_FOLLOW_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            followRepository: DatabaseFollowRepository,
          ) =>
            new UseCaseProxy(new FollowUserUseCases(logger, followRepository)),
        },
        {
          inject: [LoggerService, DatabaseFollowRepository],
          provide: UsecasesProxyModule.POST_UNFOLLOW_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            followRepository: DatabaseFollowRepository,
          ) =>
            new UseCaseProxy(
              new UnfollowUserUseCases(logger, followRepository),
            ),
        },
        {
          inject: [
            LoggerService,
            DatabasePostRepository,
            DatabaseMentionRepository,
          ],
          provide: UsecasesProxyModule.POST_POST_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
            mentionRepository: DatabaseMentionRepository,
          ) =>
            new UseCaseProxy(
              new CreatePostUseCases(logger, postRepository, mentionRepository),
            ),
        },
        {
          inject: [LoggerService, DatabasePostRepository],
          provide: UsecasesProxyModule.GET_POST_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
          ) => new UseCaseProxy(new GetPostUseCases(logger, postRepository)),
        },
        {
          inject: [LoggerService, DatabasePostRepository],
          provide: UsecasesProxyModule.GET_POSTS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
          ) => new UseCaseProxy(new GetPostsUseCases(logger, postRepository)),
        },
        {
          inject: [LoggerService, DatabasePostRepository],
          provide: UsecasesProxyModule.GET_POSTS_BY_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
          ) =>
            new UseCaseProxy(
              new GetPostsByUserUseCases(logger, postRepository),
            ),
        },
        {
          inject: [
            LoggerService,
            DatabasePostRepository,
            DatabaseFollowRepository,
          ],
          provide: UsecasesProxyModule.GET_POSTS_BY_FOLLOWER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
            followRepository: DatabaseFollowRepository,
          ) =>
            new UseCaseProxy(
              new GetPostsByFollowerUseCases(
                logger,
                postRepository,
                followRepository,
              ),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
        UsecasesProxyModule.POST_FOLLOW_USER_USECASES_PROXY,
        UsecasesProxyModule.POST_UNFOLLOW_USER_USECASES_PROXY,
        UsecasesProxyModule.POST_POST_USECASES_PROXY,
        UsecasesProxyModule.GET_POST_USECASES_PROXY,
        UsecasesProxyModule.GET_POSTS_USECASES_PROXY,
        UsecasesProxyModule.GET_POSTS_BY_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_POSTS_BY_FOLLOWER_USECASES_PROXY,
      ],
    };
  }
}
