import {MigrationInterface, QueryRunner} from "typeorm";

export class addTicketResponses1643053827713 implements MigrationInterface {
    name = 'addTicketResponses1643053827713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP FOREIGN KEY \`FK_8b454f68bb85a7ddeec0894c481\``);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP FOREIGN KEY \`FK_95d16daca5c4860a08ea961fa61\``);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP COLUMN \`ticketId\``);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD \`ticketIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD \`userIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD CONSTRAINT \`FK_800fa0245f8e60c1e87c8e38492\` FOREIGN KEY (\`ticketIdId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD CONSTRAINT \`FK_f18be16b5e5e4b20976cfd4e218\` FOREIGN KEY (\`userIdId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP FOREIGN KEY \`FK_f18be16b5e5e4b20976cfd4e218\``);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP FOREIGN KEY \`FK_800fa0245f8e60c1e87c8e38492\``);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP COLUMN \`userIdId\``);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` DROP COLUMN \`ticketIdId\``);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD \`ticketId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD CONSTRAINT \`FK_95d16daca5c4860a08ea961fa61\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_responses\` ADD CONSTRAINT \`FK_8b454f68bb85a7ddeec0894c481\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
