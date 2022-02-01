import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { service } from 'src/entity/service.entity';
import { serviceDTO} from '../dto/association.dto';
import { association } from 'src/entity/association.entity';
import { users } from 'src/entity/user.entity';
import { subscription } from 'src/entity/subscription.entity';

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
    //methode to delete a service this set state to false 
    async destroyUpdateState(id: number, data:Partial<serviceDTO>) {
        await this.serviceRepository.update({ id },data);
        
        await getManager().createQueryBuilder()
        .update(subscription)
        .set({state:false})
        .where("service_id= :id",{
            id: id
        })
        .execute();
        console.log(id)
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
        .innerJoin(association, "ass", "sev.association_id = ass.id")
        .where("ass.user_id = :id", {
            id: id
        })
        .andWhere("sev.state = :state", {
            state: true
        })
        //exécute de serie
        const data = await allDateQuery.getRawMany();
        return data; 

    }

    //methode to get a association information
    async GetOne(id:number){
        //return await this.serviceRepository.find({ where: { association_id: id } });
        const allDateQuery = getManager().createQueryBuilder()
        .select("ass.id","id")
        .from(association, "ass")
        .innerJoin(users, "u", "ass.user_id = u.id")
        .where("ass.user_id = :id", {
            id: id
        })
        //exécute de serie
        const data = await allDateQuery.getRawMany();
        return data; 

    }

}
