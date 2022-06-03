import { MigrationInterface, QueryRunner } from "typeorm";

export class updateCartRelationship1654215137814 implements MigrationInterface {
    name = 'updateCartRelationship1654215137814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "dvdId" TO "dvd_id"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME CONSTRAINT "REL_9ed71a7c7e8e5e85c857bf7968" TO "UQ_b364c310aefb1f56d5e63f052e8"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "UQ_b364c310aefb1f56d5e63f052e8"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_b364c310aefb1f56d5e63f052e8" FOREIGN KEY ("dvd_id") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_b364c310aefb1f56d5e63f052e8"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "UQ_b364c310aefb1f56d5e63f052e8" UNIQUE ("dvd_id")`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME CONSTRAINT "UQ_b364c310aefb1f56d5e63f052e8" TO "REL_9ed71a7c7e8e5e85c857bf7968"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "dvd_id" TO "dvdId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
