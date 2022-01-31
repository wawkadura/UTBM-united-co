import {Button} from "primereact/button";

import './Landing.css';
import association from "../../../images/shared/association.png";
import {HashLink} from "react-router-hash-link";

function Landing() {
    return <div className="landing">
        <div className="contents">
                <div className="text">
                    <h1>Mise en relation de <span>donateurs</span> <br/> et <span>d'associations</span></h1>
                    <h4>Mettez en avant votre association et gérer vos abonnements depuis une même plateforme.</h4>
                    <HashLink smooth to="/home#services" style={{textDecoration: "none"}}><Button  label="Démarrer" icon="pi pi-arrow-down" iconPos="right" /></HashLink>
                </div>
                <div className="imagevitrine">
                    <img src={association} alt="landing" />
                </div>
        </div>
    </div>
}

export default Landing
