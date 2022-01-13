import "./AdminUsers.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const users = [
    {id: "1", status: "active", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "Blackpink", sub_type: "Standard", price: "5e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "Asso sport", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "BTS", sub_type: "Plus", price: "10e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
    {id: "1", status: "active", association: "UTBM", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", start_date: "01/02/2012", end_date: "01/02/2012"},
]

function AdminUsers() {
    function actions() {
        return (
            <div className="actions">
                <Button icon="pi pi-times" className="p-button-rounded p-button-text" />
            </div>
        )
    }

    return <div className="admin-users">
        <Card title="Gestion des utilisateurs" subTitle="Vous pouvez retrouvez sur cette page l'ensemble des utilisateurs de la platforme" style={{ height: '100%' }}>
            <Divider/>

            <DataTable value={users} scrollable scrollHeight="41.5rem" size="normal">
                <Column field="status" header="Statut" sortable/>
                <Column field="association" header="Association" sortable/>
                <Column field="sub_type" header="Abonnement" sortable/>
                <Column field="price" header="Prix" sortable/>
                <Column field="payment_type" header="Paiement" sortable/>
                <Column field="start_date" header="Début" sortable/>
                <Column field="end_date" header="Fin" sortable/>
                <Column header="Actions" body={actions}/>
            </DataTable>
        </Card>
    </div>
}

export default AdminUsers
