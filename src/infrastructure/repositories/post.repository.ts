import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostModel, PostType } from '../../domain/model/post';
import { PostRepository } from '../../domain/repositories/postRepository.interface';
import { Post } from '../entities/post.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DatabasePostRepository implements PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postEntityRepository: Repository<Post>,
  ) {}
  async findOne(id: string): Promise<PostModel> {
    const result = await this.postEntityRepository.findOneBy({
      id: id,
    });
    return this.toPost(result);
  }
  async insert(postModel: PostModel): Promise<PostModel> {
    const result = await this.postEntityRepository.save(
      this.toPostEntity(postModel),
    );
    return this.toPost(result);
  }
  async loadByAmount(skip: number, amount = 10): Promise<PostModel[]> {
    const posts = await this.postEntityRepository.find({ skip, take: amount });
    return posts.map((post) => this.toPost(post));
  }
  async findByUserId(
    user_id: string,
    skip = 0,
    amount = 5,
  ): Promise<PostModel[]> {
    const posts = await this.postEntityRepository.find({
      where: { user_id },
      skip,
      take: amount,
    });
    return posts.map((post) => this.toPost(post));
  }

  async findByUsersId(
    users_id: string[],
    skip: number,
    amount = 5,
  ): Promise<PostModel[]> {
    const posts = await this.postEntityRepository.find({
      where: { id: In([...users_id]) },
      skip,
      take: amount,
    });
    return posts.map((post) => this.toPost(post));
  }

  private toPost(postEntity: Post): PostModel {
    const post: PostModel = new PostModel();

    post.id = postEntity.id;
    post.user_id = postEntity.user_id;
    post.content = postEntity.content;
    post.post_id_from = postEntity.post_id_from;
    post.type = postEntity.type;
    post.created_at = postEntity.created_at;

    return post;
  }

  private toPostEntity(post: PostModel): Post {
    const postEntity: Post = new Post();

    if (post.id) {
      postEntity.id = post.id;
    }
    postEntity.user_id = post.user_id;
    postEntity.content = post.content;
    postEntity.post_id_from = post.post_id_from;
    postEntity.type = post.type as PostType;
    postEntity.created_at = post.created_at;

    return postEntity;
  }
}
