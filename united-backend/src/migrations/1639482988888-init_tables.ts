import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1639482988888 implements MigrationInterface {
    name = 'initTables1639482988888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`association\` ADD \`iban\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`association\` DROP COLUMN \`iban\``);
    }

}
