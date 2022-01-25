//
export class TicketApi {
    
    public static async getTickets() {
        // return fetch('mocks/tickets-mock/tickets.json').then(res => res.json()).then(d => d.data);
        const resp = await fetch("http://localhost:4200/ticket", {
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

        // return fetch('mocks/tickets-mock/ticket-responses.json')
        //     .then(res => res.json())
        //     .then(d => d.data.filter(
        //         (response: any) => response.ticket_id === ticketId
        //     ));
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
    //     return fetch('mocks/tickets-mock/ticket-responses.json')
    //         .then(res => res.json())
    //         .then(d => {
    //             d.data=d.data.filter(
    //                 (response: any) => response.ticket_id === data.ticket_id);
    //             d.data.push({
    //                 id: "77",
    //                 ticket_id: data.ticket_id, 
    //                 name: data.name, 
    //                 comment: data.comment, 
    //                 created_at: data.created_at,
    //             })
    //             return d.data;
    //         });
    }
}
