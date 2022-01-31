import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TicketService } from '../TicketService';
import TicketForm from "../ticket-form/Ticket-form";

import './Ticket-list.css';
import { Dropdown } from 'primereact/dropdown';

const TicketList = ({setActiveTicket}) => {
    const [tickets, setTickets] = useState(null);
    const [filteredTickets, setFilteredTickets] = useState(null);

    const [ticketState, setTicketState] = useState(null);

    const ticketStateItems = [
        {label: 'Tous les tickets', value: 'all'},
        {label: 'En attente', value: 'waiting'},
        {label: 'Pris en charge', value: 'pickedUp'},
        {label: 'Résolus', value: 'resolved'}
    ];
    const ticketService = new TicketService();
    const userId = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('role');
    

    useEffect(() => {
        // if role is admin, fetch all tickets
        const query = role !== 'ADMIN' ? ticketService.getAllTickets() : ticketService.getTickets(userId);
        
        query.then(data => {
            setTickets(data); 
        });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => setFilteredTickets(tickets), [tickets]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        switch(ticketState) {
            case 'waiting': setFilteredTickets(tickets.filter((row) => !row.pickup_date && !row.resolved_date)); break;
            case 'pickedUp': setFilteredTickets(tickets.filter((row) => row.pickup_date && !row.resolved_date)); break;
            case 'resolved': setFilteredTickets(tickets.filter((row) => row.resolved_date)); break;
            default: setFilteredTickets(tickets); break;
        }
    }, [ticketState]); // eslint-disable-line react-hooks/exhaustive-deps

    const formatDate = (value) => {
        return value.toLocaleDateString();
    }


    const renderHeader = () => {
        return (
            <div className="p-grid">
                <h5 className="p-col-3">Liste des tickets</h5>
                <div className="p-col-7 ticket-dropdown-filter">
                    <Dropdown 
                        value={ticketState} 
                        options={ticketStateItems} 
                        placeholder="Statut du ticket"
                        onChange={(e) => setTicketState(e.value)}/>
                </div>
                { role === 'ADMIN' ? <></> : <TicketForm tickets={tickets} setTickets={setTickets}/> }
            </div>
        )
    }

    const statusBodyTemplate = (rowData) => {
        return rowData.resolved_date ? "Résolu" :
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
                <DataTable value={filteredTickets} className="p-datatable-customers" header={header}
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
