import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ticketResponses } from 'src/entity/ticket_responses.entity';
import { TicketResponsesController } from './ticket-responses.controller';
import { TicketResponsesService } from './ticket-responses.service';

@Module({
  controllers: [TicketResponsesController],
  providers: [TicketResponsesService],
  imports: [TypeOrmModule.forFeature([ticketResponses])]  
})
export class TicketResponsesModule {}
