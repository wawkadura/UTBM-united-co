import "./Associations.css";
import 'primeflex/primeflex.css';
import logocroixrouge from "../../../images/images_vitrine/logoCroixrouge.jpg"
import logoSpa from "../../../images/images_vitrine/logoSpa.jpg"
import logoGreenpeace from "../../../images/images_vitrine/logoGreenpeace.jpg"
import {HashLink} from "react-router-hash-link";
import {Button} from "primereact/button";

function Associations() {
    return <div className="associations" id="associations">
        <h2>Associations</h2>

        <div className="p-d-flex p-jc-evenly associations-card">
            <div className="p-mr-4">
                <img className="image-associations " src={logocroixrouge}  alt="logocroixrouge"/> 
                <h2>La croix rouge française</h2>
                <h4 className="space-text "> La Croix-Rouge française (CRF) est une association d'aide humanitaire française fondée en 1864. Elle a pour objectif de venir en aide aux personnes en difficulté en France et à l'étranger. Ses missions fondamentales sont l'urgence, le secourisme, l'action sociale, la formation, la santé et l'action internationale. </h4>
            </div>
            <div className="p-mr-4">
                <img className="image-associations " src={logoSpa} alt="ogoSpa"/> 
                <h2>Société protectrice des animaux</h2>
                <h4 className="space-text">La SPA est, historiquement en France, la première association qui œuvre dans le domaine de la protection animale. Depuis 176 ans, elle se mobilise pour venir en aide aux animaux en détresse et pour promouvoir le bien-être animal auprès des Français.</h4>
            </div>
            <div>
                <img className="image-associations " src={logoGreenpeace} alt="logoGreenpeace"/>
                <h2>Greenpeace</h2>
                <h4 className="space-text">Greenpeace (ce qui en français veut dire « paix verte ») est une association et une organisation non-gouvernementale à but non-lucratif qui s'occupe des problèmes écologiques et de la protection de l'environnement.</h4>
            </div>
        </div> 
        <HashLink smooth to="/associations" style={{textDecoration: "none"}}><Button className="associations-text-button" label="Voir plus" iconPos="right" /></HashLink>
    </div>
}

export default  Associations
