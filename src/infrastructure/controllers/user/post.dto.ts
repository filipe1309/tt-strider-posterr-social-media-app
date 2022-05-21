import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PostType } from 'src/domain/model/post';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  @IsString()
  @MaxLength(777, {
    message: 'Content is too long, max allowed: 777 chars.',
  })
  readonly content: string;

  @IsString()
  readonly type: PostType;

  @IsString()
  readonly post_id_from: string;
}
