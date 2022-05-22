import { Test } from '@nestjs/testing';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { DatabasePostRepository } from '../../infrastructure/repositories/post.repository';
import { UseCaseProxy } from '../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { GetPostsUseCases } from './getPosts.usecases';

const mockPostRepository = () => ({
  loadByAmount: jest.fn(),
});

describe('GetPostsUseCases UseCase', () => {
  let postRepository;
  let sut: GetPostsUseCases;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          inject: [LoggerService, DatabasePostRepository],
          provide: UsecasesProxyModule.GET_POSTS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
          ) => new UseCaseProxy(new GetPostsUseCases(logger, postRepository)),
        },
        LoggerService,
        { provide: DatabasePostRepository, useFactory: mockPostRepository },
      ],
    }).compile();
    sut = module
      .get(UsecasesProxyModule.GET_POSTS_USECASES_PROXY)
      .getInstance();
    postRepository = module.get(DatabasePostRepository);
  });

  describe('LoadByAmount', () => {
    it('call PostRepository.loadByAmount and return the result', async () => {
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
      postRepository.loadByAmount.mockResolvedValue(mockPosts);
      const result = await sut.execute();
      expect(postRepository.loadByAmount).toHaveBeenCalled();
      expect(result).toEqual(mockPosts);
    });
  });
});
