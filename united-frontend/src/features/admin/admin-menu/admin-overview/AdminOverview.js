import "./AdminOverview.css";

import React from 'react';
import { Chart } from 'primereact/chart';

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";

import {useState} from "react";

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
            <div style={{textAlign: 'center'}}>
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
            <Divider/>

            <Panel header="Informations personnelles">
                <p><span>Prénom : </span>Chaeyoung is bae</p>
                <Divider />

                <p><span>Nom de famille : </span>Kadura</p>
                <Divider />

                <p><span>Date de naissance : </span>11/02/1997</p>
                <Divider />

                <p><span>Genre :  </span>Femme</p>
            </Panel>
            {cardFooter()}
            <br/>
            <Panel header="Statistiques générales">
                <DoughnutChartDemo></DoughnutChartDemo>
            </Panel>


            <Dialog header="Informations personnelles" position="center" draggable={false} visible={displayBasic} style={{ width: '30vw' }} footer={dialogFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                <Divider/>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="firstname1">Prénom</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText id="firstname1" type="text" value="Chaeyoung"/>
                        </span>
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="lastname1">Nom de famille</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText id="lastname1" type="text" value="Park"/>
                        </span>
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="firstname1">Adresse email</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText id="firstname1" type="text" value="rosie@blackpink.kr"/>
                        </span>
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="lastname1">Numéro de téléphone</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText id="lastname1" type="text" value="+823532450845"/>
                        </span>
                    </div>
                </div>
            </Dialog>
        </Card>
    </div>
}

const DoughnutChartDemo = () => {
    const chartData = {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };

    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    };

    return (
        <div className="card p-d-flex p-jc-center">
            <Chart type="doughnut" data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
        </div>
    )
}

export default AdminOverview
