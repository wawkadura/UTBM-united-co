import { Module } from '@nestjs/common';
import { AssociationController } from './association.controller';
import { AssociationFavoriteModule } from './association-favorite/association-favorite.module';
import { AssociationService } from './association.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { association } from 'src/entity/association.entity';

@Module({
    controllers :[AssociationController],
    providers:[AssociationService],
    imports :[TypeOrmModule.forFeature([association]), AssociationFavoriteModule]
})
export class AssociationModule {}
