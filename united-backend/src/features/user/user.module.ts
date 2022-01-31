import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from '../../entity/user.entity';
import { association } from '../../entity/association.entity';
import { favorite } from '../../entity/favorite.entity';
import { payment } from '../../entity/payment.entity';
import { subscription } from '../../entity/subscription.entity';
import { invoice } from '../../entity/invoice.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([users, favorite, association, payment, subscription, invoice])],
})
export class UserModule {}
