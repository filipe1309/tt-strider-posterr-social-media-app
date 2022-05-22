import { PostModel } from '../../../domain/model/post';
import { ApiProperty } from '@nestjs/swagger';

export class PostPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  post_id_from?: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
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
