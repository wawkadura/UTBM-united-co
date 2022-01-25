import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ticketResponses } from 'src/entity/ticket_responses.entity';
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
        return await this.ticketRepository.find({ where: { ticket_id: ticketId } });
    }

    // get a ticket
    async getTicketResponsesById(id: number) {
        return await this.ticketRepository.findOne({ where: { id: id } });
    }

}
