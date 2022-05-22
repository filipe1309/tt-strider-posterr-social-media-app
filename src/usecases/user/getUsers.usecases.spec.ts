import { Test } from '@nestjs/testing';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { DatabaseUserRepository } from '../../infrastructure/repositories/user.repository';
import { UseCaseProxy } from '../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../infrastructure/usecases-proxy/usecases-proxy.module';
import { GetUsersUseCases } from './getUsers.usecases';

const mockUserRepository = () => ({
  findAll: jest.fn(),
});

describe('GetUsersUseCases UseCase', () => {
  let userRepository;
  let sut: GetUsersUseCases;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) => new UseCaseProxy(new GetUsersUseCases(logger, userRepository)),
        },
        LoggerService,
        { provide: DatabaseUserRepository, useFactory: mockUserRepository },
      ],
    }).compile();
    sut = module
      .get(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
      .getInstance();
    userRepository = module.get(DatabaseUserRepository);
  });

  describe('FindAll', () => {
    it('call UserRepository.findAll and return the result', async () => {
      const mockUsers = [
        {
          id: 'any_id',
          name: 'any_name',
          username: 'any_username',
          created_at: 'any_created_at',
          updated_at: 'any_updated_at',
          followers: 'any_followers',
          following: 'any_following',
          posts: 'any_posts',
        },
      ];
      userRepository.findAll.mockResolvedValue(mockUsers);
      const result = await sut.execute();
      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });
});
