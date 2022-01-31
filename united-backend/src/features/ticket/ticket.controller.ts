import { Controller, Body, Post, HttpStatus, Get, Param, UseGuards } from '@nestjs/common';
import { TicketDTO } from './dto/ticket.dto';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from 'src/features/sign-in/jwt-auth.guard';

@Controller('ticket')
export class TicketController {
    constructor(private readonly TicketService: TicketService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addTicket(@Body() body: TicketDTO) {
      const data = await this.TicketService.addTicket(body); 
      return {
        statusCode: HttpStatus.OK,
        message: 'Ticket enregistré avec succès.',
        data
      };
      
    }

    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async getTickets(@Param('userId') userId: number) {
      const data =  await this.TicketService.getTickets(userId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Tickets fetched successfully',
        data
      };
    }
}
