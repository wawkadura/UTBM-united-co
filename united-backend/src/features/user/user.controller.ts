import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('userId=:userId')
    async getUser(@Param('userId') userId: number) {
        const data = await this.userService.getUser(userId);
            return {
                statusCode: HttpStatus.OK,
                message: 'User fetched successfully',
                data
            };
    }
}
