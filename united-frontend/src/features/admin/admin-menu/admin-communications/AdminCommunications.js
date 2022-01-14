import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function AdminCommunications() {

    var email = ''
    var subject = ''
    var message = ''
    const updateSubject = (event) => {
        subject = event.target.value
    }
    const updateEmail = (event) => {
        email = event.target.value
    }
    const updateMessage = (event) => {
        message = event
    }
    function sendEmail() {
        console.log(email + "/" + message + "/" + subject)
        emailjs.send("service_6rcafdk", "template_tlhsphk", {
            subject: subject,
            message: message,
            email: email,
        }, "user_SIDEoCNlWwROUDulWRZJK").then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }


    return (
        <div className='communcations-contener'>

            <Card title="Communications" subTitle="Vous pouvez envoyer un mail à n'importe quelle utilisateur" style={{ height: '100%' }}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-6 p-md-6">
                        <label htmlFor="email">À</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-at" />
                            <InputText name="email" onInput={(event) => updateEmail(event)} type="text" />
                        </span>
                    </div>
                    <div className="p-field p-col-6 p-md-6">
                        <label htmlFor="nom">Sujet</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-building" />
                            <InputText name="subject" onInput={(event) => updateSubject(event)} type="text" />
                        </span>
                    </div>
                </div>
                <div className="card">
                    <label htmlFor="nom">Message</label>
                    <Editor style={{ height: '320px' }} onTextChange={(e) => updateMessage(e.htmlValue)} />
                </div>
                <br />
                <Button label="Envoyer" icon="pi pi-envelope" onClick={sendEmail} />
            </Card>
        </div>
    );
}

export default AdminCommunications
