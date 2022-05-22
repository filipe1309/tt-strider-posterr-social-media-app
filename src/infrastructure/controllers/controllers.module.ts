import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { PostController } from './post/post.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [UserController, PostController],
})
export class ControllersModule {}
