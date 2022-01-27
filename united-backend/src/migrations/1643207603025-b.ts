import {MigrationInterface, QueryRunner} from "typeorm";

export class b1643207603025 implements MigrationInterface {
    name = 'b1643207603025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`association\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`acronym\` varchar(10) NULL, \`type\` varchar(50) NULL, \`email\` varchar(320) NOT NULL, \`description\` varchar(200) NULL, \`address\` varchar(100) NULL, \`city\` varchar(50) NULL, \`website\` varchar(200) NULL, \`telephone\` varchar(12) NULL, \`iban\` varchar(50) NULL, \`state\` tinyint NOT NULL DEFAULT 1, \`user_id\` int NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_6879674c7109f0cd3273e057d0\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(20) NOT NULL, \`lastName\` varchar(20) NOT NULL, \`email\` varchar(320) NOT NULL, \`password\` varchar(100) NOT NULL, \`role\` varchar(100) NOT NULL, \`email_verified_at\` datetime NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favorite\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`userIdId\` int NULL, \`associationIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`subject\` varchar(100) NULL, \`comment\` varchar(500) NULL, \`pickup_date\` datetime NULL, \`resolved_date\` datetime NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`userIdId\` int NULL, \`supportIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` blob NOT NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`ticketIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`newsletter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(320) NOT NULL, \`status\` int NOT NULL DEFAULT '1', UNIQUE INDEX \`IDX_7e3d2b10221e8b16279dac5831\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`password_reset\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(320) NOT NULL, \`token\` varchar(200) NOT NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`card_number\` bigint NULL, \`expire_date\` date NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`userIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`service\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`description\` varchar(500) NULL, \`price\` int NULL, \`state\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`associationIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subscription\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NULL, \`duration\` int NOT NULL, \`date\` datetime NOT NULL, \`state\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`userIdId\` int NULL, \`serviceIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_responses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(500) NULL, \`created_at\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`ticketIdId\` int NULL, \`userIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD CONSTRAINT \`FK_143bae860ce1bae7a8532627122\` FOREIGN KEY (\`userIdId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD CONSTRAINT \`FK_05444190acb50a244174dc70e01\` FOREIGN KEY (\`associationIdId\`) REFERENCES \`association\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_735db187ef67b85845cdf4c2bf3\` FOREIGN KEY (\`userIdId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_12e3d08fe1242623310ecffb3b1\` FOREIGN KEY (\`supportIdId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_8599227b7e110597f53a1f34762\` FOREIGN KEY (\`ticketIdId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_3dd21505bf38aeefe2e7fe6d404\` FOREIGN KEY (\`userIdId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service\` ADD CONSTRAINT \`FK_5e27aa5c530447ca6eecca4967b\` FOREIGN KEY (\`associationIdId\`) REFERENCES \`association\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_76f954b0122c58a298dc4f4d9d6\` FOREIGN KEY (\`userIdId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subscription\` ADD CONSTRAINT \`FK_632356bdd9bafd8079c702fcdc9\` FOREIGN KEY (\`serviceIdId\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD CONSTRAINT \`FK_800fa0245f8e60c1e87c8e38492\` FOREIGN KEY (\`ticketIdId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD CONSTRAINT \`FK_f18be16b5e5e4b20976cfd4e218\` FOREIGN KEY (\`userIdId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP FOREIGN KEY \`FK_f18be16b5e5e4b20976cfd4e218\``);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP FOREIGN KEY \`FK_800fa0245f8e60c1e87c8e38492\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_632356bdd9bafd8079c702fcdc9\``);
        await queryRunner.query(`ALTER TABLE \`subscription\` DROP FOREIGN KEY \`FK_76f954b0122c58a298dc4f4d9d6\``);
        await queryRunner.query(`ALTER TABLE \`service\` DROP FOREIGN KEY \`FK_5e27aa5c530447ca6eecca4967b\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_3dd21505bf38aeefe2e7fe6d404\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_8599227b7e110597f53a1f34762\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_12e3d08fe1242623310ecffb3b1\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_735db187ef67b85845cdf4c2bf3\``);
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP FOREIGN KEY \`FK_05444190acb50a244174dc70e01\``);
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP FOREIGN KEY \`FK_143bae860ce1bae7a8532627122\``);
        await queryRunner.query(`DROP TABLE \`ticket_responses\``);
        await queryRunner.query(`DROP TABLE \`subscription\``);
        await queryRunner.query(`DROP TABLE \`service\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP TABLE \`password_reset\``);
        await queryRunner.query(`DROP INDEX \`IDX_7e3d2b10221e8b16279dac5831\` ON \`newsletter\``);
        await queryRunner.query(`DROP TABLE \`newsletter\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP TABLE \`favorite\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_6879674c7109f0cd3273e057d0\` ON \`association\``);
        await queryRunner.query(`DROP TABLE \`association\``);
    }

}
