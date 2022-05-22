import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowModel } from '../../domain/model/follow';
import { FollowRepository } from '../../domain/repositories/followRepository.interface';
import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';

@Injectable()
export class DatabaseFollowRepository implements FollowRepository {
  constructor(
    @InjectRepository(Follow)
    private readonly followEntityRepository: Repository<Follow>,
  ) {}
  async getFollowersById(id: string): Promise<FollowModel[]> {
    const followers = await this.followEntityRepository.find({
      where: { followed_id: id },
    });
    return followers.map((follower) => this.toFollow(follower));
  }
  async getFollowingById(id: string): Promise<FollowModel[]> {
    const following = await this.followEntityRepository.find({
      where: { follower_id: id },
    });
    return following.map((followed) => this.toFollow(followed));
  }
  async follow(follow: FollowModel): Promise<FollowModel> {
    const result = await this.followEntityRepository.save(
      this.toFollowEntity(follow),
    );
    return this.toFollow(result);
  }
  async unfollow(unfollow: FollowModel): Promise<void> {
    await this.followEntityRepository.delete({
      follower_id: unfollow.follower_id,
      followed_id: unfollow.followed_id,
    });
  }
  async findAll(): Promise<FollowModel[]> {
    const todosEntity = await this.followEntityRepository.find();
    return todosEntity.map((followEntity) => this.toFollow(followEntity));
  }

  private toFollow(followEntity: Follow): FollowModel {
    const follow: FollowModel = new FollowModel();

    follow.followed_id = followEntity.followed_id;
    follow.follower_id = followEntity.follower_id;
    follow.created_at = followEntity.created_at;

    return follow;
  }

  private toFollowEntity(follow: FollowModel): Follow {
    const followEntity: Follow = new Follow();

    followEntity.followed_id = follow.followed_id;
    followEntity.follower_id = follow.follower_id;
    followEntity.created_at = follow.created_at;

    return followEntity;
  }
}
