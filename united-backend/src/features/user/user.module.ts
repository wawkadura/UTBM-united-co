import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from '../../entity/user.entity';
import { association } from '../../entity/association.entity';
import { favorite } from '../../entity/favorite.entity';
import { payment } from '../../entity/payment.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([users, favorite, association, payment])],
})
export class UserModule {}
