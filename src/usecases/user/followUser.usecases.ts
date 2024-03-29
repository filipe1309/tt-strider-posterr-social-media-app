import { BadRequestException } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';
import { FollowModel } from 'src/domain/model/follow';
import { FollowRepository } from 'src/domain/repositories/followRepository.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class FollowUserUseCases {
  constructor(
    private readonly exceptionService: ExceptionsService,
    private readonly logger: ILogger,
    private readonly followRepository: FollowRepository,
  ) {}

  async execute(
    follower_id: string,
    followed_id: string,
  ): Promise<FollowModel> {
    if (follower_id === followed_id) {
      throw new BadRequestException('Follower and Follwed must be different!');
    }

    const follow: FollowModel = {
      followed_id,
      follower_id,
    };
    const result = await this.followRepository.follow(follow);
    this.logger.log('FollowUserUseCases execute', 'A user have been followed');
    return result;
  }
}
