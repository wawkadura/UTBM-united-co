import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {TicketDTO} from "../ticket/dto/ticket.dto";
import {UserDto} from "./dto/userDto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('user=:userId')
    async getUser(@Param('userId') userId: number) {
        const data = await this.userService.getUser(userId);
            return {
                statusCode: HttpStatus.OK,
                message: 'User fetched successfully',
                data
            };
    }

    @Post('modify/user')
    async updateUser(@Body() body: any) {
        console.log(body);
        const data = await this.userService.updateUser(body.id, body);
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully.',
            data
        };

    }

    @Get('user=:userId/associations')
    async getFavoriteAssociations(@Param('userId') userId: number) {
        const data = await this.userService.getFavoriteAssociations(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User fetched successfully',
            data
        };
    }

    @Get('user=:userId/payment')
    async getUserPayment(@Param('userId') userId: number) {
        const data = await this.userService.getUserPayment(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User payment successfully',
            data
        };
    }

    @Post('modify/password')
    async updateUserPassword(@Body() body: any) {
        console.log(body);
        const data = await this.userService.updateUserPassword(body.userId, body.password);
        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully.',
            data
        };

    }

    @Post('modify/payment')
    async updatePaymentInfo(@Body() body: any) {
        const data = await this.userService.updatePaymentInfo(body.userId, body.payment);
        return {
            statusCode: HttpStatus.OK,
            message: 'User payment info updated successfully.',
            data
        };

    }
}
