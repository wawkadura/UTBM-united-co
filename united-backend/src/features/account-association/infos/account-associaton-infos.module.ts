import { Module } from '@nestjs/common';
import { association } from 'src/entity/association.entity';
import { AccountAssociatonInfosController } from './account-associaton-infos.controller';
import { AccountAssociatonInfosService } from './account-associaton-infos.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers :[AccountAssociatonInfosController],
    providers:[AccountAssociatonInfosService],
    imports :[TypeOrmModule.forFeature([association])]
})
export class AccountAssociatonInfosModule {}
