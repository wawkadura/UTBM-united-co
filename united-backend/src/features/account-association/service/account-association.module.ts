import { Module } from '@nestjs/common';
import { AccountAssociatonController } from './account-associaton.controller';
import { AccountAssociatonService } from './account-associaton.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { service } from 'src/entity/service.entity';

@Module({
    controllers :[AccountAssociatonController],
    providers:[AccountAssociatonService],
    imports :[TypeOrmModule.forFeature([service])]
})
export class AccountAssociationModule {}
