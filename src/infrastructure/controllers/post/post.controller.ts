import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { CreatePostUseCases } from '../../../usecases/post/createPost.usecases';
import { GetPostUseCases } from '../../../usecases/post/getPost.usecases';
import { GetPostsUseCases } from '../../../usecases/post/getPosts.usecases';
import { GetPostsByUserUseCases } from '../../../usecases/post/getPostsByUser.usecases';
import { PostPresenter } from './post.presenter';
import { PostDto } from './post.dto';
import { GetPostsByFollowerUseCases } from '../../../usecases/post/getPostsByFollower.usecases';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';

@Controller('post')
@ApiTags('post')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(PostPresenter)
export class PostController {
  constructor(
    @Inject(UsecasesProxyModule.POST_POST_USECASES_PROXY)
    private readonly postPostUsecasesProxy: UseCaseProxy<CreatePostUseCases>,
    @Inject(UsecasesProxyModule.GET_POST_USECASES_PROXY)
    private readonly getPostUsecasesProxy: UseCaseProxy<GetPostUseCases>,
    @Inject(UsecasesProxyModule.GET_POSTS_USECASES_PROXY)
    private readonly getPostsUsecasesProxy: UseCaseProxy<GetPostsUseCases>,
    @Inject(UsecasesProxyModule.GET_POSTS_BY_USER_USECASES_PROXY)
    private readonly getPostsByUserUsecasesProxy: UseCaseProxy<GetPostsByUserUseCases>,
    @Inject(UsecasesProxyModule.GET_POSTS_BY_USER_USECASES_PROXY)
    private readonly getPostsByFollowerUsecasesProxy: UseCaseProxy<GetPostsByFollowerUseCases>,
  ) {}

  @Get(':id')
  @ApiResponseType(PostPresenter, false)
  async getPost(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.getPostUsecasesProxy.getInstance().execute(id);
    return new PostPresenter(post);
  }

  @Get()
  @ApiResponseType(PostPresenter, true)
  async getPosts(@Query() query: { skip: number; amount: number }) {
    const { skip, amount } = query;
    console.log('skip', skip);
    console.log('amount', amount);
    const posts = await this.getPostsUsecasesProxy
      .getInstance()
      .execute(skip, amount);
    return posts.map((post) => new PostPresenter(post));
  }

  @Get('follower/:id')
  async getPostsByFollower(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: { skip: number; amount: number },
  ) {
    const { skip, amount } = query;
    const posts = await this.getPostsByFollowerUsecasesProxy
      .getInstance()
      .execute(id, skip, amount);
    return posts.map((post) => new PostPresenter(post));
  }

  @Get('user/:id')
  async getPostsByUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: { skip: number; amount: number },
  ) {
    const { skip, amount } = query;
    const posts = await this.getPostsByUserUsecasesProxy
      .getInstance()
      .execute(id, skip, amount);
    return posts.map((post) => new PostPresenter(post));
  }

  @Post()
  async createPost(@Body() postDto: PostDto) {
    const { user_id, content, type, post_id_from } = postDto;
    await this.postPostUsecasesProxy
      .getInstance()
      .execute(content, user_id, type, post_id_from);
    return 'success';
  }
}
