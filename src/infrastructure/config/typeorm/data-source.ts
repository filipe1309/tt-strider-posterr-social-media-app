import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import { User } from './infrastructure/entities/user.entity';
// import { Follow } from './infrastructure/entities/follow.entity';
// import { Mention } from './infrastructure/entities/mention.entity';
// import { Post } from './infrastructure/entities/post.entity';
import config from './typeorm.config';

export const AppDataSource = new DataSource(config);
// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'postgres',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'postgres',
//   synchronize: false,
//   logging: false,
//   entities: [User, Post, Follow, Mention],
//   migrations: ['database/migrations/**/*{.ts,.js}'],
//   subscribers: [],
// });
