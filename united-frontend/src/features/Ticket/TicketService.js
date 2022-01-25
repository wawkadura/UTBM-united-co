import { TicketApi } from "./api/Ticket.api";

export class TicketService {

    getTickets() {
        return TicketApi.getTickets();
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