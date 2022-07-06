import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { GetUserUseCases } from '../../../usecases/user/getUser.usecases';
import { GetUsersUseCases } from '../../../usecases/user/getUsers.usecases';
import { FollowUserUseCases } from '../../../usecases/user/followUser.usecases';
import { FollowUserDto } from './followUser.dto';
import { UnfollowUserUseCases } from '../../../usecases/user/unfollowUser.usecases';
import { UserPresenter } from './user.presenter';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUseCasesProxy: UseCaseProxy<GetUserUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getUsersUseCasesProxy: UseCaseProxy<GetUsersUseCases>,
    @Inject(UsecasesProxyModule.POST_FOLLOW_USER_USECASES_PROXY)
    private readonly followUserUseCasesProxy: UseCaseProxy<FollowUserUseCases>,
    @Inject(UsecasesProxyModule.POST_UNFOLLOW_USER_USECASES_PROXY)
    private readonly unfollowUserUseCasesProxy: UseCaseProxy<UnfollowUserUseCases>,
  ) {}

  @Get(':id')
  @ApiResponseType(UserPresenter, false)
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.getUserUseCasesProxy.getInstance().execute(id);
    return new UserPresenter(user);
  }

  @Get()
  @ApiResponseType(UserPresenter, true)
  async getUsers() {
    const users = await this.getUsersUseCasesProxy.getInstance().execute();
    return users.map((user) => new UserPresenter(user));
  }

  @Post('follow')
  async follow(@Body() followUserDto: FollowUserDto) {
    const { follower_id, followed_id } = followUserDto;
    await this.followUserUseCasesProxy
      .getInstance()
      .execute(follower_id, followed_id);
    return 'success';
  }

  @Delete('unfollow')
  async unfollow(@Body() followUserDto: FollowUserDto) {
    const { follower_id, followed_id } = followUserDto;
    await this.unfollowUserUseCasesProxy
      .getInstance()
      .execute(follower_id, followed_id);
    return 'success';
  }
}
