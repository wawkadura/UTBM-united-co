import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from "@nestjs/common";
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
            message: 'User\'s associations fetched successfully',
            data
        };
    }

    @Get('user=:userId/subscriptions')
    async getSubscriptions(@Param('userId') userId: number) {
        const data = await this.userService.getSubscriptions(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User\'s subscriptions fetched successfully',
            data
        };
    }

    @Delete('subscriptions/:id/delete')
    async removeSubscription(@Param('id') id: number) {
        await this.userService.removeSubscription(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Subscription deleted successfully',
        };
    }

    @Get('user=:userId/invoices')
    async getInvoices(@Param('userId') userId: number) {
        const data = await this.userService.getInvoices(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User\'s invoices fetched successfully',
            data
        };
    }

    @Get('user=:userId/payment')
    async getUserPayment(@Param('userId') userId: number) {
        const data = await this.userService.getUserPayment(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User payment fetched successfully',
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
        console.log(body);
        const data = await this.userService.updatePaymentInfo(body.userId, body.payment);
        return {
            statusCode: HttpStatus.OK,
            message: 'User payment info updated successfully.',
            data
        };

    }
}
