import "./AdminDonors.css";

import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Toast } from 'primereact/toast';
import { confirmPopup } from 'primereact/confirmpopup';
import { ProgressSpinner } from 'primereact/progressspinner';

import { Column } from "primereact/column";
import React, { useState, useRef, useEffect } from 'react';
import { AdminService } from "../../AdminService"



var donors = [
    { id: "1", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "2", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "3", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "4", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "5", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "6", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "7", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "8", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "9", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "10", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "11", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "12", firstName: "El Walid", lastName: "KADURA", email: "walid.kadura@yahoo.com" },
]

function AdminDonors({Refresh, toast}) {
    var idToDelete = ''
    const adminService = new AdminService();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        adminService.getDonors().then((response) => {
            if (response.statusCode!=200 && toast.current != null) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode +" : "+ response.message, life: 10000 });
            } else  {
                donors = response.data
            }
            setIsLoading(false)
        });
    });

    const confirm = (event, id) => {
        idToDelete = id
        confirmPopup({
            target: event.currentTarget,
            message: 'Êtes-vous sûr de vouloir supprimer le compte de ce donateur ?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: "Oui",
            rejectLabel: "Non",
            accept,
        });
    };

    const accept = () => {
        adminService.deleteDonor(idToDelete).then((response) => {
            if (response.statusCode!=200 && toast.current != null) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode +" : "+ response.message, life: 10000 });
            } else {
                toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Le donateur a bien été supprimé', life: 3000 });
            }
            Refresh()
        });
        idToDelete = ''
    };

    function actions(data) {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" onClick={(event) => confirm(event, data.id)} className="p-button-rounded p-button-text" />
            </div>
        )
    }

    return <div className="admin-donors">
        <Toast ref={toast} />

        <Card title="Gestion des donateurs" subTitle="Vous pouvez retrouvez sur cette page l'ensemble des donateurs de la platforme" style={{ height: '100%' }}>
            <Divider />
            {isLoading ?
                <div className="spinner"> <ProgressSpinner /></div>
                :
                <DataTable value={donors} scrollable scrollHeight="41.5rem" size="normal">
                    <Column field="firstName" header="Prénom" sortable />
                    <Column field="lastName" header="Nom" sortable />
                    <Column field="email" header="Email" sortable />
                    <Column header="Actions" body={(data) => actions(data)} />
                </DataTable>
            }
        </Card>
    </div>
}

export default AdminDonors
