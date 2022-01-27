import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { association } from 'src/entity/association.entity';
import { associationDTO } from '../dto/association.dto';
import { service } from 'src/entity/service.entity';
import { favorite } from 'src/entity/favorite.entity';

@Injectable()
export class AssociationService {
    constructor(@InjectRepository(association) private associationRepository: Repository<association>){}

    // get all associations
    async getAssociations(userId) {
        const query = await this.associationRepository.createQueryBuilder('asso')
            .select('distinct asso.*')
        if (userId && userId !== 'null')
            query.addSelect('fav.id as favorite')
                .leftJoin(favorite, 'fav', `asso.id = fav.association_id and fav.user_id = ${userId}`)
        return await query.getRawMany();
    }

    // create an association 
    async createAssociation(data: associationDTO) {
        const result = this.associationRepository.create(data);
        await this.associationRepository.save(data);
        return result;
    }

    // update an association
    async updateAssociationById(id: number, data: Partial<associationDTO>) {
        await this.associationRepository.update({ id }, data);
        return await this.associationRepository.findOne({ id });
    }

    // delete an association
    async deleteAssociationById(id: number) {
        await this.associationRepository.delete({ id });
        return { deleted: true };
    }

    // get services associated to an association
    async getServicesByAssociationId(associationId: number) {
        const query = this.associationRepository.createQueryBuilder('asso')
            .select('distinct serv.*')
            .innerJoin(service, 'serv', 'serv.association_id = asso.id')
            .where("serv.association_id = :id", { id: associationId });
        return await query.getRawMany();
    }
    
    // get association types
    async getAssociationTypes() {
        const query = this.associationRepository.createQueryBuilder('asso')
            .select('distinct asso.type')
        return await query.getRawMany();
    }

    // get date min and max values
    async getDateFilterMinMaxValues() {
        const query = this.associationRepository.createQueryBuilder('asso')
            .select("MIN(DATE_FORMAT(asso.created_at,'%Y'))", "min")
            .addSelect("MAX(DATE_FORMAT(asso.created_at,'%Y'))", "max")
        return await query.getRawOne();
    }
}
