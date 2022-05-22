import { PostModel } from '../../../domain/model/post';

export class PostPresenter {
  id: string;
  user_id: string;
  content: string;
  post_id_from?: string;
  type: string;
  created_at: Date;

  constructor(post: PostModel) {
    this.id = post.id;
    this.user_id = post.user_id;
    this.content = post.content;
    this.post_id_from = post.post_id_from;
    this.type = post.type;
    this.created_at = post.created_at;
  }
}
