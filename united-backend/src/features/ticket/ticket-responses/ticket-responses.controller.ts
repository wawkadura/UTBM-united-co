import { Controller, Body, Post,HttpStatus ,Get, Param} from '@nestjs/common';
import { TicketResponsesDTO } from '../dto/ticket-responses.dto';
import { TicketResponsesService } from './ticket-responses.service';

@Controller('ticket/response')
export class TicketResponsesController {
    constructor(private readonly TicketResponsesService: TicketResponsesService){}

    @Post()
    async addTicketResponse(@Body() body: TicketResponsesDTO) {
      const data = await this.TicketResponsesService.addTicketResponse(body); 
      return {
        statusCode: HttpStatus.OK,
        message: 'Réponse enregistrée avec succès',
        data
      };
      
    }

    @Get(':ticketId')
    async getTicketResponses(@Param('ticketId') ticketId: number) {
      const data =  await this.TicketResponsesService.getTicketResponses(ticketId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Réponses récupérées avec succès',
        data
      };
    }
}
