import { PostModel } from '../model/post';

export interface PostRepository {
  findOne(id: string): Promise<PostModel>;
  insert(postModel: PostModel): Promise<PostModel>;
  loadByAmount(skip: number, amount: number): Promise<PostModel[]>;
  findByUserId(
    user_id: string,
    skip?: number,
    amount?: number,
  ): Promise<PostModel[]>;
  findByUsersId(users_id: string[], skip: number, amount): Promise<PostModel[]>;
}
