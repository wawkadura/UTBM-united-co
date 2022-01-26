import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Guard base on jwtStrategy (if does not have a token, access denied)
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}