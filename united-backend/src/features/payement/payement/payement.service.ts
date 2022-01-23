import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { payment } from 'src/entity/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PayementService {
    constructor(@InjectRepository(payment) private paymentRepository: Repository<payment>){}

    async FindAllById(_id: number){
        return await this.paymentRepository.find({where: {user_id: _id}})
    }
}
