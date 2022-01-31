//
export class TicketApi {
    
    public static async getTickets(userId: number) {
        const token = sessionStorage.getItem('token');
        const resp = await fetch(`http://localhost:4200/ticket/userId=${userId}`, {
            method : "GET",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return await resp.json().then(d => d.data);
    }
    
    public static async getAllTickets() {
        const token = sessionStorage.getItem('token');
        const resp = await fetch(`http://localhost:4200/ticket`, {
            method : "GET",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return await resp.json().then(d => d.data);
    }

    public static async addTicket(body: any) {
        const token = sessionStorage.getItem('token');
        const resp = await fetch("http://localhost:4200/ticket", {
            method : "POST",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        return await resp.json().then(d => d.data);
    }

    public static async getTicketResponses(ticketId: number) {
        const token = sessionStorage.getItem('token');
        const resp = await fetch(`http://localhost:4200/ticket/response/${ticketId}`, {
            method : "GET",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return await resp.json().then(d => d.data);
    }

    public static async addTicketResponse(body: any) {
        const token = sessionStorage.getItem('token');
        const resp = await fetch(`http://localhost:4200/ticket/response`, {
            method : "POST",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(body)
        })
        return await resp.json().then(d => d.data);
    }
}
