import React, { useState, useRef } from 'react';
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button";
import { AdminService } from '../../AdminService';
import { classNames } from 'primereact/utils';
import { InputTextarea } from "primereact/inputtextarea";
import "./AdminCommunications.css"
import { useForm, Controller } from 'react-hook-form';

function AdminCommunications({toast}) {
    const [formData, setFormData] = useState({});
    const [isPending, setIsPending] = useState(false);
    const adminService = new AdminService()
    const defaultValues = {
        subject: "",
        email : "",
        message: ""
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({defaultValues});

    function sendEmail(data) {
        setIsPending(true)
        adminService.sendEmail(data).then((response) => {
            toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Le mail a bien été envoyé !', life: 3000 });
            setIsPending(false)
            reset()
        }, (error) => {
            setIsPending(false)
            // toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.status + ": " + response.statusText, life: 3000 });
        });

    }
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className='communcations-contener'>
            <Toast ref={toast} />


            <Card title="Communications" subTitle="Vous pouvez envoyer un mail à n'importe quelle utilisateur" style={{ height: '100%' }}>
                <form onSubmit={handleSubmit(sendEmail)} className="p-fluid">
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-6 p-md-6">
                            <label htmlFor="email">À</label>
                            <span className="p-input-icon-left">
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email obligatoire.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Adresse email invalide. Ex: example@email.com' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} placeholder="Email" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="p-field p-col-6 p-md-6">
                            <label htmlFor="nom">Sujet</label>
                            <span className="p-input-icon-left">
                                <Controller name="subject" control={control} rules={{ required: 'sujet obligatoire.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} placeholder="Sujet" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            </span>
                            {getFormErrorMessage('subject')}
                        </div>

                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="nom">Message</label>
                            <span className="p-input-icon-left">
                                <Controller name="message" control={control} rules={{ required: 'sujet obligatoire.' }} render={({ field, fieldState }) => (
                                    <InputTextarea placeholder="Message" id={field.name} rows={8} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                            </span>
                            {getFormErrorMessage('message')}
                        </div>
                    </div>

                    <br />
                    {isPending ?
                        <Button className="mail-button" disabled type="submit" label="Envoi..." icon="pi pi-envelope" />
                        :
                        <Button className="mail-button" type="submit" label="Envoyer" icon="pi pi-envelope" />

                    }

                </form>
            </Card>
        </div>
    );
}

export default AdminCommunications
