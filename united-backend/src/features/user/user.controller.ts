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

    @Post('modify')
    async updateUser(@Body() body: UserDto) {
        console.log(body);
        const data = await this.userService.updateUser(body.id, body);
        return {
            statusCode: HttpStatus.OK,
            message: 'Ticket enregistré avec succès.',
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
}
