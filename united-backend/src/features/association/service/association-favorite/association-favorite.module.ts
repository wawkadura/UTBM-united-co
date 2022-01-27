import { Module } from '@nestjs/common';
import { AssociationFavoriteController } from './association-favorite.controller';
import { AssociationFavoriteService } from './association-favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { favorite } from 'src/entity/favorite.entity';

@Module({
    controllers :[AssociationFavoriteController],
    providers:[AssociationFavoriteService],
    imports :[TypeOrmModule.forFeature([favorite])]
})
export class AssociationFavoriteModule {}
