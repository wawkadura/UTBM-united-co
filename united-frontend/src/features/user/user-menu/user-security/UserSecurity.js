import "./UserSecurity.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {useState} from "react";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {validate} from "email-validator";

function UserSecurity({user, setUser}) {
    const [form, setForm] = useState(user);
    const [emailValid, setEmailValid] = useState(true);


    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {'displayBasic': setDisplayBasic};
    const types = [
        {label: 'Carte de crédit', value: 'credit_card'},
        {label: 'Autre', value: 'other'}
    ];

    const onClick = (name) => { dialogFuncMap[`${name}`](true); }
    const onHide = (name) => { dialogFuncMap[`${name}`](false); }

    function paymentType(type) {
        return type === "credit_card" ? "Carte de crédit" : "Autre"
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

        if(name === "email") setEmailValid(validate(value));
        setForm(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('form');
        console.log(form);

        setUser(form);
    }


    return <div className="user-security">
        <Card title="Sécurité & Paiement" footer={cardFooter} subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
            <Divider/>

            <Panel header="Informations de connexion">
                <p><span>Adresse email</span> : {user.email}</p>
                <Divider/>

                <p><span>Mot de passe : </span> ********</p>
            </Panel>
            {user.role ? <Panel header="Informations de paiement">
                <p><span>Type de paiement :  </span> {paymentType(user.payment_type)}</p>
                <Divider />

                <p><span>BIC :  </span> {user.bic}</p>
                <Divider />

                <p><span>IBAN : </span> {user.iban}</p>
            </Panel> : null }

            <Dialog header="Sécurité & Paiement" position="center" draggable={false} visible={displayBasic} style={{ width: '40vw' }} onHide={() => onHide('displayBasic')}>
                <Divider/>
                <form onSubmit={handleSubmit}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12">
                            <div className="p-field ">
                                <label htmlFor="firstname1">Adresse email</label>
                                <span className="p-input-icon-left" style={{ marginBottom: '0.25rem' }}>
                                    <i className="pi pi-user" />
                                    <InputText className={!emailValid ? "p-invalid block": ""} name="email" type="text" defaultValue={user.email} keyfilter="email" onChange={handleChange}/>
                                </span>
                                {!emailValid ? <small  id="username2-help" className="p-error block">L'adresse email est invalide.</small> : null}
                            </div>
                        </div>

                        <div className="p-field p-col-12">
                            <div className="p-field ">
                                <label htmlFor="icon">Mot de passe</label>
                                <InputText name="email" type="password" defaultValue="**********" onChange={handleChange}/>
                            </div>
                        </div>

                        {/*<div className="p-field p-col-12">
                            <div className="p-field ">
                                <label htmlFor="icon">Moyen de paiement</label>
                                <Dropdown name="type" defaultValue={user.payment.type} value={form.payment.type} options={types} placeholder="Sélectionner un moyen de paiement" onChange={handleChange}/>
                            </div>
                        </div>*/}

                        <div className="p-field p-col">
                            <label htmlFor="firstname1">BIC</label>
                            <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText name="bic" type="text" defaultValue={user.bic} keyfilter="alpha" onChange={handleChange}/>
                        </span>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname1">IBAN</label>
                            <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText name="iban" type="text" defaultValue={user.iban} keyfilter="alphanum" onChange={handleChange}/>
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

export default UserSecurity
