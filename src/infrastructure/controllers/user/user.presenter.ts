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
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
  @ApiProperty()
  followers?: string[];
  @ApiProperty()
  following?: string[];
  @ApiProperty()
  posts?: number;

  constructor(user: UserModel) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
    this.followers = user.followers;
    this.following = user.following;
    this.posts = user.posts;
  }
}
