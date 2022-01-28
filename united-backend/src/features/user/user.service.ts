import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import {favorite} from "../../entity/favorite.entity";
import {association} from "../../entity/association.entity";
import {associationDTO} from "../association/dto/association.dto";
import {UserDto} from "./dto/userDto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(users) private userRepository: Repository<users>,
                @InjectRepository(users) private favoriteRepository: Repository<favorite>,
                @InjectRepository(users) private associationRepository: Repository<association>) {}

    async getUser(userId) {
        return this.userRepository.findOneOrFail(userId);
    }

    async updateUser(id: number, data: Partial<UserDto>) {
        await this.userRepository.update({ id }, data);
        return await this.userRepository.findOne({ id });
    }


    async getFavoriteAssociations(userId) {
        const associationId = this.favoriteRepository.find({ where: { user_i: userId } });
        console.log(associationId);
    }
}
