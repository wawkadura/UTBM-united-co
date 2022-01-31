import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ticket } from 'src/entity/ticket.entity';
import { ticketResponses } from 'src/entity/ticket_responses.entity';
import { users } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { TicketResponsesDTO } from '../dto/ticket-responses.dto';


@Injectable()
export class TicketResponsesService {
    constructor(@InjectRepository(ticketResponses) private ticketRepository: Repository<ticketResponses>){}

    // add new ticket in database
    async addTicketResponse(data: TicketResponsesDTO) {
        if(data.pickup_date || data.resolved_date )
            await this.ticketRepository.createQueryBuilder()
                .update(ticket)
                .set({ resolved_date: data.resolved_date, pickup_date: data.pickup_date })
                .where({ id: data.ticket_id })
                .execute();
        this.ticketRepository.create(data);
        return await this.ticketRepository.save(data);
    }

    // get all tickets responses 
    async getTicketResponses(ticketId: number) {
        return await this.ticketRepository.createQueryBuilder('tick')
        .select('tick.*, user.firstName, user.lastName')
        .innerJoin(users, 'user', 'user.id = tick.user_id')
        .where(`tick.ticket_id = ${ticketId}`)
        .orderBy('tick.created_at','ASC')
        .getRawMany();
    }
}
