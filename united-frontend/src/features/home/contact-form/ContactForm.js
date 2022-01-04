import "./ContactForm.css";
import ContactFormDialog from "./ContactFormDialog/ContactFormDialog";
 

function ContactForm() {
    return <div className="contact-form" id="contact">
        <h2>Formulaire de contact</h2>
        <h4 className="space-text"> Vous êtes une assosiation et vous aimeriez être référenciée sur notre site, clickez</h4>
        <div className="button-label">
            <ContactFormDialog/>
        </div>
        
    </div>
}

export default ContactForm
