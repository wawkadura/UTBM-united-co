import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ticket } from 'src/entity/ticket.entity';
import { TicketResponsesModule } from './ticket-responses/ticket-responses.module';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  imports: [TypeOrmModule.forFeature([ticket]), TicketResponsesModule]  
})
export class TicketModule {}
