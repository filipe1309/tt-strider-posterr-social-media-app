import { Test } from '@nestjs/testing';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { DatabasePostRepository } from '../../infrastructure/repositories/post.repository';
import { UseCaseProxy } from '../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { GetPostUseCases } from './getPost.usecases';

const mockPostRepository = () => ({
  findOne: jest.fn(),
});

describe('GetPostUseCases UseCase', () => {
  let postRepository;
  let sut: GetPostUseCases;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          inject: [LoggerService, DatabasePostRepository],
          provide: UsecasesProxyModule.GET_POST_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            postRepository: DatabasePostRepository,
          ) => new UseCaseProxy(new GetPostUseCases(logger, postRepository)),
        },
        LoggerService,
        { provide: DatabasePostRepository, useFactory: mockPostRepository },
      ],
    }).compile();
    sut = module.get(UsecasesProxyModule.GET_POST_USECASES_PROXY).getInstance();
    postRepository = module.get(DatabasePostRepository);
  });

  describe('FindOne', () => {
    it('call PostRepository.findOne and return the result', async () => {
      const mockPost = {
        id: 'any_id',
        user_id: 'any_user_id',
        content: 'any_content',
        post_id_from: 'any_post_id_from',
        type: 'any_type',
        created_at: 'any_created_at',
      };
      postRepository.findOne.mockResolvedValue(mockPost);
      const result = await sut.execute('any_id');
      expect(postRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockPost);
    });
  });
});
