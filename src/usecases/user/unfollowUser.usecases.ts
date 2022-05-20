import { FollowModel } from 'src/domain/model/follow';
import { FollowRepository } from 'src/domain/repositories/followRepository.interface';

export class UnfollowUserUseCases {
  constructor(private readonly followRepository: FollowRepository) {}

  async execute(follower_id: string, followed_id: string): Promise<void> {
    const follow: FollowModel = {
      followed_id,
      follower_id,
    };
    await this.followRepository.unfollow(follow);
  }
}
