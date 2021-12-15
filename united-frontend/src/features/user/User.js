import "./User.css";

import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';

import user_man from "../../shared/images/user-man.png";
import user_woman from "../../shared/images/user-woman.png";

function User() {
    const user = "Park Chaeyoung";
    const userType = "KPOP Idol"

    return <div className="user">
        <div className="user-container">
            <div className="user-sidenav">
                <div className="sidenav-header">
                    <img src={user_man} alt="user_logo"/>
                    <div>
                        <h3>{user}</h3>
                        <p>{userType}</p>
                    </div>
                </div>
                <div className="sidenav-contents">
                    <Button label="Mes informations personnelles" icon="pi pi-user" />
                    <Divider/>

                    <Button label="Mes favoris" icon="pi pi-heart" />
                    <Divider />

                    <Button label="Mes abonnements" icon="pi pi-list" />
                    <Divider />

                    <Button label="Mes factures" icon="pi pi-file" />
                    <Divider />

                    <Button label="Sécurité" icon="pi pi-shield" />
                </div>
            </div>
            <div className="user-contents">
                <Card title="Vos informations personnelles" subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
                    <Divider/>
                    <Panel header="Informations basiques">
                        <p><span>Prénom : </span>Chaeyoung is bae</p>
                        <Divider />

                        <p><span>Nom de famille : </span>Park</p>
                        <Divider />

                        <p><span>Date de naissance : </span>11/02/1997</p>
                        <Divider />

                        <p><span>Genre :  </span>Femme</p>
                        <Divider />

                        <p><span>Groupe : </span>BLACKPINK</p>
                    </Panel>

                    <Panel header="Informations de contact">
                        <p><span>Adresse mail :  </span>rosie@blackpink.kr</p>
                        <Divider />

                        <p><span>Numéro de téléphone :  </span> +823532450845</p>
                    </Panel>
{/*                    <Panel header="Informations de paiement" toggleable>
                        <p><span>Type de paiement :  </span> Chaeyoung</p>
                        <Divider />

                        <p><span>BIC :  </span> CERGERF</p>
                        <Divider />

                        <p><span>IBAN : </span> FR04 5454 4541 5645 441</p>
                    </Panel>*/}
                </Card>
            </div>
        </div>
    </div>
}

export default User
