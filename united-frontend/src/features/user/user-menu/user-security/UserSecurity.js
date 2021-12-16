import "./UserSecurity.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {ScrollPanel} from "primereact/scrollpanel";

function UserSecurity() {
    return <div className="user-security">
        <Card title="Sécurité & Paiement" subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
            <Divider/>

            <Panel header="Informations de connexion">
                <p><span>Adresse email</span> : rosie@blackpink.kr</p>
                <Divider/>

                <p><span>Mot de passe : </span> ********</p>
            </Panel>
            <Panel header="Informations de paiement">
                <p><span>Type de paiement :  </span> Carte bancaire</p>
                <Divider />

                <p><span>BIC :  </span> CERGERF</p>
                <Divider />

                <p><span>IBAN : </span> FR76 1234 1234 1234 1234 185</p>
            </Panel>
        </Card>
    </div>
}

export default UserSecurity
