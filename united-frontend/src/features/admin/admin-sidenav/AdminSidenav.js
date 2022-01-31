import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import user_man from "../../../images/shared/user-man.png";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Skeleton } from 'primereact/skeleton';

import "./AdminSidenav.css";

function AdminSidenav({ dataPending, admin, type, setType }) {
    const adminName = admin.firstName + " " + admin.lastName;

    const onChangeType = (type) => {
        setType(type);
    }

    return <div className="admin-sidenav">
        <div className="sidenav-header">
            <img src={user_man} alt="user_logo" />
            {dataPending ? <Skeleton width="10rem" height="4rem"></Skeleton> :
                <div>
                    <h3>{adminName}</h3>
                    <p>Administrateur</p>
                </div>
            }
        </div>
        <div className="sidenav-contents">
            <Button onClick={() => { onChangeType("overview") }} label="Informations générale" icon="pi pi-info-circle" />
            <Divider />

            <Button onClick={() => { onChangeType("donors") }} label="Gestion des donateurs" icon="pi pi-users" />
            <Divider />

            <Button onClick={() => { onChangeType("associations") }} label="Gestion des associations" icon="pi pi-sitemap" />
            <Divider />

            <Button onClick={() => { onChangeType("statistics") }} label="Statistiques générale" icon="pi pi-chart-bar" />
            <Divider />

            <Button onClick={() => { onChangeType("communications") }} label="Communications" icon="pi pi-envelope" />

        </div>
    </div>
}

export default AdminSidenav