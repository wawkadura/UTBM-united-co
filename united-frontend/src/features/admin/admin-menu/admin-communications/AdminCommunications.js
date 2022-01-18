import emailjs from '@emailjs/browser';
import React, { useState, useRef } from 'react';
import { Editor } from 'primereact/editor';
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { AdminService } from '../../AdminService';
import { InputTextarea } from "primereact/inputtextarea";
import "./AdminCommunications.css"

import { useForm, Controller } from 'react-hook-form';

function AdminCommunications() {
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    var emailData = {
        email: '',
        subject: '',
        message: ''
    }

    var defaultValues = {
        email: '',
        subject: '',
        message: ''
    }
    const toast = useRef(null);
    const adminService = new AdminService()

    const updateSubject = (event) => {
        emailData.subject = event.target.value
    }
    const updateEmail = (event) => {
        emailData.email = event.target.value
    }
    const updateMessage = (event) => {
        emailData.message = event.target.value
        console.log(emailData)
    }
    function sendEmail() {
        emailData.message = "<html>" + emailData.message + "</html>"
        adminService.sendEmail(emailData).then((response) => {
            console.log(response);
            toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Le mail a bien été envoyé !', life: 3000 });
        }, (error) => {
            console.log(error.text);
            // toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.status + ": " + response.statusText, life: 3000 });
        });
    }


    return (
        <div className='communcations-contener'>
            <Toast ref={toast} />


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
                            <InputText name="subject" onInput={(event) => updateSubject(event)} type="text" />
                        </span>
                    </div>

                    <div className="p-field p-col-12 p-md-12">
                        <label htmlFor="nom">Message</label>
                        <span className="p-input-icon-left">
                            <InputTextarea rows={8} name="message" onInput={(event) => updateMessage(event)} />
                        </span>
                    </div>
                </div>

                <br />
                <Button className="mail-button" label="Envoyer" icon="pi pi-envelope" onClick={sendEmail} />
            </Card>
        </div>
    );
}

export default AdminCommunications
