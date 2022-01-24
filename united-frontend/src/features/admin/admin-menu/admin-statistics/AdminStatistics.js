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

    var dataUsers = {
        associations: {
            2022: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],
            2021: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
            2020: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],

        },
        donors: {
            2022: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
            2021: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],
            2020: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
        },
    }

    var dataDonations = {
        donations: {
            2022: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
            2021: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],
            2020: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
        },
    }

    var dataBugs = {
        bugs: {
            2022: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
            2021: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 50],
            2020: [65, 59, 80, 81, 56, 55, 40, 40, 65, 59, 65, 59],
        },
    }
    useEffect(() => {
        adminService.getAdminStats().then((response) => {
            // console.log(response)
            if (!response.ok && toast.current != null) {
                //toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode + ": " + response.message, life: 3000 });
            }
            if (response.ok && toast.current != null) {
                setStats(response.data)
                //toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Les associations ont bien été récupérés', life: 3000 });
            }
            setIsPending(false)
        });
    });
    const setStats = (jsonResponse) => {
        console.log(jsonResponse)
     }

    return (
        <Card title="Statistiques générales" style={{ height: '100%' }}>
            <Toast ref={toast} />
            <div className="card">
                {isPending ? <div className="spinner"> <ProgressSpinner /></div> :
                    <TabView className="tabview-header-icon">
                        <TabPanel header="Dons" leftIcon="pi pi-heart">
                            <GraphDonations data={dataDonations} />
                        </TabPanel>
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
