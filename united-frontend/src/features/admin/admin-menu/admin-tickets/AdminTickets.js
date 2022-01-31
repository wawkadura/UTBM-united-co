import React from 'react';
import { Toast } from 'primereact/toast';
import Ticket from '../../../../shared/Ticket/Ticket';
import "./AdminTickets.css"
import { Card } from 'primereact/card';

function AdminTickets({toast}) {

    return (
        <div className='communcations-contener'>
            <Toast ref={toast} />
            <Card>            
                <Ticket/>
            </Card>

        </div>
    );
}

export default AdminTickets
