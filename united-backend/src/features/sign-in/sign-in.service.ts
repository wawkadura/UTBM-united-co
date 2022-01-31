import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './dto/payloadToken';
import * as bcrypt from 'bcrypt';
import { GlobalConst } from './constants';

@Injectable()
export class SingInService {
    constructor(
        @InjectRepository(users) private usersRepository: Repository<users>, 
        private jwtService: JwtService
    ) {}

    //return user associated to the email
    async isEmailExist(email: string){
        const user = await this.usersRepository.findOne({where: {email: email}});
       
        return user;
    }

    //check if couple [email, password] exist in db
    async isPassOk(email: string, pass : string){
        const user = await this.isEmailExist(email); 
        if(user == null || user.state === false) {
            return null
        }
        //compare hash in DB and given password
        const isMatch = await bcrypt.compare(pass, user.password);
        if (isMatch) {
            return user;
        }
        return null;
    }

    //update user's password in db
    async updatePass(user: users, newPass: string){
        //hash password
        const hash = await bcrypt.hash(newPass, GlobalConst.salt);
        user.password = hash;
        const newUser = await this.usersRepository.save(user);
        return newUser;
    }

    //generate token. It contain userId
    async Login(payload: PayloadToken){
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
