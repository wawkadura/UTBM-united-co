import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import {TicketDTO} from "../ticket/dto/ticket.dto";
import {UserDto} from "./dto/userDto";
import { JwtAuthGuard } from '../sign-in/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('user=:userId')
    async getUser(@Param('userId') userId: number) {
        const data = await this.userService.getUser(userId);
        const {password, ...user} = data;
            return {
                statusCode: HttpStatus.OK,
                message: 'User fetched successfully',
                user
            };
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Get('user=:userId/associations')
    async getFavoriteAssociations(@Param('userId') userId: number) {
        const data = await this.userService.getFavoriteAssociations(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User\'s associations fetched successfully',
            data
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('user=:userId/subscriptions')
    async getSubscriptions(@Param('userId') userId: number) {
        const data = await this.userService.getSubscriptions(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User\'s subscriptions fetched successfully',
            data
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('subscriptions/:id/delete')
    async removeSubscription(@Param('id') id: number) {
        await this.userService.removeSubscription(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Subscription deleted successfully',
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('user=:userId/invoices')
    async getInvoices(@Param('userId') userId: number) {
        const data = await this.userService.getInvoices(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User\'s invoices fetched successfully',
            data
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('user=:userId/payment')
    async getUserPayment(@Param('userId') userId: number) {
        const data = await this.userService.getUserPayment(userId);
        return {
            statusCode: HttpStatus.OK,
            message: 'User payment fetched successfully',
            data
        };
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
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
