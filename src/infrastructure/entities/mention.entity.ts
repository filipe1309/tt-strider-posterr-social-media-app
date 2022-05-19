import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Follower {
  @PrimaryColumn('uuid')
  post_id_from: string;

  @PrimaryColumn('uuid')
  post_id_to: string;
}
