import "./UserInvoices.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";

const invoices = [
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 02.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 03.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 04.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 05.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 06.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 07.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    {id: "1", name: "Facture 01.pdf", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
]

function UserInvoices() {
    function actions() {
        return (
            <div className="actions">
                <Button icon="pi pi-eye" className="p-button-rounded p-button-text" />
                <Button icon="pi pi-download" className="p-button-rounded p-button-text" />
            </div>
        )
    }

    return <div className="user-invoices">
        <Card title="Vos factures" subTitle="Vous pouvez retrouvez sur cette page l'ensemble de vos factures" style={{ height: '100%' }}>
            <Divider />
            <DataTable value={invoices} scrollable scrollHeight="flex" size="normal">
                <Column field="name" header="Nom" sortable/>
                <Column field="association" header="Association" sortable/>
                <Column field="sub_type" header="Abonnement" sortable/>
                <Column field="price" header="Prix" sortable/>
                <Column field="payment_type" header="Paiement" sortable/>
                <Column field="date" header="Date" sortable/>
                <Column header="Actions" body={actions}/>
            </DataTable>
        </Card>
    </div>
}

export default UserInvoices
