import "./AdminStatistics.css";
import React from 'react';
import { Card } from "primereact/card";
import { TabView, TabPanel } from 'primereact/tabview';
import GraphUsers from "./graphs/graph-users/GraphUsers";
import GraphDonations from "./graphs/graph-donations/GraphDonations";
import GraphBugs from "./graphs/graph-bugs/GraphBugs";
import { useState, useRef, useEffect } from "react";
import { Toast } from 'primereact/toast';
import { AdminService } from "../../AdminService";
import { ProgressSpinner } from 'primereact/progressspinner';

function AdminStatistics() {
    const adminService = new AdminService()
    const [isPending, setIsPending] = useState(true);
    const toast = useRef(null);
    const [dataUsers, setDataUsers] = useState({
        associations: {},
        donors: {},
    });

    var dataDonations = {
        donations: {},
    }

    var dataBugs = {
        bugs: {},
    }
    useEffect(() => {
        adminService.getAdminStats().then((response) => {
            if (response.statusCode!=200 && toast.current != null) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode +" : "+ response.message, life: 3000 });
            }else{
                setDataUsers({
                    associations: response.data.associations,
                    donors: response.data.donors,
                })
                dataDonations.donations = response.data.donations
                dataBugs.bugs = response.data.tickets
            }
            setIsPending(false)
        });
    }, []);

    return (
        <Card title="Statistiques générales" style={{ height: '100%' }}>
            <Toast ref={toast} />
            <div className="card">
                {isPending ? <div className="spinner"> <ProgressSpinner /></div> :
                    <TabView className="tabview-header-icon">
                        {/* <TabPanel header="Dons" leftIcon="pi pi-heart">
                            <GraphDonations data={dataDonations} />
                        </TabPanel> */}
                        <TabPanel header="Utilisateurs" leftIcon="pi pi-user">
                            <GraphUsers data={dataUsers} />
                        </TabPanel>
                        <TabPanel header="Bugs" leftIcon="pi pi-server">
                            <GraphBugs data={dataBugs} />
                        </TabPanel>
                    </TabView>
                }
            </div>
        </Card>
    )
}

export default AdminStatistics



// var dataUsers = {
//     associations: {
//         2022: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],
//         2021: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
//         2020: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],

//     },
//     donors: {
//         2022: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
//         2021: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],
//         2020: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
//     },
// }

// var dataDonations = {
//     donations: {
//         2022: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
//         2021: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],
//         2020: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
//     },
// }

// var dataBugs = {
//     bugs: {
//         2022: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
//         2021: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],
//         2020: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
//     },
// }