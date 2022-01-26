import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { favorite } from 'src/entity/favorite.entity';

@Injectable()
export class AssociationFavoriteService {
    constructor(@InjectRepository(favorite) private serviceRepository: Repository<favorite>){}
    
    // set favorite association for user
    async setFavorite(data: any) {
        const body = { user_id: data.user_id, association_id: data.association_id };
        const result = data.isFavorite ? 
            this.createAssociationFavorite(body) : 
            this.deleteAssociationFavoriteById(body);
        return result;
    }

    // create an association 
    async createAssociationFavorite(data: any) {
        const result = this.serviceRepository.create(data);
        await this.serviceRepository.save(data);
        return result;
    }

    // delete an association
    async deleteAssociationFavoriteById(data: any) {
        await this.serviceRepository.delete({ user_id: data.user_id, association_id: data.association_id });
        return { deleted: true };
    }
}
