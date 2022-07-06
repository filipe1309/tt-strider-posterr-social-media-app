import { Follow } from 'src/infrastructure/entities/follow.entity';
import { Post } from 'src/infrastructure/entities/post.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUser1648623447697 implements MigrationInterface {
  name = 'addUser1648623447697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`DROP TYPE IF EXISTS post_type;`);
    await queryRunner.query(
      `CREATE TYPE post_type AS ENUM ('POST', 'REPOST', 'QUOTE');`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."user" ("id" uuid DEFAULT uuid_generate_v4 () NOT NULL, "name" varchar(150), "username" varchar(14) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE ("username"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"));`,
    );
    await queryRunner.manager.insert(User, [
      {
        id: 'b83f20a7-3d8a-4d74-9493-3434f6bd1d3c',
        name: 'John Doe',
        username: 'john.doe',
      },
      {
        id: 'f8256712-0a20-4a0c-ac56-d050c7345ab7',
        name: 'Bob Dylan',
        username: 'bob.dylan',
      },
      {
        id: '4e7af1b7-4efd-4962-8df8-1766a2a77367',
        name: 'Will Woll',
        username: 'will.woll',
      },
      {
        id: '31422a8a-f8a4-4d1d-b589-848e0be5fe43',
        name: 'Dont Follow',
        username: 'dont.follow',
      },
    ]);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b67337b7f8aa8406e936c2ff75" ON "public"."user" ("username");`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."follow" ("follower_id" varchar(36) NOT NULL, "followed_id" varchar(36) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc322" PRIMARY KEY ("follower_id", followed_id))`,
    );

    await queryRunner.query(
      `CONSTRAINT "follow_follower_id_foreign" FOREIGN KEY ("follower_id") REFERENCES "public"."user" ("id")`,
    );
    await queryRunner.query(
      `CONSTRAINT "follow_followed_id_foreign" FOREIGN KEY ("followed_id") REFERENCES "public"."user" ("id")`,
    );
    await queryRunner.manager.insert(Follow, [
      {
        follower_id: 'f8256712-0a20-4a0c-ac56-d050c7345ab7',
        followed_id: 'b83f20a7-3d8a-4d74-9493-3434f6bd1d3c',
      },
      {
        follower_id: '4e7af1b7-4efd-4962-8df8-1766a2a77367',
        followed_id: 'b83f20a7-3d8a-4d74-9493-3434f6bd1d3c',
      },
      {
        follower_id: 'b83f20a7-3d8a-4d74-9493-3434f6bd1d3c',
        followed_id: '4e7af1b7-4efd-4962-8df8-1766a2a77367',
      },
    ]);
    await queryRunner.query(
      `CREATE TABLE "public"."post" ("id" uuid DEFAULT uuid_generate_v4 () NOT NULL, "user_id" varchar(36) NOT NULL, "content" character varying(777), "post_id_from" varchar(36), type post_type, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e87731bafd682f5a84e2449470f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CONSTRAINT "post_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id")`,
    );

    await queryRunner.manager.insert(Post, [
      {
        user_id: 'b83f20a7-3d8a-4d74-9493-3434f6bd1d3c',
        content: 'Post DB 1',
        type: 'POST',
      },
      {
        user_id: 'b83f20a7-3d8a-4d74-9493-3434f6bd1d3c',
        content: 'Post DB 2',
        type: 'POST',
      },
      {
        user_id: 'f8256712-0a20-4a0c-ac56-d050c7345ab7',
        content: 'Post DB 3',
        type: 'POST',
      },
      {
        user_id: '31422a8a-f8a4-4d1d-b589-848e0be5fe43',
        content: 'Post DB 4 - Dont Follow',
        type: 'POST',
      },
    ]);

    await queryRunner.query(
      `CREATE TABLE "public"."mention" ("post_id_from" varchar(36) NOT NULL, "post_id_to" varchar(36) NOT NULL, CONSTRAINT "PK_03b91d2b8321aa7ba32257dc323" PRIMARY KEY ("post_id_from", post_id_to))`,
    );

    await queryRunner.query(
      `CONSTRAINT "mention_post_id_from_foreign" FOREIGN KEY ("post_id_from") REFERENCES "public"."post" ("id")`,
    );
    await queryRunner.query(
      `CONSTRAINT "mention_post_id_to_foreign" FOREIGN KEY ("post_id_to") REFERENCES "public"."post" ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b67337b7f8aa8406e936c2ff75"`,
    );
    await queryRunner.query(`DROP TABLE "public"."user"`);
    await queryRunner.query(`DROP TABLE "public"."post"`);
    await queryRunner.query(`DROP TABLE "public"."follow"`);
    await queryRunner.query(`DROP TABLE "public"."mention"`);
  }
}
