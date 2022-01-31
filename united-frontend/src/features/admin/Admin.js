import "./Admin.css";
import AdminSidenav from "./admin-sidenav/AdminSidenav";
import AdminOverview from "./admin-menu/admin-overview/AdminOverview";
import AdminDonors from "./admin-menu/admin-donors/AdminDonors";
import AdminAssociations from "./admin-menu/admin-associations/AdminAssociations";
import AdminStatistics from "./admin-menu/admin-statistics/AdminStatistics";
import AdminCommunications from "./admin-menu/admin-communications/AdminCommunications";
import AdminTickets from "./admin-menu/admin-tickets/AdminTickets";
import { AdminService } from "./AdminService";
import { Toast } from 'primereact/toast';
import { useState, useRef, useEffect } from "react";

function Admin() {
    const adminID = sessionStorage.getItem('userId');
    const [refresh, setR] = useState(true)
    const [dataPending, setDataPending] = useState(true);
    const [type, setType] = useState("overview");
    const [data, setData] = useState({
        id: adminID,
        email: "walid.kadura@united.co",
        firstName: "El Walid",
        lastName: "Kadura"
    })
    const adminService = new AdminService()
    function Refresh() {
        setR(true)
        setR(false)
    }
    const toast = useRef(null);

    useEffect(() => {
        adminService.getAdminInfo(adminID).then((response) => {
            if (response.statusCode!=200 && toast.current != null) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail:  response.statusCode +" : "+ response.message, life: 10000 });
            }else{
                setData({
                    id: adminID,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                })
            }
            setDataPending(false)
        });
    }, [refresh]);
    const component = () => {
        switch (type) {
            case "overview": return <AdminOverview Refresh={Refresh} dataPending={dataPending} toast={toast} admin={data} />;
            case "donors": return <AdminDonors Refresh={Refresh}  toast={toast} />;
            case "associations": return <AdminAssociations Refresh={Refresh}  toast={toast} />;
            case "statistics": return <AdminStatistics toast={toast} />;
            case "communications": return <AdminCommunications toast={toast} />;
            case "tickets": return <AdminTickets toast={toast} />;

            default: return <AdminOverview />;
        }
    }
    return <div className="admin">
        <div className="admin-container">
            <Toast ref={toast} />

            <div className="admin-sidenav">
                <AdminSidenav dataPending={dataPending} admin={data} type={type} setType={setType} />
            </div>
            <div className="admin-contents">
                {component()}
            </div>
        </div>
    </div>
}

export default Admin
