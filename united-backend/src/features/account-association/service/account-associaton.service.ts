import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { service } from 'src/entity/service.entity';
import { serviceDTO} from '../dto/association.dto';

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
    async GetAll() {
        return await this.serviceRepository.find();
    }

}
