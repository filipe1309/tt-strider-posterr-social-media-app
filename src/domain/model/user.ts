export class UserModel {
  id: string;
  name: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  followers?: string[];
  following?: string[];
}
