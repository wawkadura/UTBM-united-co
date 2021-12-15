import "./UserInvoices.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

function UserInvoices() {
    const idols = [
        {id: "1", name: "Rosé", group: "Blackpink", position: "Main vocalist"},
        {id: "2", name: "Jisoo", group: "Blackpink", position: "Lead vocalist"},
        {id: "3", name: "Lisa", group: "Blackpink", position: "Lead rapper"},
        {id: "4", name: "Jennie", group: "Blackpink", position: "Main rapper"}
    ]

    const invoices = [
        {id: "1", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
        {id: "2", association: "Médecins du monde", sub_type: "Standard", price: "5e", payment_type: "Carte de crédit", date: "01/02/2012"},
        {id: "3", association: "Restos du coeur", sub_type: "Plus", price: "10e", payment_type: "Carte de crédit", date: "01/02/2012"},
        {id: "4", association: "SPA", sub_type: "Premium", price: "20e", payment_type: "Carte de crédit", date: "01/02/2012"},
    ]

    return <div className="user-invoices">
        <Card title="Vos factures" subTitle="Vous pouvez retrouvez sur cette page l'ensemble de vos factures" style={{ height: '100%' }}>
            <Divider />
            <DataTable value={invoices}>
                <Column field="id" header="ID."/>
                <Column field="association" header="Association"/>
                <Column field="sub_type" header="Type d'abonnement"/>
                <Column field="price" header="Prix"/>
                <Column field="payment_type" header="Moyen de paiement"/>
                <Column field="date" header="Date"/>
            </DataTable>
        </Card>
    </div>
}

export default UserInvoices
