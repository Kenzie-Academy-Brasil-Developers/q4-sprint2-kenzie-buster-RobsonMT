import { hashSync } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export class initialCommit1653965207778 implements MigrationInterface {
  name = "initialCommit1653965207778";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "dvds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" character varying NOT NULL, "stockId" uuid, CONSTRAINT "REL_d1e620c0f75aa0d8341f2c768a" UNIQUE ("stockId"), CONSTRAINT "PK_bcd090a9e4428d665c5ace6f433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, "userId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders_dvds_dvds" ("ordersId" uuid NOT NULL, "dvdsId" uuid NOT NULL, CONSTRAINT "PK_bdcb939e23422d6e7a991a64415" PRIMARY KEY ("ordersId", "dvdsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ccc6d62bff473f5cda22e494d0" ON "orders_dvds_dvds" ("ordersId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1f7d31be3204c6db7ade159027" ON "orders_dvds_dvds" ("dvdsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_dvds_dvds" ADD CONSTRAINT "FK_ccc6d62bff473f5cda22e494d0d" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_dvds_dvds" ADD CONSTRAINT "FK_1f7d31be3204c6db7ade1590275" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `
        INSERT INTO "users" ("name", "email", "password", "isAdm")
        VALUES ('${process.env.ADMIN_NAME}', '${
        process.env.ADMIN_EMAIL
      }', '${hashSync(process.env.ADMIN_PASSWORD, 10)}', true)
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_dvds_dvds" DROP CONSTRAINT "FK_1f7d31be3204c6db7ade1590275"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_dvds_dvds" DROP CONSTRAINT "FK_ccc6d62bff473f5cda22e494d0d"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1f7d31be3204c6db7ade159027"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ccc6d62bff473f5cda22e494d0"`
    );
    await queryRunner.query(`DROP TABLE "orders_dvds_dvds"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "dvds"`);
    await queryRunner.query(`DROP TABLE "stock"`);
  }
}
