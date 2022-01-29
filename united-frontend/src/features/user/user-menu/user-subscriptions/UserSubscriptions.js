import "./UserSubscriptions.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useState} from "react";
import {UserService} from "../../UserService";

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


    useEffect(() => {
        const userService = new UserService();
        userService.getSubscriptions(userId).then(data => {
            data.forEach(element => element.status = element.state === 1 ? 'actif' : 'inactif');
            data.forEach(element => element.date = date(new Date(element.date)));
            setSubscriptions(data)
        });
    }, [userId]);

    function date(date) {
        return new Intl.DateTimeFormat("fr-FR", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date);
    }


    function actions(id) {
        return (
            <div className="actions">
                <Button icon="pi pi-times" className="p-button-rounded p-button-text" onClick={() => removeSubscription(id)}/>
            </div>
        )
    }
    
    function removeSubscription(data) {
        userService.deleteSubscription(data.id).then(r => console.log(r));
        setSubscriptions(subscriptions.filter(subscription => subscription.id !== data.id));
    }

    return <div className="user-subscriptions">
        <Card title="Vos abonnements" subTitle="Vous pouvez retrouvez sur cette page l'ensemble de vos abonnements" style={{ height: '100%' }}>
            <Divider/>

            <DataTable value={subscriptions} scrollable scrollHeight="41.5rem" size="normal">
                <Column field="acronym" header="Association" sortable/>
                <Column field="price" header="Prx (euros)" sortable/>
                <Column field="status" header="Statut" sortable/>
                <Column field="date" header="Date" sortable/>
                <Column field="duration" header="Durée (mois)" sortable/>
                <Column header="Actions" body={(data) => actions(data)}/>
            </DataTable>
        </Card>
    </div>
}

export default UserSubscriptions
