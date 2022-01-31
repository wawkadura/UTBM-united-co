import emailjs from '@emailjs/browser';

export class AdminApi {

    // GET the associations request 
    public static async getAssociations() {
        const token = sessionStorage.getItem('token');

        return fetch("http://localhost:4200/admin/associations", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        }).then(res => res.json());
    }

    // GET the donors request 
    public static async getDonors() {
        const token = sessionStorage.getItem('token');

        return fetch("http://localhost:4200/admin/donors", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        }).then(res => res.json());
    }


    // GET admin inforations request
    public static async getAdminInfo(id: string) {
        const token = sessionStorage.getItem('token');

        return fetch("http://localhost:4200/admin/info/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        }).then(res => res.json());
    }

    // GET admin overview statistics request
    public static async getAdminOverviewStats() {
        const token = sessionStorage.getItem('token');

        return fetch("http://localhost:4200/admin/overview", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        }).then(res => res.json());
    }

    // GET admin statistics request
    public static async getAdminStats() {
        const token = sessionStorage.getItem('token');

        return fetch("http://localhost:4200/admin/statistics", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        }).then(res => res.json());
    }


    // POST association request
    public static async createAssociation(data: any) {
        const token = sessionStorage.getItem('token');
        
        return fetch("http://localhost:4200/admin/association", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                name: data.name,
                acronym: data.acronym,
                email: data.email,
                created_at: data.createdAt,
                description: data.desscription,
                type: data.type,
                password: data.password
            })
        }).then(res => res.json());
    }

    // PUT admin informations request
    public static async updateAdminInfo(id: string, data: any) {
        const token = sessionStorage.getItem('token');

        return fetch("http://localhost:4200/admin/info", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                id: id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            })
        }).then(res => res.json());
    }

    // PUT association request
    public static async updateAssociation(id: string, data: any) {
        const token = sessionStorage.getItem('token');

        return fetch("http://localhost:4200/admin/association", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
                id: id,
                name: data.name,
                acronym: data.acronym,
                email: data.email,
                description: data.description,
                website: data.website,
                address: data.address,
                city: data.city,
                telephone: data.telephone,
                logo:data.logo,
                type: data.type
            })
        }).then(res => res.json());
    }

    // DELETE donor request 
    public static async deleteDonor(id: any) {
        const token = sessionStorage.getItem('token');

        return fetch("http://localhost:4200/admin/donor/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,

            }
        }).then(res => res.json());
    }

    // DELETE association request
    public static async deleteAssociation(id: string) {
        const token = sessionStorage.getItem('token');

        return fetch("http://localhost:4200/admin/association/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token,
            }
        }).then(res => res.json());
    }

    // Send email request
    public static async sendEmail(emailData: any) {
        return emailjs.send("service_1wkxg78", "template_rfu3584", {
            subject: emailData.subject,
            message: emailData.message,
            email: emailData.email,
        }, "user_S7Is4oOEWwEpIS4G8K4vy");
    }

}
