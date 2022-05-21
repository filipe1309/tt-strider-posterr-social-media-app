import { IsNotEmpty, IsString } from 'class-validator';

export class FollowUserDto {
  @IsNotEmpty()
  @IsString()
  readonly follower_id: string;

  @IsNotEmpty()
  @IsString()
  readonly followed_id: string;
}
