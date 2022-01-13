import "./Admin.css";

import AdminSidenav from "./admin-sidenav/AdminSidenav";
import AdminOverview from "./admin-menu/admin-overview/AdminOverview";
import AdminDonors from "./admin-menu/admin-donors/AdminDonors";
import AdminAssociations from "./admin-menu/admin-associations/AdminAssociations";
import AdminStatistics from "./admin-menu/admin-statistics/AdminStatistics";
import AdminCommunications from "./admin-menu/admin-communications/AdminCommunications";
import {useState} from "react";

function Admin() {
    const [type, setType] = useState("overview");
    const component = () => {
        switch (type) {
            case "overview" : return <AdminOverview/>;
            case "donors": return <AdminDonors/>;
            case "associations": return <AdminAssociations/>;
            case "statistics": return <AdminStatistics/>;
            case "communications": return <AdminCommunications/>;

            default: return <AdminOverview/>;
        }
    }
    return <div className="admin">
        <div className="admin-container">
            <div className="admin-sidenav">
                <AdminSidenav type={type} setType={setType}/>
            </div>
            <div className="admin-contents">
                {component()}
            </div>
        </div>
    </div>
}

export default Admin
