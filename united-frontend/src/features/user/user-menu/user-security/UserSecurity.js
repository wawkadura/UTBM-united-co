import "./UserSecurity.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {UserService} from "../../UserService";
import StringUtil from "../../../../utils/StringUtil";
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';

import Moment from 'moment';

function UserSecurity({user, setUser}) {
    const userService = new UserService();
    const [form, setForm] = useState({
        password: "",
        owner: "",
        card_number: "",
        expire_date: ""
    });
    const [paymentInfo, setPaymentInfo] = useState({
        owner: "",
        card_number: "",
        expire_date: ""
    });

    useEffect(() => {
        userService.getUserPayment(user.id).then(data => {
            setPaymentInfo(data);
            setForm(data);
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

        setForm({
            ...form,
            ...(name === "password" && { password: value }),
            ...(name === "owner" && { owner: value }),
            ...(name === "card_number" && { card_number: value }),
            ...(name === "expire_date" && { expire_date: Moment(value).format('yyyy-MM-DD') }),
        });

        console.log('form');
        console.log(form);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setPaymentInfo({
            ...form,
            owner: form.owner,
            card_number: form.card_number,
            expire_date: form.expire_date,
            password: null
        });
        
        const body = {
            user_id: user.id,
            owner: form.owner,
            card_number: form.card_number,
            expire_date: form.expire_date
        }


        console.log('body');
        console.log(body);

        userService.modifyPaymentInfo(user.id, body);

        if(form.password !== undefined && form.password !== "") { userService.modifyUserPassword(user.id, form.password).then((r => console.log(r))); }
    }


    return <div className="user-security">
        <Card title="Sécurité & Paiement" footer={cardFooter} subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
            <Divider/>

            <Panel header="Informations de sécurité">
                <p><span>Mot de passe : </span> ********</p>
            </Panel>
            <Panel header="Informations de paiement">
                <p><span>Type de paiement :  </span> Carte de crédit</p>
                <Divider />

                <p><span>Propriétaire de la carte :  </span> {paymentInfo ? StringUtil.checkValue(paymentInfo.owner, paymentInfo.owner) : ''}</p>
                <Divider />

                <p><span>Numéro de carte :  </span> {paymentInfo ? StringUtil.checkValue(paymentInfo.card_number, paymentInfo.card_number) : ''}</p>
                <Divider />

                <p><span>Date d'expiration : </span> {paymentInfo ? StringUtil.checkValue(paymentInfo.expire_date, paymentInfo.expire_date) : ''}</p>
            </Panel>

            <Dialog header="Sécurité & Paiement" position="center" draggable={false} visible={displayBasic} style={{ width: '40vw' }} onHide={() => onHide('displayBasic')}>
                <Divider/>
                <form onSubmit={handleSubmit}>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12">
                            <div className="p-field ">
                                <label htmlFor="icon">Mot de passe</label>
                                <InputText name="password" type="password" defaultValue="" onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="p-field p-col-12">
                            <div className="p-field ">
                                <label htmlFor="icon">Propriétaire de la carte</label>
                                <InputText name="owner" type="text" defaultValue={paymentInfo ? paymentInfo.owner : ''} onChange={handleChange}/>
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
                            <i className="pi pi-credit-card" />
                            <InputText name="card_number" type="text" defaultValue={paymentInfo ? paymentInfo.card_number : ''} onChange={handleChange} keyfilter="num"/>
                        </span>
                        </div>
                        <div className="p-field p-col">
                            <label htmlFor="lastname1">Date d'expiration</label>
                            <span className="p-input-icon-left">
                            <i className="pi pi-calendar" />

                            <Calendar name="expire_date" defaultValue={paymentInfo ? paymentInfo.expire_date:''} onChange={handleChange} showIcon view="month" dateFormat="mm/yy" yearNavigator yearRange="2022:2100" mask="99/9999"/>

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
