import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { subscription } from 'src/entity/subscription.entity';
import { Repository } from 'typeorm';
import { SubDto } from './dto/sub.dto';

@Injectable()
export class SubscriptionService {
    constructor(@InjectRepository(subscription) private subRepository:Repository<subscription>){}

    async addSub(subDto: SubDto){
        const isExist = await this.subRepository.findOne({where: 
            {
                user_id: subDto.user_id, 
                state: true, 
                service_id: subDto.service_id
            }
        })
        if(!isExist){
           return await this.subRepository.save(subDto)
        }
        return null;
    }
}
