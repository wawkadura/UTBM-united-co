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


function UserInfo({user, setUser}) {
    const [form, setForm] = useState(user);
    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {'displayBasic': setDisplayBasic};
    const genres = [
        {label: 'Homme', value: 'man'},
        {label: 'Femme', value: 'woman'},
        {label: 'Autre', value: 'other'}
    ];

    const onClick = (name) => { dialogFuncMap[`${name}`](true); }
    const onHide = (name) => { dialogFuncMap[`${name}`](false); }

    function genre(genre) {
        return genre === "man" ? "Homme" : genre === "woman" ? "Femme" : "Autre";
    }

    function cardFooter() {
        return (
            <div className="actions">
                <Button label="Modifier" icon="pi pi-pencil" iconPos="right" onClick={() => onClick('displayBasic')} />
            </div>
        );
    }

    const handleChange = (event) => {
        const name = event.target.name;
        let value  = event.target.value;

        if(name === "birthdate") { value = value.toISOString(); }
        setForm(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser(form);
    }

    return <div className="user-contents">
        <Card title="Vos informations personnelles" footer={cardFooter} subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
            <Divider/>

            <Panel header="Informations basiques">
                <p><span>Prénom : </span>{user.firstname}</p>
                <Divider />

                <p><span>Nom de famille : </span>{user.lastname}</p>
                <Divider />

                <p><span>Date de naissance : </span>{user.birthdate}</p>
                <Divider />

                <p><span>Genre :  </span>{genre(user.genre)}</p>
            </Panel>

            <Panel header="Informations de contact">
                <p><span>Adresse mail :  </span>{user.email}</p>
                <Divider />

                <p><span>Numéro de téléphone :  </span> {user.phone}</p>
            </Panel>


            <Dialog header="Informations personnelles" position="center" draggable={false} visible={displayBasic} style={{ width: '30vw' }} onHide={() => onHide('displayBasic')}>
                <Divider/>
                <form onSubmit={handleSubmit}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="firstname1">Prénom</label>
                            <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText name="firstname" type="text" defaultValue={user.firstname} onChange={handleChange}/>
                        </span>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname1">Nom de famille</label>
                            <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText name="lastname" type="text" defaultValue={user.lastname}  onChange={handleChange}/>
                        </span>
                        </div>

                        <div className="p-field p-col-12">
                            <div className="p-field ">
                                <label htmlFor="icon">Date de naissance</label>
                                <Calendar name="birthdate" showIcon defaultValue={user.birthdate} dateFormat="dd/mm/yy" onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="p-field p-col-12">
                            <div className="p-field ">
                                <label htmlFor="icon">Genre</label>
                                <Dropdown name="genre" defaultValue={user.genre}  value={form.genre} options={genres} placeholder="Sélectionner un genre" onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="p-field p-col">
                            <label htmlFor="firstname1">Adresse email</label>
                            <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText name="email" type="text" defaultValue={user.email} onChange={handleChange}/>
                        </span>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname1">Numéro de téléphone</label>
                            <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText name="phone" type="text" defaultValue={user.phone} onChange={handleChange}/>
                        </span>
                        </div>
                    </div>
                    <div className="form-actions">
                        <Button type="submit" label="Sauvegarder" icon="pi pi-save" onClick={() => { onHide('displayBasic')}}/>
                    </div>
                </form>
            </Dialog>
        </Card>
    </div>
}

export default UserInfo
