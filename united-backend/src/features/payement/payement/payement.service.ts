import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { payment } from 'src/entity/payment.entity';
import { Repository } from 'typeorm';
import { threadId } from 'worker_threads';

@Injectable()
export class PayementService {
    constructor(@InjectRepository(payment) private paymentRepository: Repository<payment>){}

    async FindAllById(_id: number){
        return await this.paymentRepository.find({user_id:_id});
    }

    async Add(payement: payment){
        return await this.paymentRepository.save(payement);
    }
}
