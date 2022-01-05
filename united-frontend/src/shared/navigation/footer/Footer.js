import './Footer.css';
import logo from "../../../images/shared/united_logo.png";

import { InputText } from 'primereact/inputtext';
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {HashLink} from "react-router-hash-link";
import { useForm } from "react-hook-form";
import { Toast } from 'primereact/toast';
import {useState, useRef} from "react";

function Footer() {

    const {handleSubmit, register, formState: { errors } } = useForm();
    //error message display when a text field require spécifcation
    const ErrorMessage = ({message})=>(<h5 className='errors-text-color'>{message}</h5>) 
    const toast = useRef(null);
    //Message showed when the form is fill correctly
    const showSuccess = () => {toast.current.show({severity:'success', summary: 'Newsletter', detail:'Vous êtes abonné à notre liste de diffusion', life: 3000});}
    //action made when the form is submited 
    const onSubmit = (data) => {
        if (data) {
            showSuccess();
            console.log({data});
        }
    }

    return <div className="footer">
        <Toast ref={toast} />
        <footer className="w-full text-center bg-dark-indigo text-light p-8">
            <div className="left">
                <img src={logo} alt="logo"/>
            </div>
            <ul>
                <li><Link className='footer-link' to="/home">Accueil</Link></li>
                <li><HashLink className='footer-link' to="/home#services">services</HashLink></li>
                <li><Link className='footer-link' to="/Associations">Associations</Link></li>
                <li><HashLink className='footer-link' to="/home#about">À propos</HashLink></li>
                <li><HashLink className='footer-link' to="/home#contact">Contact</HashLink></li>
            </ul>
            <ul>
                <li><Link className='footer-link' to="/FAQ">FAQ</Link></li>
                <li><Link className='footer-link' to="/conditiongenerales">Conditions générales</Link></li>
                <li><Link className='footer-link' to="/TCS">T & C's</Link></li>
                <li><Link className='footer-link' to="/privacy">Privacy</Link></li>
                <li><Link className='footer-link' to="/community">Community</Link></li>
            </ul>
            <div className="right">
                <h4>Recevez notre newsletter</h4>
                <div>
                    <InputText type="email" {...register("email",{required:"Saisir une adresse email.", pattern:{value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message:"Saisir une adresse email valide."}})} />
                    <Button onClick={handleSubmit(onSubmit)} label="S'abonner" id="subscribe"  />
                    {errors?.email && <ErrorMessage message={errors.email.message}/>}
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
