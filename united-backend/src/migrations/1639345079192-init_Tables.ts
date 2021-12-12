import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1639345079192 implements MigrationInterface {
    name = 'initTables1639345079192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`association\` (\`id\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(20) NOT NULL, \`acronym\` varchar(10) NULL, \`type\` varchar(50) NULL, \`email\` varchar(320) NOT NULL, \`description\` varchar(200) NULL, \`address\` varchar(100) NULL, \`city\` varchar(50) NULL, \`website\` varchar(200) NULL, \`telephone\` varchar(12) NULL, \`state\` tinyint NOT NULL, \`user_id\` int NOT NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_6879674c7109f0cd3273e057d0\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favorite\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(100) NULL, \`comment\` varchar(500) NULL, \`pickup_date\` datetime NULL, \`resolved_date\` datetime NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` blob NOT NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`password_reset\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(320) NOT NULL, \`token\` varchar(200) NOT NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`iban\` varchar(50) NULL, \`card_number\` int NULL, \`expire_date\` date NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`service\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tittle\` varchar(100) NOT NULL, \`description\` varchar(500) NULL, \`price\` int NULL, \`state\` tinyint NOT NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subscription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NULL, \`duration\` int NOT NULL, \`date\` datetime NOT NULL, \`state\` tinyint NOT NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(320) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`DROP TABLE \`subscription\``);
        await queryRunner.query(`DROP TABLE \`service\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP TABLE \`password_reset\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP TABLE \`favorite\``);
        await queryRunner.query(`DROP INDEX \`IDX_6879674c7109f0cd3273e057d0\` ON \`association\``);
        await queryRunner.query(`DROP TABLE \`association\``);
    }

}
