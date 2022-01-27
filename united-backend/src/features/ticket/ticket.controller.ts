import { Controller, Body, Post, HttpStatus, Get, Param } from '@nestjs/common';
import { TicketDTO } from './dto/ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
    constructor(private readonly TicketService: TicketService){}

    @Post()
    async addTicket(@Body() body: TicketDTO) {
      const data = await this.TicketService.addTicket(body); 
      return {
        statusCode: HttpStatus.OK,
        message: 'Ticket enregistré avec succès.',
        data
      };
      
    }

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
