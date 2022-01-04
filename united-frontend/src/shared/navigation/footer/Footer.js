import './Footer.css';
import logo from "../../../images/shared/united_logo.png";

import { InputText } from 'primereact/inputtext';
import {Button} from "primereact/button";

function Footer() {
    return <div className="footer">
        <footer className="w-full text-center bg-dark-indigo text-light p-8">
            <div className="left">
                <img src={logo} alt="logo"/>
            </div>
            <ul>
                <li >Accueil</li>
                <li>services</li>
                <li>Associations</li>
                <li>À propos</li>
                <li>Contact</li>
            </ul>
            <ul>
                <li>FAQ</li>
                <li>Conditions générales</li>
                <li>T & C's</li>
                <li>Privacy</li>
                <li>Community</li>
            </ul>
            <div className="right">
                <h4>Recevez notre newsletter</h4>
                <div>
                    <InputText />
                    <Button label="S'abonner" id="subscribe"/>
                </div>
                <ul>
                    <li><Button icon="pi pi-facebook" className="p-button-rounded p-button-text" /></li>
                    <li><Button icon="pi pi-instagram" className="p-button-rounded p-button-text" /></li>
                    <li><Button icon="pi pi-twitter" className="p-button-rounded p-button-text" /></li>
                    <li><Button icon="pi pi-youtube" className="p-button-rounded p-button-text" /></li>
                </ul>
            </div>
        </footer>
    </div>
}

export default Footer
