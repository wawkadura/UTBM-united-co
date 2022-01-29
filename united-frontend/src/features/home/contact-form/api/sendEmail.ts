import emailjs from '@emailjs/browser';

//api d'envoie de mail
export class ContactSentEmailApi {
    public static async sendEmail(emailData: any) {
        return emailjs.send("service_1wkxg78", "template_rfu3584", {
            subject: emailData.subject,
            message: emailData.message,
            email: emailData.email,
            name:emailData.lastname,
            firstname:emailData.firstname
        }, "user_S7Is4oOEWwEpIS4G8K4vy")
    }
}