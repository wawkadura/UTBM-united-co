import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';

import {useRef, useState} from "react";
import './Navbar.css';

import logo from "../../images/united_logo.png";

function Navbar() {
    const [auth, setAuth] = useState(false);
    const menu = useRef(null);

    const user = "Tony LE";
    const items = [
        { label:'Mon profile', icon:'pi pi-user-edit' },
        { label: 'Changer d\'utilisateur', icon: 'pi pi-users'},
        { separator:true },
        { label:'Se déconnecter', icon:'pi pi-fw pi-power-off', command: () => { setAuth(false)} }
    ];

    return <div className="header">
        <header>
            <img src={logo} alt="logo"/>
            <nav>
                <ul>
                    <li>Accueil</li>
                    <li>Nos services</li>
                    <li>Associations</li>
                    <li>À propos</li>
                    <li>Contact</li>
                </ul>
            </nav>
            <div className="buttons">
                { !auth ?
                    <div className="auth">
                        <Button label="Inscription" className="p-button-rounded"/>
                        <Button label="Connexion" className="p-button-rounded" onClick={() => setAuth(true)}/>
                    </div> :
                    <div className="dropdown" >
                        <TieredMenu model={items} popup ref={menu} />
                        <Button label={user} className="p-button-rounded" icon="pi pi-user" onClick={(event) => menu.current.toggle(event)}/>
                    </div>
                }
            </div>
        </header>
    </div>
}

export default Navbar
