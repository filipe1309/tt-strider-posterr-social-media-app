import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PostType } from 'src/domain/model/post';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly type: PostType;

  @IsString()
  readonly post_id_from: string;
}
