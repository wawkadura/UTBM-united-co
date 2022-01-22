import { Module } from '@nestjs/common';
import { SingInService } from './sign-in.service';
import { SingInController } from './sign-in.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from 'src/entity/user.entity';

@Module({
  providers: [SingInService],
  controllers: [SingInController],
  imports: [TypeOrmModule.forFeature([users])]  
})
export class SingInModule {}
