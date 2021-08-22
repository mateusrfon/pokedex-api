import {MigrationInterface, QueryRunner} from "typeorm";

export class Tables1629590683075 implements MigrationInterface {
    name = 'Tables1629590683075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" character varying NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "token" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_pokemons_pokemons" ("usersId" integer NOT NULL, "pokemonsId" integer NOT NULL, CONSTRAINT "PK_f4bc246eaef14b3a2af7f2d16b3" PRIMARY KEY ("usersId", "pokemonsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_347130834a95292bc92f95eda1" ON "users_pokemons_pokemons" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_186672f1f8a7bc81e034438415" ON "users_pokemons_pokemons" ("pokemonsId") `);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_pokemons_pokemons" ADD CONSTRAINT "FK_347130834a95292bc92f95eda15" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_pokemons_pokemons" ADD CONSTRAINT "FK_186672f1f8a7bc81e034438415d" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_pokemons_pokemons" DROP CONSTRAINT "FK_186672f1f8a7bc81e034438415d"`);
        await queryRunner.query(`ALTER TABLE "users_pokemons_pokemons" DROP CONSTRAINT "FK_347130834a95292bc92f95eda15"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`DROP INDEX "IDX_186672f1f8a7bc81e034438415"`);
        await queryRunner.query(`DROP INDEX "IDX_347130834a95292bc92f95eda1"`);
        await queryRunner.query(`DROP TABLE "users_pokemons_pokemons"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
    }

}
