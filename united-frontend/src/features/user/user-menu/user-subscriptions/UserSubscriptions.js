import "./UserSubscriptions.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useState} from "react";
import {UserService} from "../../UserService";
import StringUtil from "../../../../utils/StringUtil";
import { useNavigate } from "react-router-dom";
import { confirmPopup } from 'primereact/confirmpopup';

const _subscriptions = [
    {id: 1, status: "active", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 2, status: "active", association: "Blackpink", sub_type: "Standard", price: "5e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 3, status: "active", association: "Asso sport", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 4, status: "active", association: "BTS", sub_type: "Plus", price: "10e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 5, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 6, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 7, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 8, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 9, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 10, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 11, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 12, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 13, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: 14, status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
]

function UserSubscriptions({userId}) {
    const userService = new UserService();
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();
    const [ subId, setSubId ] = useState(null);
    const [selectedService, setSelectedService] = useState();

    useEffect(() => {
        const userService = new UserService();
        userService.getSubscriptions(userId).then(data => {
            data.forEach(element => element.status = element.state === 1 ? 'actif' : 'inactif');
            data.forEach(element => element.date = StringUtil.date(new Date(element.date)));
            data.forEach(element => element.endDate = StringUtil.date(new Date(element.endDate)));
            setSubscriptions(data)
        });
    }, [userId]);

    function actions(data) {
        return (
            <div className="actions">
                <Button icon="pi pi-times" className="p-button-rounded p-button-text" onClick={(event) => confirm(event, data)}/>
            </div>
        )
    }

    const confirm = (event, data) => {
        console.log(data, "rosé");
        setSubId(data.id);
        confirmPopup({
            target: event.currentTarget,
            message: 'Etes-vous sûr de supprimer cet abonnement ?',
            icon: 'pi pi-exclamation-triangle',
            accept
        });
    };

    const accept = () => removeSubscription(subId);
    
    function removeSubscription(data) {
        console.log(data,"eazjipeazpioej")
        userService.deleteSubscription(data.id).then(r => console.log(r));
        setSubscriptions(subscriptions.filter(subscription => subscription.id !== data.id));
    }

    function goService(data){
        sessionStorage.removeItem("servicePageId");
        sessionStorage.removeItem("assoPageId");

        sessionStorage.setItem("assoPageId", data.acronym);
        sessionStorage.setItem("servicePageId", data.title);

        navigate("/service")
    }

    return <div className="user-subscriptions">
        <Card title="Vos abonnements" subTitle="Vous pouvez retrouvez sur cette page l'ensemble de vos abonnements" style={{ height: '100%' }}>
            <Divider/>

            <DataTable value={subscriptions} scrollable scrollHeight="41.5rem" size="normal" selectionMode="single" onSelectionChange={e=>goService(e.value)}>
                <Column field="acronym" header="Association" sortable/>
                <Column field="title" header="Abonnement" sortable/>
                <Column field="price" header="Prix (euros)" sortable/>
                <Column field="status" header="Statut" sortable/>
                <Column field="date" header="Date" sortable/>
                <Column field="endDate" header="Date de fin" sortable/>
                <Column header="Actions" body={(data) => actions(data)}/>
            </DataTable>
        </Card>
    </div>
}

export default UserSubscriptions
