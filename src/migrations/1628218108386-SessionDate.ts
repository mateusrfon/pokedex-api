import {MigrationInterface, QueryRunner} from "typeorm";

export class SessionDate1628218108386 implements MigrationInterface {
    name = 'SessionDate1628218108386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "date"`);
    }

}
