import "./UserInfo.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import { Calendar } from 'primereact/calendar';
import {InputText} from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';

import {useState} from "react";

function UserInfo() {


    const genres = [
        {label: 'Homme', value: 'man'},
        {label: 'Femme', value: 'woman'},
        {label: 'Autre', value: 'other'}
    ];

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

    return <div className="user-contents">
        <Card title="Vos informations personnelles" footer={cardFooter} subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
            <Divider/>

            <Panel header="Informations basiques">
                <p><span>Prénom : </span>Chaeyoung is bae</p>
                <Divider />

                <p><span>Nom de famille : </span>Park</p>
                <Divider />

                <p><span>Date de naissance : </span>11/02/1997</p>
                <Divider />

                <p><span>Genre :  </span>Femme</p>
            </Panel>

            <Panel header="Informations de contact">
                <p><span>Adresse mail :  </span>rosie@blackpink.kr</p>
                <Divider />

                <p><span>Numéro de téléphone :  </span> +823532450845</p>
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

                    <div className="p-field p-col-12">
                        <div className="p-field ">
                            <label htmlFor="icon">Date de naissance</label>
                            <Calendar id="icon" showIcon />
                        </div>
                    </div>

                    <div className="p-field p-col-12">
                        <div className="p-field ">
                            <label htmlFor="icon">Genre</label>
                            <Dropdown value="woman"  options={genres} placeholder="Sélectionner un genre"/>
                        </div>
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

export default UserInfo
