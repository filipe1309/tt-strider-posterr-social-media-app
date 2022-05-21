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
import { CreatePostUseCases } from 'src/usecases/post/createPost.usecases';
import { GetPostUseCases } from 'src/usecases/post/getPost.usecases';
import { GetPostsUseCases } from 'src/usecases/post/getPosts.usecases';
import { GetPostsByUserUseCases } from 'src/usecases/post/getPostsByUser.usecases';
import { PostPresenter } from './post.presenter';
import { PostDto } from './post.dto';
import { GetPostsByFollowerUseCases } from 'src/usecases/post/getPostsByFollower.usecases';

@Controller('post')
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
  async getPost(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.getPostUsecasesProxy.getInstance().execute(id);
    return new PostPresenter(post);
  }

  @Get()
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
  async CreatePost(@Body() postDto: PostDto) {
    const { user_id, content, type, post_id_from } = postDto;
    await this.postPostUsecasesProxy
      .getInstance()
      .execute(content, user_id, type, post_id_from);
    return 'success';
  }
}
