import {Button} from "primereact/button";

import './Landing.css';
import association from "../../../shared/images/association.png";
import {HashLink} from "react-router-hash-link";

function Landing() {
    return <div className="landing">
        <div className="contents">
                <div className="text">
                    <h1>Mise en relation de <span>donateurs</span> <br/> et <span>d'associations</span></h1>
                        <h4>Mettez en avant votre association et gérer vos abonnements depuis une même plateforme. {/*<span>Rosé is bae</span>*/}</h4>
                    <HashLink smooth to="/home#services" style={{textDecoration: "none"}}><Button  label="En savoir plus" icon="pi pi-arrow-down" iconPos="right" /></HashLink>
                </div>
                <div className="image">
                    <img src={association} alt="landing-image"/>
                </div>
        </div>
    </div>
}

export default Landing
