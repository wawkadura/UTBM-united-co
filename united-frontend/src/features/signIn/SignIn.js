import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import "./SignIn.css"

function SignIn(){
    const [formData, setFormData] = useState({});
    
    const defaultValues = {
        name: '',
        email: '',
        password: '',
        date: null,
        country: null,
        accept: false
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    
    const onSubmit = (data) => {
        setFormData(data);
        
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className="p-d-flex p-jc-center">
            <div className="card">
                <h5 className="p-text-center p-my-3">Se connecter</h5>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <span className="p-float-label p-input-icon-right p-my-3">
                        <i className="pi pi-envelope" />
                        <Controller name="email" control={control}
                            rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                            render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                        <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                    </span>
                    {getFormErrorMessage('email')}
                    <span className="p-float-label p-my-3">
                        <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                            <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} feedback={false} />
                        )} />
                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                    </span>
                    {getFormErrorMessage('password')}
                    <Button type="submit" label="Submit" className="p-mb-4 p-mt-2 perso-color-blue" />
                </form>
            </div>
        </div>
    );
}

export default SignIn;