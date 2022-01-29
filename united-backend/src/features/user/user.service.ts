import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import {favorite} from "../../entity/favorite.entity";
import {association} from "../../entity/association.entity";
import {associationDTO} from "../association/dto/association.dto";
import {UserDto} from "./dto/userDto";
import { payment } from '../../entity/payment.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(users) private userRepository: Repository<users>,
                @InjectRepository(favorite) private favoriteRepository: Repository<favorite>,
                @InjectRepository(association) private associationRepository: Repository<association>, 
                @InjectRepository(payment) private paymentRepository: Repository<payment>) {}

    async getUser(userId) {
        return this.userRepository.findOneOrFail(userId);
    }

    async updateUser(id: number, data: Partial<UserDto>) {
        await this.userRepository.update({ id }, data);
        return await this.userRepository.findOne({ id });
    }

    async getFavoriteAssociations(userId: number) {
        const favorites = await this.favoriteRepository.find({ where: { user_id: userId } });
        console.log('favorite');
        console.log(favorites);
    }

    async getUserPayment(userId) {
        return await this.paymentRepository.findOne({ where: { user_id: userId} });
    }

    async updateUserPassword(id: number, password: string) {
        const user: UserDto = await this.getUser(id);
        user.password = await bcrypt.hash(password, 10);

        await this.updateUser(id, user);
        return await this.getUser(id);
    }

    async updatePaymentInfo(id: number, data: Partial<UserDto>) {
        await this.paymentRepository.update({ id }, data);
        return await this.paymentRepository.findOne({ id });
    }
}
