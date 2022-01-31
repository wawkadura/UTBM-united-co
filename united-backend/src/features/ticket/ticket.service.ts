import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ticket } from 'src/entity/ticket.entity';
import { users } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { TicketDTO } from './dto/ticket.dto';


@Injectable()
export class TicketService {
    constructor(@InjectRepository(ticket) private ticketRepository: Repository<ticket>){}

    // add new ticket in database
    async addTicket(data: TicketDTO) {
        this.ticketRepository.create(data);
        const ticket = await this.ticketRepository.save(data);
        return ticket;
    }

    // get user tickets
    async getTickets(userId: number) {
        return await this.ticketRepository.find({ user_id: userId });
    }

    // get all tickets
    async getAllTickets() {
        return await this.ticketRepository.createQueryBuilder('tick')
        .select('tick.*')
        .innerJoin(users, 'user', 'user.id = tick.user_id')
        .where('user.state = true')
        .orderBy('created_at','DESC')
        .getRawMany();
    }
    
}
