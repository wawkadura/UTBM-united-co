import { Injectable } from '@nestjs/common';
import { association } from 'src/entity/association.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InfosDTO } from '../dto/association.dto';

@Injectable()
export class AccountAssociatonInfosService {
    constructor(@InjectRepository(association) private associationInfosRepository: Repository<association>){}

     //methode to update a association information
     async updateService(id: number, data: Partial<InfosDTO>) {
        await this.associationInfosRepository.update({ id }, data);
        return await this.associationInfosRepository.findOne({ id });
    }

    //methode to get all association information
    async GetAll(id:number): Promise<InfosDTO> {
        return await this.associationInfosRepository.findOne({ where: { id: id } });
    }

}
