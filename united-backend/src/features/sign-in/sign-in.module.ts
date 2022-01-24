import { Module } from '@nestjs/common';
import { SingInService } from './sign-in.service';
import { SingInController } from './sign-in.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [SingInService, PassportModule],
  controllers: [SingInController],
  imports: [
    TypeOrmModule.forFeature([users]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
    JwtStrategy,
  ]  
})
export class SingInModule {}
