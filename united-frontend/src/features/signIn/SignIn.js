import React, { useState } from 'react';
import { useForm, Controller, get } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import axios from 'axios'
import "./SignIn.css"

function SignIn(){

    const [IsLoginError, setIsLoginError] = useState(false);
    const [LoginMessage, setLoginMessage] = useState("");

    const defaultValues = {
        email: '',
        password: ''
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    
    async function onSubmit (data) {
        await axios.post('http://localhost:4200/account/sign-in', data
        ).then(
            (response)=>{
                if(response.data.statusCode === 404){
                    setLoginMessage(response.data.message);
                    setIsLoginError(true);
                }
                else{
                    sessionStorage.setItem('token', response.data.token.access_token)
                    sessionStorage.setItem('userId', response.data.payload.userId)
                }
        }).catch((error)=>{
            console.log("erreur : "+ error)
        });
        
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className="p-d-flex p-jc-center p-m-auto">
            <div className="card">
                <h5 className="p-text-center p-my-3">Se connecter</h5>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <span className="p-float-label p-input-icon-right p-my-3">
                        <i className="pi pi-envelope" />
                        <Controller name="email" control={control}
                            rules={{ required: 'Un email valide est requis', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Cet email n\'est pas valide (model : email@test.com)' }}}
                            render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                        <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                    </span>
                    {getFormErrorMessage('email')}
                    <span className="p-float-label p-my-3">
                        <Controller name="password" control={control} rules={{ required: 'Un mot de passe est requis' }} render={({ field, fieldState }) => (
                            <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} feedback={false} />
                        )} />
                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                    </span>
                    {getFormErrorMessage('password')}
                    {IsLoginError?<small className="p-error" >{LoginMessage}</small> : <div></div>}
                    <Button type="submit" label="Submit" className="p-mb-2 p-mt-2 perso-color-blue" />
                </form>
                <a href="/home/signIn/forgotPass" className="p-d-flex p-mb-2 p-jc-center">Mot de passe oublié</a>
            </div>
        </div>
    );
}

export default SignIn;