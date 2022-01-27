import { Injectable } from '@nestjs/common';
import { users } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDTO } from './dto/sign-up.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SignUpService {
    constructor(@InjectRepository(users) private userRespository: Repository<users>){}
    
    async create(data: SignUpDTO) {
        const user = this.userRespository.create(data);
        await this.userRespository.save(data);
        return user;
    }

    async read(email:string) {
        const e = await this.userRespository.findOne({ where: { email: email } });
        return e
      }
}