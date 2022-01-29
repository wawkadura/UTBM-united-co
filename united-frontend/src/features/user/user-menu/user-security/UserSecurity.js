import "./UserSecurity.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {validate} from "email-validator";
import {UserService} from "../../UserService";

function UserSecurity({user, setUser}) {
    const userService = new UserService();
    const [form, setForm] = useState({
        email: user.email,
        bic: "ERZERF",
        iban: "FR04 1210 2102 5695"
    });
    const [emailValid, setEmailValid] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState({});

    useEffect(() => {
        userService.getUserPayment(user.id).then(data => {
            console.log(data);
            setPaymentInfo(data);
        });
    }, []);

    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {'displayBasic': setDisplayBasic};


    const onClick = (name) => { dialogFuncMap[`${name}`](true); }
    const onHide = (name) => { dialogFuncMap[`${name}`](false); }


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
        if(name === "password") form.password = value;
        if(name === "owner") form.owner = value;
        if(name === "card_number") form.card_number = value;
        if(name === "expire_date") form.expire_date = value;

        console.log('form');
        console.log(form);

        setForm(form);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        paymentInfo.owner = form.owner;
        paymentInfo.card_number = form.card_number;
        paymentInfo.expire_date = form.expire_date;

        console.log('payment');
        console.log(paymentInfo);

        userService.modifyPaymentInfo(user.id, paymentInfo).then(() => {
            userService.getUserPayment(user.id).then(data => {
                setPaymentInfo(data);
            })
        });

        console.log('password');
        console.log(form.password);
        userService.modifyUserPassword(user.id, form.password).then((r => console.log(r)));
    }


    return <div className="user-security">
        <Card title="Sécurité & Paiement" footer={cardFooter} subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
            <Divider/>

            <Panel header="Informations de connexion">
                <p><span>Adresse email</span> : {user.email}</p>
                <Divider/>

                <p><span>Mot de passe : </span> ********</p>
            </Panel>
            <Panel header="Informations de paiement">
                <p><span>Type de paiement :  </span> Carte de crédit</p>
                <Divider />

                <p><span>Propriétaire de la carte :  </span> {paymentInfo.owner}</p>
                <Divider />

                <p><span>Numéro de carte :  </span> {paymentInfo.card_number}</p>
                <Divider />

                <p><span>Date d'expiration : </span> {paymentInfo.expire_date}</p>
            </Panel>

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
                                <InputText name="password" type="password" defaultValue="**********" onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="p-field p-col-12">
                            <div className="p-field ">
                                <label htmlFor="icon">Propriétaire de la carte</label>
                                <InputText name="owner" type="text" defaultValue={paymentInfo.owner} onChange={handleChange}/>
                            </div>
                        </div>



                        {/*<div className="p-field p-col-12">
                            <div className="p-field ">
                                <label htmlFor="icon">Moyen de paiement</label>
                                <Dropdown name="type" defaultValue={user.payment.type} value={form.payment.type} options={types} placeholder="Sélectionner un moyen de paiement" onChange={handleChange}/>
                            </div>
                        </div>*/}

                        <div className="p-field p-col">
                            <label htmlFor="firstname1">Numéro de carte</label>
                            <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText name="card_number" type="text" defaultValue={paymentInfo.card_number} keyfilter="alpha" onChange={handleChange}/>
                        </span>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname1">Date d'expiration</label>
                            <span className="p-input-icon-left">
                            <i className="pi pi-user" />
                            <InputText name="expire_date" type="text" defaultValue={paymentInfo.expire_date} keyfilter="alphanum" onChange={handleChange}/>
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
