import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ticket } from 'src/entity/ticket.entity';
import { Repository } from 'typeorm';
import { TicketDTO } from './dto/Ticket.dto';


@Injectable()
export class TicketService {
    constructor(@InjectRepository(ticket) private ticketRepository: Repository<ticket>){}

    // add new ticket in database
    async addTicket(data: TicketDTO) {
        this.ticketRepository.create(data);
        const ticket = await this.ticketRepository.save(data);
        return ticket;
    }

    // get all tickets
    async getTickets() {
        return await this.ticketRepository.find();
    }

    // get a ticket
    async getTicketById(id: number) {
        return await this.ticketRepository.findOne({ where: { id: id } });
    }

}
