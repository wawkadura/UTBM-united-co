import "./Ticket.css";
import React, { useState } from 'react';
import TicketList from "./Ticket-list/Ticket-list";
import TicketInfo from "./Ticket-info/Ticket-info";

function Ticket() {

    const [activeTicket, setActiveTicket] = useState(null);
    return <div className="tickets">
        <h2 id="AssoTitle">Mes tickets</h2>
        { activeTicket ?    <TicketInfo activeTicket={activeTicket} setActiveTicket={setActiveTicket}/> : 
                            <TicketList setActiveTicket={setActiveTicket}/> }
    </div>
}

export default Ticket