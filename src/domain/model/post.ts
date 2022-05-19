export enum PostType {
  POST = 'POST',
  REPOST = 'REPOST',
  QUOTE = 'QUOTE',
}

export class PostModel {
  id: string;
  user_id: string;
  content: string;
  post_id_from?: string;
  type: PostType;
  created_at: Date;
}
