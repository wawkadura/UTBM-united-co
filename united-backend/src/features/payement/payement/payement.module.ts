import { Module } from '@nestjs/common';
import { PayementService } from './payement.service';
import { PayementController } from './payement.controller';
import { payment } from 'src/entity/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PayementService],
  controllers: [PayementController],
  imports: [TypeOrmModule.forFeature([payment])]  
})
export class PayementModule {}
