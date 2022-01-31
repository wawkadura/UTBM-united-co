import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import axios from 'axios'
import "./SignIn.css"

function SignIn(){
    // is login error ?
    const [IsLoginError, setIsLoginError] = useState(false);
    // error message of login
    const [LoginMessage, setLoginMessage] = useState("");

    // default falues of form
    const defaultValues = {
        email: '',
        password: ''
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    
    // submit form
    async function onSubmit (data) {
        // call post methode on web service to check user
        await axios.post('http://localhost:4200/account/sign-in', data
        ).then(
            // web service response
            (response)=>{
                // user does not exist
                if(response.data.statusCode === 404){
                    setLoginMessage(response.data.message);
                    setIsLoginError(true);
                }
                // login
                else{
                    sessionStorage.setItem('token', response.data.token.access_token)
                    sessionStorage.setItem('userId', response.data.payload.userId)
                    sessionStorage.setItem('role', response.data.payload.role)
                }
        // error where post
        }).catch((error)=>{
            console.log("erreur : "+ error)
        });
        
        // reset form
        reset();
    };

    // get error message in form
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className="p-d-flex p-jc-center p-m-auto">
            <div className="card">
                <h5 className="p-text-center p-my-3">Se connecter</h5>
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
                            <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} feedback={false} />
                        )} />
                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                    </span>
                    {getFormErrorMessage('password')}

                    {/* login error message */}
                    {IsLoginError?<small className="p-error" >{LoginMessage}</small> : <div></div>}
                    {/* submit button */}
                    <Button type="submit" label="Submit" className="p-mb-2 p-mt-2 perso-color-blue" />
                </form>
                {/* link to forgot password */}
                <a href="/home/signIn/forgotPass" className="p-d-flex p-mb-2 p-jc-center">Mot de passe oublié</a>
            </div>
        </div>
    );
}

export default SignIn;