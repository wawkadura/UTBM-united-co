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
    
    const [dataBugs, setDataBugs] = useState({
        bugs: {},
    });

    const [dataDonations, setDataDonations] = useState({
        donations: {},
    });

    useEffect(() => {
        adminService.getAdminStats().then((response) => {
            if (response.statusCode!=200 && toast.current != null) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode +" : "+ response.message, life: 3000 });
            }else{
                setDataUsers({
                    associations: response.data.associations,
                    donors: response.data.donors,
                })
                setDataDonations({
                    donations: response.data.donations,
                })
                setDataBugs({
                    bugs: response.data.tickets,
                })
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
