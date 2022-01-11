import {Button} from "primereact/button";
import {Divider} from "primereact/divider";

import user_man from "../../../images/shared/user-man.png";
import "./AdminSidenav.css";

function AdminSidenav({type, setType}) {
    const admin = "El Walid Kadura";

    const onChangeType = (type) => {
        setType(type);
    }

    return <div className="admin-sidenav">
        <div className="sidenav-header">
            <img src={user_man} alt="user_logo"/>
            <div>
                <h3>{admin}</h3>
                <p>Administrateur</p>
            </div>
        </div>
        <div className="sidenav-contents">
            <Button onClick={() => {onChangeType("overview")}} label="Informations générale" icon="pi pi-info-circle" />
            <Divider/>

            <Button onClick={() => {onChangeType("users")}} label="Gestion d'utilisateurs" icon="pi pi-users" />
            <Divider />

            <Button onClick={() => {onChangeType("statistics")}} label="Statistiques générale" icon="pi pi-chart-bar" />
            <Divider />

            <Button onClick={() => {onChangeType("communications")}} label="Communications" icon="pi pi-envelope" />

        </div>
    </div>
}

export default AdminSidenav
