import "./AdminAssociations.css";

import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { DataTable } from "primereact/datatable";
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import { Column } from "primereact/column";
import React, { useState, useEffect, useRef } from 'react';


const associations = [
    { id: "1", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "2", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "3", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "4", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "5", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "6", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "7", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "8", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "9", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "10", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "11", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "12", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
    { id: "13", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678" },
]

function AdminAssociations() {
    var idToDelete = ''
    const toast = useRef(null);
    const [display, setDisplayBasic] = useState(false);
    const getAssociations = () => {
        fetch("http://localhost:4200/admin/associations", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response)
            if (!response.ok) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.status + ": " + response.statusText, life: 3000 });
            } else {
                associations = response.data
                toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Les associations ont bien été récupérés', life: 3000 });
            }

        });
    }

    useEffect(() => {
        getAssociations()
    });


    const onDeleteRequest = (id) => {
        fetch("http://localhost:4200/admin/delete-association", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then((response) => {
            console.log(response)
            if (!response.ok) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.status + ": " + response.statusText, life: 3000 });
            } else {
                toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'L\'association a bien été supprimé', life: 3000 });
            }

        });
    }
    const confirm = (event, id) => {
        idToDelete = id
        confirmPopup({
            target: event.currentTarget,
            message: 'Êtes-vous sûr de vouloir supprimer le compte de cette association ?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: "Oui",
            rejectLabel: "Non",
            accept,
        });
    };

    const accept = () => {
        console.log(idToDelete)
        onDeleteRequest(idToDelete)
        idToDelete = ''
    };

    const onClick = () => {
        setDisplayBasic(true)
    }

    const onHide = () => {
        setDisplayBasic(false)
    }

    function dialogFooter() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Button label="Valider" icon="pi pi-save" onClick={() => onClick()} />
            </div>
        );
    }

    function addButton() {
        return (
            <div className="actions">
                <Button label="Ajouter une association" icon="pi pi-plus" iconPos="right" onClick={() => onClick()} />
            </div>
        );
    }

    function actions(data) {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" onClick={(event) => confirm(event, data.id)} className="p-button-rounded p-button-text" />
            </div>
        )
    }

    return <div className="admin-associations">
        <Toast ref={toast} />

        <Card title="Gestion des associations" subTitle="Vous pouvez retrouvez sur cette page l'ensemble des associations de la platforme" style={{ height: '100%' }}>

            <Divider />

            {addButton()}
            <br />
            <DataTable value={associations} scrollable scrollHeight="38rem" size="normal">
                <Column field="name" header="Nom" sortable />
                <Column field="acronym" header="Acronym" sortable />
                <Column field="email" header="Email" sortable />
                <Column field="website" header="Site web" sortable />
                <Column field="phone" header="Téléphone" sortable />
                <Column header="Actions" body={(data) => actions(data)} />
            </DataTable>


        </Card>

        <Dialog header="Informations personnelles" position="center" draggable={false} visible={display} style={{ width: '40vw' }} footer={dialogFooter()} onHide={() => onHide()}>
            <Divider />
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-14 p-md-6">
                    <label htmlFor="nom">Nom</label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-building" />
                        <InputText id="firstname1" type="text" />
                    </span>
                </div>
                <div className="p-field p-col-14 p-md-6">
                    <label htmlFor="acronym">Acronym</label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-info-circle" />
                        <InputText id="lastname1" type="text" />
                    </span>
                </div>
                <div className="p-field p-col-14 p-md-6">
                    <label htmlFor="email">Adresse email</label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-at" />
                        <InputText id="firstname1" type="text" />
                    </span>
                </div>
                <div className="p-field p-col-14 p-md-6">
                    <label htmlFor="phone">Numéro de téléphone</label>
                    <span className="p-input-icon-left">
                        <i className="pi pi-phone" />
                        <InputText id="lastname1" type="text" />
                    </span>
                </div>
                <div className="p-field p-col-14 p-md-14">


                </div>
                <div className="p-field p-col-12">
                    <label htmlFor="description">Description</label>
                    <span className="p-input-icon-left">
                        <InputTextarea id="address" rows={4} />
                    </span>
                </div>
            </div>
        </Dialog>
    </div>
}

export default AdminAssociations
