import { Test } from '@nestjs/testing';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { DatabasePostRepository } from '../../infrastructure/repositories/post.repository';
import { UseCaseProxy } from '../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { GetPostsByUserUseCases } from './getPostsByUser.usecases';

const mockPostRepository = () => ({
  findByUserId: jest.fn(),
});

describe('GetPostsByUserUseCases UseCase', () => {
  let postRepository;
  let sut: GetPostsByUserUseCases;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
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
        LoggerService,
        { provide: DatabasePostRepository, useFactory: mockPostRepository },
      ],
    }).compile();
    sut = module
      .get(UsecasesProxyModule.GET_POSTS_BY_USER_USECASES_PROXY)
      .getInstance();
    postRepository = module.get(DatabasePostRepository);
  });

  describe('FindByUserId', () => {
    it('call PostRepository.findByUserId and return the result', async () => {
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
      postRepository.findByUserId.mockResolvedValue(mockPosts);
      const result = await sut.execute('any_id');
      expect(postRepository.findByUserId).toHaveBeenCalled();
      expect(result).toEqual(mockPosts);
    });
  });
});
