import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ticketResponses } from 'src/entity/ticket_responses.entity';
import { users } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { TicketResponsesDTO } from '../dto/ticket-responses.dto';


@Injectable()
export class TicketResponsesService {
    constructor(@InjectRepository(ticketResponses) private ticketRepository: Repository<ticketResponses>){}

    // add new ticket in database
    async addTicketResponse(data: TicketResponsesDTO) {
        this.ticketRepository.create(data);
        return await this.ticketRepository.save(data);
    }

    // get all tickets responses 
    async getTicketResponses(ticketId: number) {
        const query = await this.ticketRepository.createQueryBuilder('resp')
            .select('distinct resp.*, user.firstName, user.lastName')
            .innerJoin(users, 'user', `user.id = resp.user_id`)
            .where({ ticket_id: ticketId })
        return await query.getRawMany();
    }

    // get a ticket
    async getTicketResponsesById(id: number) {
        return await this.ticketRepository.findOne({ where: { id: id } });
    }

}
