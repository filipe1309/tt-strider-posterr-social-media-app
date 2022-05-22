import { Injectable } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';
import { FollowRepository } from 'src/domain/repositories/followRepository.interface';
import { PostRepository } from 'src/domain/repositories/postRepository.interface';
import { UserModel } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';

@Injectable()
export class GetUserUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly followRepository: FollowRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(id: string): Promise<UserModel> {
    const result = await this.userRepository.findOne(id);
    if (result) {
      const followers = await this.followRepository.getFollowersById(id);
      result.followers = followers.map((follower) => follower.follower_id);
      const following = await this.followRepository.getFollowingById(id);
      result.following = following.map((following) => following.followed_id);

      // TODO: Add db count instead of find all posts from db
      const posts = await this.postRepository.findByUserId(id);
      result.posts = posts.length;
    }
    this.logger.log('GetUserUseCases execute', 'A user have been get');
    return result;
  }
}
