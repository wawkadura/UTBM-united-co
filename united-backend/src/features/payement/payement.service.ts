import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { payment } from 'src/entity/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PayementService {
    constructor(@InjectRepository(payment) private paymentRepository: Repository<payment>){}

    async FindAllById(_id: number){
        return await this.paymentRepository.find({user_id:_id});
    }

    async Add(payement: payment){
        const alreadyExist = await this.paymentRepository.findOne({where: {card_number: payement.card_number}})

        if(!alreadyExist){
            return await this.paymentRepository.save(payement);
        }
        return null;
    }
}
