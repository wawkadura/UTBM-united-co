import {Button} from "primereact/button";
import {Divider} from "primereact/divider";

import user_man from "../../../shared/images/user-man.png";
import "./UserSidenav.css";

function UserSidenav({type, setType}) {
    const user = "Park Chaeyoung";
    const userType = "KPOP Idol"

    const onChangeType = (type) => {
        setType(type);
    }

    return <div className="user-sidenav">
        <div className="sidenav-header">
            <img src={user_man} alt="user_logo"/>
            <div>
                <h3>{user}</h3>
                <p>{userType}</p>
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
