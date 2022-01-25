import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadToken } from './dto/payloadToken';

export const JwtPayload = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PayloadToken => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
