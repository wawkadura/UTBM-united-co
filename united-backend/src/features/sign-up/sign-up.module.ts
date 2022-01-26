import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { users } from 'src/entity/user.entity';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
  imports: [TypeOrmModule.forFeature([users])]  
})
export class SignUpModule {}
