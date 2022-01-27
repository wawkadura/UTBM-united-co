import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TicketService } from '../TicketService';
import TicketForm from "../ticket-form/Ticket-form";

import './Ticket-list.css';

const TicketList = ({setActiveTicket}) => {
    const [tickets, setTickets] = useState(null);

    const ticketService = new TicketService();
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        ticketService.getTickets(userId).then(data => {
            setTickets(data); 
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const formatDate = (value) => {
        return value.toLocaleDateString();
    }


    const renderHeader = () => {
        return (
            <div className="p-grid">
                <h5 className="p-col-10">Liste des tickets</h5>
                <TicketForm tickets={tickets} setTickets={setTickets}/>
            </div>
        )
    }

    const statusBodyTemplate = (rowData) => {
        return rowData.resolved_date ? "Resolu" :
            rowData.pickup_date ? "Pris en charge" : "En attente";
    }

    const commentBodyTemplate = (rowData) => {
        return <div className="ticket-comment" dangerouslySetInnerHTML={{ __html: rowData.comment }}></div>
    }
    
    const dateBodyTemplate = (rowData) => {
        return formatDate(new Date(rowData.created_at));
    }

    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable value={tickets} className="p-datatable-customers" header={header}
                    dataKey="id" rowHover emptyMessage="Pas de tickets." onRowClick={(row)=>setActiveTicket(row.data)}>
                    <Column field="subject" header="Objet"/>
                    <Column header="Commentaire" style={{ maxWidth: '40rem' }} body={commentBodyTemplate}/>
                    <Column header="Date de création" dataType="date" sortable sortField="created_at" body={dateBodyTemplate}/>
                    <Column header="Statut" body={statusBodyTemplate}/>
                </DataTable>
            </div>
        </div>
    );
}
                 

export default TicketList;
