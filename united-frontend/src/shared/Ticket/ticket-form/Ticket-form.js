import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { TicketService } from '../TicketService';
import { confirmPopup } from 'primereact/confirmpopup';

import './Ticket-form.css';

const ticketService = new TicketService();
const userId = sessionStorage.getItem('userId');

const TicketForm = ({tickets, setTickets}) => { 
    const [subject, setsubject] = useState('');
    const [description, setDescription] = useState('');
    const [displayModal, setDisplayModal] = useState(false);
    const toast = useRef(null);

    const addTicket = () => {
        const body = {
            user_id: userId, 
            subject: subject,
            comment: description,
        }

        ticketService.addTicket(body).then(data => {
            clearForm();
            setDisplayModal(false);
            setTickets([...tickets, data]);
            toast.current.show({severity: 'success', detail: 'Ticket créé avec succès'});
        });
    }

    const clearForm = () => {
        setsubject('');
        setDescription('');
    }

    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Etes-vous sûrs de créer ce ticket ?',
            icon: 'pi pi-exclamation-triangle',
            accept
        });
    };

    const accept = () => addTicket();

    return <div className="ticket-form">
        <Toast ref={toast}/>
        <Button label="Créer un ticket" className="ticket-button" icon="pi pi-external-link" onClick={() => setDisplayModal(true)} />
             
        <Dialog header="Créer un ticket" visible={displayModal} onHide={() => setDisplayModal(false)} breakpoints={{'960px': '75vw'}} style={{width: '80vw'}}>
            <div className="p-inputgroup ticket-form-group">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-box"></i>
                </span>
                <InputText 
                    placeholder="Objet"
                    value={subject} 
                    onChange={(e) => setsubject(e.target.value)} />
            </div>
            
            <Editor 
                placeholder="Description"
                value={description} 
                className="ticket-form-group"
                style={{minHeight:'150px'}}
                onTextChange={(e) => setDescription(e.htmlValue)} 
                autoResize
                />
            <Button label="Créer le ticket" onClick={(e) => confirm(e)} />

        </Dialog>
    </div>
}
              
export default TicketForm;
