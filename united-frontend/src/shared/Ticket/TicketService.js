import { TicketApi } from "./api/Ticket.api";

export class TicketService {

    getTickets(userId) {
        return TicketApi.getTickets(userId);
    }

    getAllTickets() {
        return TicketApi.getAllTickets();
    }

    addTicket(body) {
        return TicketApi.addTicket(body);
    }

    getTicketResponses(ticketId) {
        return TicketApi.getTicketResponses(ticketId);
    }

    addTicketResponse(body) {
        return TicketApi.addTicketResponse(body);
    }
    
}