import { UserModel } from 'src/domain/model/user';

export class UserPresenter {
  id: string;
  name: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  followers?: string[];
  following?: string[];

  constructor(user: UserModel) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
    this.followers = user.followers;
    this.following = user.following;
  }
}
