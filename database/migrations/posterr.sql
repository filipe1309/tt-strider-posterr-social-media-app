CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TYPE IF EXISTS post_type;

CREATE TYPE post_type AS ENUM ('POST', 'REPOST', 'QUOTE');

CREATE TABLE "public"."user" (
    "id" uuid DEFAULT uuid_generate_v4 () NOT NULL,
    "name" varchar(150),
    "username" varchar(14) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE ("username"),
    CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "IDX_b67337b7f8aa8406e936c2ff75" ON "public"."user" ("username");

CREATE TABLE "public"."follow" (
    "follower_id" varchar(36) NOT NULL,
    "followed_id" varchar(36) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_03b91d2b8321aa7ba32257dc322" PRIMARY KEY ("follower_id", followed_id),
    CONSTRAINT "follow_follower_id_foreign" FOREIGN KEY ("follower_id") REFERENCES "public"."user" ("id"),
    CONSTRAINT "follow_followed_id_foreign" FOREIGN KEY ("followed_id") REFERENCES "public"."user" ("id")
);

CREATE TABLE "public"."post" (
    "id" uuid DEFAULT uuid_generate_v4 () NOT NULL,
    "user_id" varchar(36) NOT NULL,
    "content" character varying(777),
    "post_id_from" varchar(36),
    type post_type,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_e87731bafd682f5a84e2449470f" PRIMARY KEY ("id"),
    CONSTRAINT "post_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id")
);

CREATE TABLE "public"."mention" (
    "post_id_from" varchar(36) NOT NULL,
    "post_id_to" varchar(36) NOT NULL,
    CONSTRAINT "PK_03b91d2b8321aa7ba32257dc323" PRIMARY KEY ("post_id_from", post_id_to),
    CONSTRAINT "mention_post_id_from_foreign" FOREIGN KEY ("post_id_from") REFERENCES "public"."post" ("id"),
    CONSTRAINT "mention_post_id_to_foreign" FOREIGN KEY ("post_id_to") REFERENCES "public"."post" ("id")
);
