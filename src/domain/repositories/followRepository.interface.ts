import { FollowModel } from '../model/follow';

export interface FollowRepository {
  findAll(): Promise<FollowModel[]>;
  getFollowersById(id: string): Promise<FollowModel[]>;
  getFollowingById(id: string): Promise<FollowModel[]>;
  follow(follow: FollowModel): Promise<FollowModel>;
  unfollow(unfollow: FollowModel): Promise<void>;
}
