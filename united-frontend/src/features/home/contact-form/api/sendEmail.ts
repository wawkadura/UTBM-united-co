import emailjs from '@emailjs/browser';

export class ContactSentEmailApi {
    public static async sendEmail(emailData: any) {
        return emailjs.send("service_mv99147", "template_rfu3584", {
            subject: emailData.subject,
            message: emailData.message,
            email: emailData.email,
            name:emailData.lastname,
            firstname:emailData.firstname
        }, "user_S7Is4oOEWwEpIS4G8K4vy")
    }
}