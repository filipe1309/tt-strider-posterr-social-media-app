import { Test } from '@nestjs/testing';
import { DatabaseFollowRepository } from '../../infrastructure/repositories/follow.repository';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { UseCaseProxy } from '../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { FollowUserUseCases } from './followUser.usecases';
import { UnfollowUserUseCases } from './unfollowUser.usecases';

const mockFollowRepository = () => ({
  unfollow: jest.fn(),
});

describe('UnfollowUserUseCases UseCase', () => {
  let followRepository;
  let sut: FollowUserUseCases;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
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
        LoggerService,
        { provide: DatabaseFollowRepository, useFactory: mockFollowRepository },
      ],
    }).compile();
    sut = module
      .get(UsecasesProxyModule.POST_UNFOLLOW_USER_USECASES_PROXY)
      .getInstance();
    followRepository = module.get(DatabaseFollowRepository);
  });

  describe('Unfollow', () => {
    it('call FollowRepository.unfollow and return the result', async () => {
      const mockFollow = {
        follower_id: 'any_id',
        followed_id: 'any_id_2',
      };
      followRepository.unfollow.mockResolvedValue(mockFollow);
      const result = await sut.execute(
        mockFollow.follower_id,
        mockFollow.followed_id,
      );
      expect(followRepository.unfollow).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
