import emailjs from '@emailjs/browser';

export class AdminService {

    async getAssociations() {
        return fetch("http://localhost:4200/admin/associations", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }

   async getDonors() {
        return fetch("http://localhost:4200/admin/donors", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async deleteDonor(id) {
        return fetch("http://localhost:4200/admin/donor", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
    }

    async deleteAssociation(id) {
        return fetch("http://localhost:4200/admin/association", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
    }
    async sendEmail(emailData) {
        return emailjs.send("service_6rcafdk", "template_tlhsphk", {
            subject: emailData.subject,
            message: emailData.message,
            email: emailData.email,
        }, "user_SIDEoCNlWwROUDulWRZJK")
    }

    async getAdminInfo(id) {
        return fetch("http://localhost:4200/admin/"+id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getAdminOverviewStats() {
        return fetch("http://localhost:4200/admin/overview", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getAdminStats() {
        return fetch("http://localhost:4200/admin/statistics", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async updateAdminInfo(id, data) {
        return fetch("http://localhost:4200/admin/donor", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                }
            })
        })
    }

    async createAssociation(data) {
        return fetch("http://localhost:4200/admin/association", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    name: data.name,
                    acronym: data.acronym,
                    email: data.email,
                    description: data.desscription,
                    type: data.type,
                    password: data.password
                }
            })
        })
    }

    async updateAssociation(id, data) {
        return fetch("http://localhost:4200/admin/association", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                data: {
                    name: data.name,
                    acronym: data.acronym,
                    email: data.email,
                    description: data.description,
                    website: data.website,
                    address: data.address,
                    city: data.city,
                    phone: data.phone,
                    type: data.type
                }
            })
        })
    }
}