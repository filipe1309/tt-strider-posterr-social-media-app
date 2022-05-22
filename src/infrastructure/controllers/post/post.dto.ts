import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PostType } from '../../../domain/model/post';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(777, {
    message: 'Content is too long, max allowed: 777 chars.',
  })
  readonly content: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly type: PostType;

  @ApiProperty()
  @IsString()
  readonly post_id_from: string;
}
