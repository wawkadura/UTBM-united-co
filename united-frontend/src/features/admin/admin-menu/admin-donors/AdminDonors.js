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
    { id: "1", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "2", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "3", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "4", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "5", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "6", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "7", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "8", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "9", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "10", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "11", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
    { id: "12", first_name: "El Walid", last_name: "KADURA", email: "walid.kadura@yahoo.com" },
]

// TODO: faire des services pour les request vers backend
function AdminDonors({toast}) {
    var idToDelete = ''
    const adminService = new AdminService();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        adminService.getDonors().then((response) => {
            if (!response.ok && toast.current != null) {
                // toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.status + ": " + response.statusText, life: 10000 });
            }
            if (response.ok && toast.current != null) {
                donors = response.data
                toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Les donateurs on bien été récupérés', life: 3000 });
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
            if (!response.ok) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.status + ": " + response.statusText, life: 10000 });
            } else {
                toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Le donateur a bien été supprimé', life: 3000 });
            }

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
                    <Column field="first_name" header="Prénom" sortable />
                    <Column field="last_name" header="Nom" sortable />
                    <Column field="email" header="Email" sortable />
                    <Column header="Actions" body={(data) => actions(data)} />
                </DataTable>
            }
        </Card>
    </div>
}

export default AdminDonors
