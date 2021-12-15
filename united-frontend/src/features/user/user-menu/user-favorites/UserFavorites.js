import "./UserFavorites.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";

function UserFavorites() {
    return <div className="user-favorites">
        <Card title="Vos associations favorites" subTitle="Vous pouvez retrouvez sur cette page l'ensemble des associations que vous préférez" style={{ height: '100%' }}>
            <Divider/>

        </Card>
    </div>
}

export default UserFavorites
