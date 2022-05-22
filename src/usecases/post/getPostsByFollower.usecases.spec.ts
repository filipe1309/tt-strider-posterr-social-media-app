import { Test } from '@nestjs/testing';
import { DatabaseFollowRepository } from '../../infrastructure/repositories/follow.repository';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { DatabasePostRepository } from '../../infrastructure/repositories/post.repository';
import { UseCaseProxy } from '../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { GetPostsByFollowerUseCases } from './getPostsByFollower.usecases';

const mockPostRepository = () => ({
  findByUsersId: jest.fn(),
});

const mockFollowRepository = () => ({
  getFollowersById: jest.fn(),
});

describe('GetPostsByFollowerUseCases UseCase', () => {
  let postRepository;
  let followRepository;
  let sut: GetPostsByFollowerUseCases;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
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
        LoggerService,
        { provide: DatabasePostRepository, useFactory: mockPostRepository },
        { provide: DatabaseFollowRepository, useFactory: mockFollowRepository },
      ],
    }).compile();
    sut = module
      .get(UsecasesProxyModule.GET_POSTS_BY_FOLLOWER_USECASES_PROXY)
      .getInstance();
    postRepository = module.get(DatabasePostRepository);
    followRepository = module.get(DatabaseFollowRepository);
  });

  describe('findByUsersId', () => {
    it('call PostRepository.findByUsersId and return the result', async () => {
      const mockPosts = [
        {
          id: 'any_id',
          user_id: 'any_user_id',
          content: 'any_content',
          post_id_from: 'any_post_id_from',
          type: 'any_type',
          created_at: 'any_created_at',
        },
      ];
      postRepository.findByUsersId.mockResolvedValue(mockPosts);
      followRepository.getFollowersById.mockResolvedValue([]);
      const result = await sut.execute('any_id');
      expect(postRepository.findByUsersId).toHaveBeenCalled();
      expect(result).toEqual(mockPosts);
    });
  });
});
