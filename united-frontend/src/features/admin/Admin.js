import "./Admin.css";
import AdminSidenav from "./admin-sidenav/AdminSidenav";
import AdminOverview from "./admin-menu/admin-overview/AdminOverview";
import AdminDonors from "./admin-menu/admin-donors/AdminDonors";
import AdminAssociations from "./admin-menu/admin-associations/AdminAssociations";
import AdminStatistics from "./admin-menu/admin-statistics/AdminStatistics";
import AdminCommunications from "./admin-menu/admin-communications/AdminCommunications";
import { AdminService } from "./AdminService";
import { Toast } from 'primereact/toast';
import { useState, useRef, useEffect } from "react";

function Admin(adminID) {
    const [type, setType] = useState("overview");
    const [data, setData] = useState({
        id: adminID,
        email: "walid.kadura@united.co",
        firstName: "El Walid",
        lastName: "Kadura"
    })
    const adminService = new AdminService()


    const toast = useRef(null);

    useEffect(() => {
        adminService.getAdminInfo(adminID).then((response) => {
            if (!response.ok && toast.current != null) {
                // toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.status + ": " + response.statusText, life: 3000 });
            }
            if (response.ok && toast.current != null) {
                setData({
                    id: adminID,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                })
                //toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Les associations ont bien été récupérés', life: 3000 });
            }
        });
    });
    const component = () => {
        switch (type) {
            case "overview": return <AdminOverview toast={toast} admin={data} />;
            case "donors": return <AdminDonors toast={toast} />;
            case "associations": return <AdminAssociations toast={toast} />;
            case "statistics": return <AdminStatistics toast={toast} />;
            case "communications": return <AdminCommunications toast={toast} />;

            default: return <AdminOverview />;
        }
    }
    return <div className="admin">
        <div className="admin-container">
            <Toast ref={toast} />

            <div className="admin-sidenav">
                <AdminSidenav admin={data} type={type} setType={setType} />
            </div>
            <div className="admin-contents">
                {component()}
            </div>
        </div>
    </div>
}

export default Admin
