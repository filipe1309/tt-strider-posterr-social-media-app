import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FollowUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly follower_id: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly followed_id: string;
}
