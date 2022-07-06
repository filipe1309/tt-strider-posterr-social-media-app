import { Test } from '@nestjs/testing';
import { DatabaseFollowRepository } from '../../infrastructure/repositories/follow.repository';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { UseCaseProxy } from '../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { FollowUserUseCases } from './followUser.usecases';
import { ExceptionsService } from '../../infrastructure/exceptions/exceptions.service';

const mockFollowRepository = () => ({
  follow: jest.fn(),
});

describe('FollowUserUseCases UseCase', () => {
  let followRepository;
  let sut: FollowUserUseCases;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          inject: [ExceptionsService, LoggerService, DatabaseFollowRepository],
          provide: UsecasesProxyModule.POST_FOLLOW_USER_USECASES_PROXY,
          useFactory: (
            exceptionsService: ExceptionsService,
            logger: LoggerService,
            followRepository: DatabaseFollowRepository,
          ) =>
            new UseCaseProxy(
              new FollowUserUseCases(
                exceptionsService,
                logger,
                followRepository,
              ),
            ),
        },
        ExceptionsService,
        LoggerService,
        { provide: DatabaseFollowRepository, useFactory: mockFollowRepository },
      ],
    }).compile();
    sut = module
      .get(UsecasesProxyModule.POST_FOLLOW_USER_USECASES_PROXY)
      .getInstance();
    followRepository = module.get(DatabaseFollowRepository);
  });

  describe('Follow', () => {
    it('call FollowRepository.follow and return the result', async () => {
      const mockFollow = {
        follower_id: 'any_id',
        followed_id: 'any_id_2',
        created_at: 'any_date',
      };
      followRepository.follow.mockResolvedValue(mockFollow);
      const result = await sut.execute(
        mockFollow.follower_id,
        mockFollow.followed_id,
      );
      expect(followRepository.follow).toHaveBeenCalled();
      expect(result).toEqual(mockFollow);
    });
  });
});
