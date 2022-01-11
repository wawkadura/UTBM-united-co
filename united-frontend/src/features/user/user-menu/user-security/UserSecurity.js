import "./UserSecurity.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {ScrollPanel} from "primereact/scrollpanel";

function UserSecurity({user}) {
    function paymentType(type) {
        return type === "credit_card" ? "Carte de crédit" : "Autre"
    }

    return <div className="user-security">
        <Card title="Sécurité & Paiement" subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
            <Divider/>

            <Panel header="Informations de connexion">
                <p><span>Adresse email</span> : {user.email}</p>
                <Divider/>

                <p><span>Mot de passe : </span> ********</p>
            </Panel>
            <Panel header="Informations de paiement">
                <p><span>Type de paiement :  </span> {paymentType(user.payment.type)}</p>
                <Divider />

                <p><span>BIC :  </span> {user.payment.bic}</p>
                <Divider />

                <p><span>IBAN : </span> {user.payment.iban}</p>
            </Panel>
        </Card>
    </div>
}

export default UserSecurity
