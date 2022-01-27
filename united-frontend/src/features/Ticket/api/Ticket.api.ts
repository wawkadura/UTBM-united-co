//
export class TicketApi {
    
    public static async getTickets(userId: number) {
        const resp = await fetch(`http://localhost:4200/ticket/${userId}`, {
            method : "GET",
            headers : {
                'Content-Type':'application/json'
            },
        })
        return await resp.json().then(d => d.data);
    }
    
    public static async addTicket(body: any) {
        const resp = await fetch("http://localhost:4200/ticket", {
            method : "POST",
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        return await resp.json().then(d => d.data);
    }

    public static async getTicketResponses(ticketId: number) {
        const resp = await fetch(`http://localhost:4200/ticket/response/${ticketId}`, {
            method : "GET",
            headers : {
                'Content-Type':'application/json'
            },
        })
        return await resp.json().then(d => d.data);
    }

    public static async addTicketResponse(body: any) {
        const resp = await fetch(`http://localhost:4200/ticket/response`, {
            method : "POST",
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(body)
        })
        return await resp.json().then(d => d.data);
    }
}
