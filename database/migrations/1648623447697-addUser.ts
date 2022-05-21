import { User } from 'src/infrastructure/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUser1648623447697 implements MigrationInterface {
  name = 'addUser1648623447697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE IF EXISTS post_type;`);
    await queryRunner.query(
      `CREATE TYPE post_type AS ENUM ('POST', 'REPOST', 'QUOTE');`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."user" ("id" varchar(36) NOT NULL, "name" varchar(150), "username" varchar(14) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE ("username"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"));`,
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
    ]);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b67337b7f8aa8406e936c2ff75" ON "public"."user" ("username");`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."follow" ("follower_id" varchar(36) NOT NULL, "followed_id" varchar(36) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc322" PRIMARY KEY ("follower_id", followed_id))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."post" ("id" varchar(36) NOT NULL, "user_id" varchar(36) NOT NULL, "content" character varying(255), "post_id_from" varchar(36), type post_type, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e87731bafd682f5a84e2449470f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."mention" ("post_id_from" varchar(36) NOT NULL, "post_id_to" varchar(36) NOT NULL, CONSTRAINT "PK_03b91d2b8321aa7ba32257dc323" PRIMARY KEY ("post_id_from", post_id_to))`,
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
