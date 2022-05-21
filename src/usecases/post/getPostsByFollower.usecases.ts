import { ILogger } from 'src/domain/logger/logger.interface';
import { PostModel } from 'src/domain/model/post';
import { FollowRepository } from 'src/domain/repositories/followRepository.interface';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';

export class GetPostsByFollowerUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  async execute(user_id: string, skip = 0, amount = 10): Promise<PostModel[]> {
    const followers = await this.followRepository.getFollowersById(user_id);

    const followersArr = followers.map((follower) => follower.follower_id);

    const result = await this.postRepository.findByUsersId(
      followersArr,
      skip,
      amount,
    );
    this.logger.log(
      'GetPostsByUserUseCases execute',
      'Some posts of a user have been retrieved',
    );
    return result;
  }
}
