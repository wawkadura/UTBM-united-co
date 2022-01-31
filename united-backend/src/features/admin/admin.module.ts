import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { users } from 'src/entity/user.entity';
import { association } from 'src/entity/association.entity';
import { ticket } from 'src/entity/ticket.entity';
import { invoice } from 'src/entity/invoice.entity';
import { service } from 'src/entity/service.entity';
import { payment } from 'src/entity/payment.entity';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [TypeOrmModule.forFeature([users, association, ticket, invoice, service, payment])]  
})
export class AdminModule {}
