import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';

import {useRef, useState} from "react";
import {Link} from "react-router-dom";

import './Navbar.css';
import logo from "../../images/united_logo.png";
import {HashLink} from "react-router-hash-link";

function Navbar() {
    const [auth, setAuth] = useState(false);
    const menu = useRef(null);

    const user = "Tony LE";
    const items = [
        { label:'Mon profil', icon:'pi pi-user-edit' },
        { label: 'Changer d\'utilisateur', icon: 'pi pi-users'},
        { separator:true },
        { label:'Se déconnecter', icon:'pi pi-fw pi-power-off', command: () => { setAuth(false)} }
    ];

    return <div className="header">
        <header>
            <img src={logo} alt="logo"/>
            <nav>
                <ul>
                    <li><Link to="/home">Accueil</Link></li>
                    <li><HashLink smooth to="/home#services">Nos services</HashLink></li>
                    <li><Link to="/associations">Associations</Link></li>
                    <li><HashLink smooth to="/home#about">À propos</HashLink></li>
                    <li><HashLink smooth to="/home#contact">Contact</HashLink></li>
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
