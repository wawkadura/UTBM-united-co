import user_man from "../../../images/shared/user-man.png";

import "./UserSidenav.css";
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";

function UserSidenav({type, setType, user, stringUtil}) {
    const onChangeType = (type) => { setType(type); }

    return <div className="user-sidenav">
        <div className="sidenav-header">
            <img src={user_man} alt="user_logo"/>
            <div>
                <h3>{user !== undefined ? `${stringUtil.capitalize(user.firstName)}  ${user.lastName.toUpperCase()}` : "En cours de chargement..."}</h3>
                <p>Donateur</p>
            </div>
        </div>
        <div className="sidenav-contents">
            <Button onClick={() => {onChangeType("info")}} label="Informations personnelles" icon="pi pi-user" />
            <Divider/>

            <Button onClick={() => {onChangeType("favorites")}} label="Mes favoris" icon="pi pi-heart" />
            <Divider />

            <Button onClick={() => {onChangeType("subscriptions")}} label="Mes abonnements" icon="pi pi-list" />
            <Divider />

            <Button onClick={() => {onChangeType("invoices")}} label="Mes factures" icon="pi pi-file" />
            <Divider />

            <Button onClick={() => {onChangeType("security")}} label="Sécurité & Paiement" icon="pi pi-shield" />
        </div>
    </div>
}

export default UserSidenav
