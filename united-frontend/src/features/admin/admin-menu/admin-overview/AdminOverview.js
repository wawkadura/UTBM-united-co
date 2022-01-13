import "./AdminOverview.css";

import React from 'react';

import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { useState } from "react";

function AdminOverview() {


    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }
    // TODO: à récupérer
    var email = "walid.kadura@united.co"
    var phoneNumber = "0612345678"
    var firstName = "El Walid"
    var lastName = "Kadura"

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    function dialogFooter() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Button label="Sauvegarder" icon="pi pi-save" onClick={() => onClick('displayBasic')} />
            </div>
        );
    }

    function cardFooter() {
        return (
            <div className="actions">
                <Button label="Modifier" icon="pi pi-pencil" iconPos="right" onClick={() => onClick('displayBasic')} />
            </div>
        );
    }

    return <div className="admin-contents">
        <Card title="Informations générales" style={{ height: '100%' }}>
            <Divider />

            <Panel header="Informations personnelles">
                <p><span>Prénom : </span>{firstName}</p>
                <Divider />

                <p><span>Nom de famille : </span>{lastName}</p>
                <Divider />

                <p><span>Email : </span>{email}</p>
                <Divider />

                <p><span>Numéro téléphone :  </span>{phoneNumber}</p>
            </Panel>
            {cardFooter()}
            <br />
            <Panel header="Statistiques générales">
            </Panel>

            <Panel header="Messageries">
            </Panel>


            <Dialog header="Informations personnelles" position="center" draggable={false} visible={displayBasic} style={{ width: '30vw' }} footer={dialogFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                <Divider />
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="firstname1">Prénom</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText id="firstname1" type="text" placeholder={firstName} />
                        </span>
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="lastname1">Nom de famille</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText id="lastname1" type="text" placeholder={lastName} />
                        </span>
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="firstname1">Adresse email</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText id="firstname1" type="text" placeholder={email} />
                        </span>
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="lastname1">Numéro de téléphone</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText id="lastname1" type="text" placeholder={phoneNumber} />
                        </span>
                    </div>
                </div>
            </Dialog>
        </Card>
    </div>
}


export default AdminOverview
