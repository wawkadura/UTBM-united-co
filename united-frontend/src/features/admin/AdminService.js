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

    getDonors() {
        return fetch("http://localhost:4200/admin/donors", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deleteDonor(id) {
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

    deleteAssociation(id) {
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
    sendEmail(emailData) {
        return emailjs.send("service_6rcafdk", "template_tlhsphk", {
            subject: emailData.subject,
            message: emailData.message,
            email: emailData.email,
        }, "user_SIDEoCNlWwROUDulWRZJK")
    }

    getAdminInfo(id) {
        return fetch("http://localhost:4200/admin/"+id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getAdminOverviewStats() {
        return fetch("http://localhost:4200/admin/overview", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updateAdminInfo(id, data) {
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
}