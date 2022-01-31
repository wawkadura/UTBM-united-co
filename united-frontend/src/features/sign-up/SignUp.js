import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { SignUpService } from './SignUpService';
import './SignUp.css';

function SignUp() {
    const [showMessage, setShowMessage] = useState(false);
    const [isPending, setIsPending] = useState(false)
    const [formData, setFormData] = useState({});
    const [mailExists, setMailExists] = useState(false);

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const signUpService = new SignUpService()
    const { control, watch, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const navigate = useNavigate();
    const toast = useRef(null);
    const onSubmit = (data) => {
        setIsPending(true)
        setFormData(data);
        signUpService.CreateDonor(data).then((response) => {
            setIsPending(false)
            if (response.statusCode !== 200) {
                if (response.statusCode === 400) {
                    setMailExists(true)
                }else {
                    toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode + ": " + response.message, life: 3000 });
                }
            } else {
                reset();
                setShowMessage(true);
            }
        })
    };

    const resetMailExistance = () => {
        setMailExists(false)
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const goToConnexion = () => {
        setShowMessage(false)
        navigate("/home/signIn") // TODO: change with sign-in path
    }

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => goToConnexion()} /></div>;
    const passwordHeader = <h6>Saisir un mot de passe</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Suggestions</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                <li>Au moins une lettre minuscule</li>
                <li>Au moins une lettre majuscule</li>
                <li>Au moins un numéro</li>
                <li>Minimum 8 catactéres</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="sign-up-form">
            <Toast ref={toast} />

            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '3rem', color: 'var(--green-500)' }}></i>
                    <h5>Inscription Terminé !</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        <b>{formData.name}</b> Votre compte a été créé avec succès ! Toute l'équipe vous souhaite la bienvenue sur united.co!
                    </p>
                </div>
            </Dialog>

            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <h4 className="p-text-center">Inscription</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-user" />
                                <Controller name="firstName" control={control} rules={{ required: 'Prénom obligatoire.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Prénom*</label>
                            </span>
                            {getFormErrorMessage('firstName')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-user" />
                                <Controller name="lastName" control={control} rules={{ required: 'Nom obligatoire.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Nom*</label>
                            </span>
                            {getFormErrorMessage('lastName')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email obligatoire.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Adresse email invalide. Ex: example@email.com' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText onInput={() => resetMailExistance()} id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Mot de passe obligatoire.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })}
                                        header={passwordHeader} footer={passwordFooter} promptLabel=" " weakLabel="Faible" mediumLabel="Moyen" strongLabel="Fort" />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Mot de passe*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="p-field">
                            <span className="p-float-label">
                                <Controller name="confirmPassword" control={control} rules={{ validate: value => value !== watch('password') ? "Les mots de passes ne correspondent pas" : undefined, required: 'Confirmation du mot de passe obligatoire.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} feedback={false} />
                                )} />
                                <label htmlFor="confirmPassword" className={classNames({ 'p-error': errors.confirmPassword })}>Confirmer mot de passe*</label>
                            </span>
                            {getFormErrorMessage('confirmPassword')}
                        </div>
                        <div className="p-field-checkbox">
                            <Controller name="accept" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                                <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>  J'ai lu et j'accepte les conditions générales d'utilisation*</label>
                        </div>
                        {!isPending && <Button type="submit" label="Valider" className="p-mt-2" />}
                        {isPending && <Button type="submit" disabled label="Validation..." className="p-mt-2" />}
                        {mailExists && <small className="p-error">l'adresse email renseignée est déjà utilisé</small>}

                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
