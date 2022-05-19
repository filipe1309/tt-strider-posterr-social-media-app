import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column({ length: 777 })
  content: string;

  @Column({ nullable: true })
  post_id_from?: string;

  @Column()
  type: 'POST' | 'REPOST' | 'QUOTE';

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
