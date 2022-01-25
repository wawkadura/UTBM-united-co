import axios from 'axios'
import { InputText } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


function ForgotPass(){
    // is login error ?
    const [IsLoginError, setIsLoginError] = useState(false);
    // error message of login
    const [LoginMessage, setLoginMessage] = useState("");

    const navigate = useNavigate()

    // default values of form
    const defaultValues = {
        email: '',
        password: ''
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    // submit form
    async function onSubmit(data){
        // call post methode on web service to update password
        await axios.post("http://localhost:4200/account/forgot-pass", data
        ).then((response)=>{
            // email does not exist
            if(response.data.statusCode === 404){
                setLoginMessage(response.data.message);
                setIsLoginError(true);
            }
            // error in update process
            else if(response.data.statusCode === 304){
                setLoginMessage(response.data.message);
                setIsLoginError(true);
            }
            // redirect to sign-in
            else{
                alert("Mot de passe modifié !");
                navigate('/home/signIn');
            }
        }).catch((error)=>{
            console.log(error);
        })
        reset();
    }

    // error message in form
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className="p-d-flex p-jc-center p-mx-auto p-flex-column" style={{width: 50+'%'}}>
            <h5 className="p-text-center p-my-3">Saisissez votre email et votre nouveau mot de passe</h5>
            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                {/* email */}
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
                
                {/* password */}
                <span className="p-float-label p-my-3">
                    <Controller name="password" control={control} rules={{ required: 'Un mot de passe est requis' }} render={({ field, fieldState }) => (
                        <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                </span>
                {getFormErrorMessage('password')}
                
                {/* login error message */}
                {IsLoginError?<small className="p-error" >{LoginMessage}</small> : <div></div>}
                
                {/* submit button */}
                <Button type="submit" label="Submit" className="p-mb-2 p-mt-2 perso-color-blue" />
            </form>
        </div>
    );
}

export default ForgotPass;