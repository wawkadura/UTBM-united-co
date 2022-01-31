import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { subscription } from 'src/entity/subscription.entity';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  imports: [TypeOrmModule.forFeature([subscription])]
})
export class SubscriptionModule {}
