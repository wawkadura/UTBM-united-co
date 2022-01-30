import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';

import { useRef, useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

import './Navbar.css';

import logo from "../../../images/shared/united_logo.png";
import {HashLink} from "react-router-hash-link";
import {UserService} from "../../../features/user/UserService";
import StringUtil from "../../../utils/StringUtil";

function Navbar() {
    const [auth, setAuth] = useState(sessionStorage.getItem('userId'));
    const [user, setUser] = useState('Tony LE');

    const menu = useRef(null);

    const userService = new UserService();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!auth && sessionStorage.getItem('token')) {
            setAuth(true);
        }
    });

    if(auth) {
        userService.getUser(auth).then(data => {
            console.log('navbar');
            console.log(data);
            setUser(data !== undefined ? `${StringUtil.capitalize(data.firstName)} ${data.lastName.toUpperCase()}` : '');
        });
    }



    const items = [
        { label:'Mon profil', icon:'pi pi-user-edit', command: () => { navigate("/user", {state: {id: auth}})} },
        { label: 'Changer d\'utilisateur', icon: 'pi pi-users', command: () => {
                setAuth(false);
                sessionStorage.clear();
                navigate("/home/signIn")
            }
        },
        { separator: true },
        { label: 'Se déconnecter', icon: 'pi pi-fw pi-power-off', command: () => {
                setAuth(false);
                sessionStorage.clear();
                navigate("/home");
            }
        }
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
                    { !auth ?
                        <li><HashLink smooth to="/home#contact">Contact</HashLink></li> :
                        <li><Link to="/ticket">Contact</Link></li>
                    }
                </ul>
            </nav>
            <div className="buttons">
                { !auth ?
                    <div className="auth">
                        <Button label="Inscription" className="p-button-rounded" onClick={() => navigate("/sign-up")} />

                        <Button label="Connexion" className="p-button-rounded" onClick={() => navigate("/home/signIn")} />
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
