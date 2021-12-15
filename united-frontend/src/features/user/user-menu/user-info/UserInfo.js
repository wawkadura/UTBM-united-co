import "./UserInfo.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {ScrollPanel} from "primereact/scrollpanel";

function UserInfo() {
    return <div className="user-contents">
        <Card title="Vos informations personnelles" subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
            <Divider/>

            <ScrollPanel style={{width: '100%', height: '70vh'}}>
                <Panel header="Informations basiques">
                    <p><span>Prénom : </span>Chaeyoung is bae</p>
                    <Divider />

                    <p><span>Nom de famille : </span>Park</p>
                    <Divider />

                    <p><span>Date de naissance : </span>11/02/1997</p>
                    <Divider />

                    <p><span>Genre :  </span>Femme</p>
                </Panel>

                <Panel header="Informations de contact">
                    <p><span>Adresse mail :  </span>rosie@blackpink.kr</p>
                    <Divider />

                    <p><span>Numéro de téléphone :  </span> +823532450845</p>
                </Panel>
            </ScrollPanel>
        </Card>
    </div>
}

export default UserInfo
