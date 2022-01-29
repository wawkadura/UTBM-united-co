import React, { useState, useEffect, useRef } from 'react';
import './Ticket-info.css';
import { TicketService } from '../TicketService';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Editor } from 'primereact/editor';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

const TicketInfo = ({activeTicket, setActiveTicket}) => {
    const [ticketResponses, setTicketsResponses] = useState(null);
    const [message, setMessage] = useState('');
    const [fileUpload, setFileUpload] = useState(null);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    
    const ticketService = new TicketService();
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        getResponses();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getResponses = () => ticketService.getTicketResponses(activeTicket.id).then(data => setTicketsResponses(data));

    const formatDate = (value) => {
        return new Date (value).toLocaleDateString("fr-FR",
            { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' ,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });
    }

    const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const formatName = (response) => capitalize(response.firstName) + ' ' + capitalize(response.lastName);

    const header = (response) => <div className="p-grid"> 
        <span className="p-col-8"><b>{response.firstName && formatName(response)}</b></span>
        <div className="p-col-4" style={{textAlign:'right'}}>{ formatDate(response.created_at) }</div>
    </div>

    const sendResponse = () => {
        const body = {
            ticket_id: activeTicket.id, 
            user_id: userId, 
            comment: message,
            created_at: new Date().toLocaleString('en'),
        }

        ticketService.addTicketResponse(body).then(data => {
            toast.current.show({severity: 'success', detail: 'Votre commentaire a été ajouté'});
            getResponses();
            setMessage('');
        });
    };

    const onUpload = (e) => {
        // e.files.forEach(file => {
        // });
        setFileUpload(e.files[0].objectURL.substring(5))
    }

    const headerTemplate = (options) => {
        const { className, chooseButton } = options;

        return (
            <div className={className}>
                {chooseButton}
            </div>
        );
    }

    const chooseOptions = {className: 'p-button-rounded p-button-outlined', label:'Importer une image'};

    return (
        <div>
            <Toast ref={toast}/>
            <div className="p-grid ticket-head"> 
                <Button label="Retour" onClick={() => setActiveTicket(null)} /> 
                <div className="p-col-10 ticket-title">Ticket : "{ activeTicket.subject }"</div>
                <Card className="ticket-original-comment">
                    <div dangerouslySetInnerHTML={{ __html: activeTicket.comment }}></div>
                </Card>
            </div>
            
           
            <div>
                {
                    ticketResponses ?
                    ticketResponses.map((ticketResponse) => {
                        return <Card key={ticketResponse.id} className="ticket-response" header={header(ticketResponse)}>
                        <div dangerouslySetInnerHTML={{ __html: ticketResponse.comment }}></div>
                    </Card>
                    }) :''
                }
            </div>

            <div className="ticket-response-answer">
                <h2>Répondre</h2>

                <Editor 
                    placeholder="Entrez un nouveau message"
                    value={message}
                    style={{minHeight:'100px'}}
                    onTextChange={(e) => setMessage(e.htmlValue)} 
                    autoResize
                />
                <div className="card">
                    <FileUpload value={fileUpload} ref={fileUploadRef} name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" onSelect={onUpload} multiple accept="image/*" maxFileSize={1000000}
                        headerTemplate={headerTemplate} chooseOptions={chooseOptions} emptyTemplate={<p className="p-m-0">Glissez et déposez vos fichiers ici.</p>} />
                </div>
            </div>
            <Button label="Envoyer la réponse" onClick={() => sendResponse()} /> 
        </div>
    );
}
                 

export default TicketInfo;
