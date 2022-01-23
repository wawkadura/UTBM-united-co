import { useEffect } from 'react'
import axios from 'axios'
import { InputText } from 'primereact/inputtext';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';

function ForgotPass(){
    const defaultValues = {
        email: '',
        password: ''
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    async function onSubmit(data){
        await axios.post("http://localhost:4200/sign-in", {
            email: data.email,
            password: data.password
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
        reset();
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div className="p-d-flex p-jc-center p-mx-6 p-flex-column">
            <h5 className="p-text-center p-my-3">Saisissez votre email et votre nouveau mot de passe</h5>
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
                        <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                </span>
                {getFormErrorMessage('password')}

                <Button type="submit" label="Submit" className="p-mb-2 p-mt-2 perso-color-blue" />
            </form>
        </div>
    );
}

export default ForgotPass;