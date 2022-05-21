import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Follow } from '../entities/follow.entity';
import { Mention } from '../entities/mention.entity';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { DatabaseFollowRepository } from './follow.repository';
import { DatabaseMentionRepository } from './mention.repository';
import { DatabasePostRepository } from './post.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User, Post, Follow, Mention]),
    LoggerModule,
  ],
  providers: [
    DatabaseUserRepository,
    DatabasePostRepository,
    DatabaseFollowRepository,
    DatabaseMentionRepository,
    LoggerService,
  ],
  exports: [
    DatabaseUserRepository,
    DatabasePostRepository,
    DatabaseFollowRepository,
    DatabaseMentionRepository,
    LoggerService,
  ],
})
@Module({})
export class RepositoriesModule {}
