import "./UserSecurity.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {ScrollPanel} from "primereact/scrollpanel";

function UserSecurity() {
    return <div className="user-security">
        <Card title="Sécurité & Paiement" subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
            <Divider/>

            <ScrollPanel style={{width: '100%', height: '70vh'}}>
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

                    <p><span>IBAN : </span> FR04 5454 4541 5645 441</p>
                </Panel>
            </ScrollPanel>

        </Card>
    </div>
}

export default UserSecurity
