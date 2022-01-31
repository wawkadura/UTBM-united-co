import "./AdminSidenav.css";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import user_man from "../../../images/shared/user-man.png";
import { Skeleton } from 'primereact/skeleton';

function AdminSidenav({ dataPending, admin, type, setType }) {
    const adminName = admin.firstName + " " + admin.lastName;

    // change the type of the displayed tab
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
            <Divider />
            <Button onClick={() => { onChangeType("tickets") }} label="Tickets" icon="pi pi-ticket" />

        </div>
    </div>
}

export default AdminSidenav
