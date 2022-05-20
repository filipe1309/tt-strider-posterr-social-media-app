import { FollowModel } from 'src/domain/model/follow';
import { FollowRepository } from 'src/domain/repositories/followRepository.interface';

export class FollowUserUseCases {
  constructor(private readonly followRepository: FollowRepository) {}

  async execute(
    follower_id: string,
    followed_id: string,
  ): Promise<FollowModel> {
    const follow: FollowModel = {
      followed_id,
      follower_id,
    };
    return await this.followRepository.follow(follow);
  }
}
