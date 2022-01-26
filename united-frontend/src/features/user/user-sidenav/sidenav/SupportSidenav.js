import {Button} from "primereact/button";
import {Divider} from "primereact/divider";

function SupportSidenav({onChangeType}) {
    return  <div>
        <Button onClick={() => {onChangeType("info")}} label="Informations personnelles" icon="pi pi-user" />
        <Divider/>

        <Button onClick={() => {onChangeType("tickets")}} label="Mes tickets" icon="pi pi-list" />
        <Divider />

        <Button onClick={() => {onChangeType("security")}} label="Sécurité" icon="pi pi-shield" />
    </div>
}

export default SupportSidenav;
