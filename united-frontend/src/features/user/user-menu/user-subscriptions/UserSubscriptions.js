import "./UserSubscriptions.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";

function UserSubscriptions() {
    return <div className="user-subscriptions">
        <Card title="Vos abonnements" subTitle="Vous pouvez retrouvez sur cette page l'ensemble de vos abonnements" style={{ height: '100%' }}>
            <Divider/>

        </Card>
    </div>
}

export default UserSubscriptions
