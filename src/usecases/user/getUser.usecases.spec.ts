import { Test } from '@nestjs/testing';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { DatabaseFollowRepository } from '../../infrastructure/repositories/follow.repository';
import { DatabasePostRepository } from '../../infrastructure/repositories/post.repository';
import { DatabaseUserRepository } from '../../infrastructure/repositories/user.repository';
import { UseCaseProxy } from '../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { GetUserUseCases } from './getUser.usecases';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

const mockFollowRepository = () => ({
  getFollowersById: jest.fn(),
  getFollowingById: jest.fn(),
});

const mockPostRepository = () => ({
  findByUserId: jest.fn(),
});

describe('GetUserUseCases UseCase', () => {
  let userRepository;
  let followRepository;
  let postRepository;
  let sut: GetUserUseCases;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
        LoggerService,
        { provide: DatabaseUserRepository, useFactory: mockUserRepository },
        { provide: DatabaseFollowRepository, useFactory: mockFollowRepository },
        { provide: DatabasePostRepository, useFactory: mockPostRepository },
      ],
    }).compile();
    sut = module.get(UsecasesProxyModule.GET_USER_USECASES_PROXY).getInstance();
    userRepository = module.get(DatabaseUserRepository);
    followRepository = module.get(DatabaseFollowRepository);
    postRepository = module.get(DatabasePostRepository);
  });

  describe('FindOne', () => {
    it('call UserRepository.findOne and return the result', async () => {
      const mockUser = {
        id: 'any_id',
        name: 'any_name',
        username: 'any_username',
        created_at: 'any_created_at',
        updated_at: 'any_updated_at',
        followers: 'any_followers',
        following: 'any_following',
        posts: 'any_posts',
      };
      userRepository.findOne.mockResolvedValue(mockUser);
      followRepository.getFollowersById.mockResolvedValue([]);
      followRepository.getFollowingById.mockResolvedValue([]);
      postRepository.findByUserId.mockResolvedValue([]);
      const result = await sut.execute('any_id');
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });
});
