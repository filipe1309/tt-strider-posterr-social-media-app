import { ILogger } from 'src/domain/logger/logger.interface';
import { FollowModel } from 'src/domain/model/follow';
import { FollowRepository } from 'src/domain/repositories/followRepository.interface';

export class FollowUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly followRepository: FollowRepository,
  ) {}

  async execute(
    follower_id: string,
    followed_id: string,
  ): Promise<FollowModel> {
    const follow: FollowModel = {
      followed_id,
      follower_id,
    };
    const result = await this.followRepository.follow(follow);
    this.logger.log('FollowUserUseCases execute', 'A user have been followed');
    return result;
  }
}
