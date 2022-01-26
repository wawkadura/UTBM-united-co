import {Button} from "primereact/button";
import {Divider} from "primereact/divider";

function DonatorSidenav({onChangeType}) {
    return  <div>
        <Button onClick={() => {onChangeType("info")}} label="Informations personnelles" icon="pi pi-user" />
        <Divider/>

        <Button onClick={() => {onChangeType("favorites")}} label="Mes favoris" icon="pi pi-heart" />
        <Divider />

        <Button onClick={() => {onChangeType("subscriptions")}} label="Mes abonnements" icon="pi pi-list" />
        <Divider />

        <Button onClick={() => {onChangeType("invoices")}} label="Mes factures" icon="pi pi-file" />
        <Divider />

        <Button onClick={() => {onChangeType("security")}} label="Sécurité & Paiement" icon="pi pi-shield" />
    </div>;
}

export default  DonatorSidenav;
