import { UserModel } from '../../../domain/model/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  created_at: string;
  @ApiProperty()
  updated_at: Date;
  @ApiProperty()
  followers?: string[];
  @ApiProperty()
  followers_total?: number;
  @ApiProperty()
  following?: string[];
  @ApiProperty()
  following_total?: number;
  @ApiProperty()
  posts?: number;

  constructor(user: UserModel) {
    const created_at = new Date(user.created_at);
    const month = created_at.toLocaleString('default', { month: 'long' });

    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.created_at =
      month + ' ' + created_at.getDate() + ', ' + created_at.getFullYear();
    this.updated_at = user.updated_at;
    this.followers = user.followers;
    this.followers_total = user.followers ? user.followers.length : undefined;
    this.following = user.following;
    this.following_total = user.following ? user.following.length : undefined;
    this.posts = user.posts;
  }
}
