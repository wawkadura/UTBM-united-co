import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(users) private userRepository: Repository<users>) {}

    async getUser(userId) {
        return this.userRepository.findOneOrFail(userId);
    }
}
