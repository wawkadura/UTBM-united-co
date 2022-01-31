import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { service } from 'src/entity/service.entity';
import { serviceDTO} from '../dto/association.dto';
import { association } from 'src/entity/association.entity';

@Injectable()
export class AccountAssociatonService {
    constructor(@InjectRepository(service) private serviceRepository: Repository<service>){}

    //methode to create services 
    async createService(data: serviceDTO) {
        const result = this.serviceRepository.create(data);
        await this.serviceRepository.save(data);
        return result;
    }
    //methode to update a service
    async updateService(id: number, data: Partial<serviceDTO>) {
        await this.serviceRepository.update({ id }, data);
        return await this.serviceRepository.findOne({ id });
    }
    //methode to delete a service
    async destroy(id: number) {
        await this.serviceRepository.delete({ id });
        return { deleted: true };
    }
    //methode to get all services
    async GetAll(id:number){
        //return await this.serviceRepository.find({ where: { association_id: id } });
        const allDateQuery = getManager().createQueryBuilder()
        .select("sev.description","description")
        .addSelect("sev.price","price")
        .addSelect("sev.title","title")
        .addSelect("sev.id","id")
        .addSelect("ass.id","association_id")
        .from(service, "sev")
        .innerJoin(association, "ass", "sev.associationIdId = ass.user_id")
        .where("ass.user_id = :id", {
            id: id
        })
        //exécute de serie
        const data = await allDateQuery.getRawMany();
        return data; 

    }

}
