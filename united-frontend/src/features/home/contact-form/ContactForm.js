import { useState } from "react";
import "./ContactForm.css";
import ContactFormDialog from "./ContactFormDialog/ContactFormDialog";

function ContactForm() {
    const [displayBasic, setDisplayBasic] = useState(false) ;
    return <div className="contact-form" id="contact">
        <h2>Formulaire de contact</h2>
        <h4 className="space-text"> Vous êtes une association et vous aimeriez être référencié sur notre site, cliquez <a onClick={() =>setDisplayBasic(true)} className="ici">ici</a></h4>
        <ContactFormDialog displayBasic={displayBasic} setDisplayBasic={setDisplayBasic} headerDialog="Formulaire de contact"/>
    </div>
}

export default ContactForm
