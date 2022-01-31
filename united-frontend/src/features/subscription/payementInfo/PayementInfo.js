import "./PayementInfo.css"
import { Button } from "primereact/button"
import { RadioButton } from 'primereact/radiobutton';
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import Moment from 'moment';
import axios from "../../../shared/jwt.interceptor";

function PayementInfo({ setActiveIndex, typesPayement, setTypesPayement, selectedPayement, setSelectedPayement }) {

    const successToast = useRef(null);
    const errorToast = useRef(null);

    // show or not dialog (where there is form)
    const [displayAddDialog, setDisplayAddDialog] = useState(false);
    
    // default values in form
    const defaultValues = {
        cardNumber: null,
        owner: "",
        expirationDate: null,
    };
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    
    function AddCard(_id, number, name, date){
		const currentCard = typesPayement.find((c)=>c.cardNumber === number)

		//credit card doesn't exist
		if(!currentCard){			
			//add new credit card in array
            setTypesPayement([...typesPayement, {id: _id, owner: name, cardNumber: number, expirationDate: date}]);
		}
	}

    // submit form
    async function onSubmit (data) {
        // update DB
        await axios.post('http://localhost:4200/payement', {
            card_number: data.cardNumber.replace(/ /g, ""),
            owner: data.owner,
            expire_date: Moment(data.expirationDate).add(1, "days"),
            user_id: sessionStorage.getItem('userId')
        }).then(
            response=>{
                // OK
                if(response.data.codeStatus === 200){
                    const newCard = response.data.newPayement;
                    AddCard(newCard.id, newCard.card_number, newCard.owner, Moment(newCard.expire_date).format('MM/yyyy'));
                    showSuccess();
                }
                // error while update
                else{
                    showError(response.data.message)
                }
            }
            //error process
        ).catch((error)=>{
                showError(error.message)
            }
        )
        setDisplayAddDialog(false);
        reset();
    };
    
    // activate success toast
    const showSuccess = () => {
        successToast.current.show({
            severity:'success', 
            summary: 'Enregistré', 
            detail:'Votre carte a bien été enregistrée', 
            life: 3000
        });
    }

    // activate error toast
    const showError = (message) => {
        errorToast.current.show({
            severity:'error', 
            summary: 'Enregistré', 
            detail: message, 
            life: 3000
        });
    }

    // error message in form
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div>
            {/* success / error toast */}
            <Toast ref={successToast}/>
            <Toast ref={errorToast}/>
            <div className="p-grid p-mx-3 p-my-2">

                {/* already exist card */}
                {typesPayement.length > 0 ? (
                    // map card in card component
                    typesPayement.map(({id, owner, cardNumber, expirationDate})=>
                        <div className="p-d-flex p-jc-center p-ai-center p-col-6">
                            <RadioButton inputId={id} value={id} name="Virement banquaire" 
                                onChange={() => setSelectedPayement({idCopy: id, ownerCopy: owner, cardNumberCopy: cardNumber, expirationDateCopy: expirationDate})} 
                                checked={selectedPayement.idCopy === id} 
                                className="p-d-flex p-ai-center p-jc-center p-my-2"
                            />
                            <label htmlFor={id} className="p-mx-6">
                                <Card key={id} title={"Carte de " + owner} className="p-d-flex p-flex-column p-jc-center p-ai-center p-mx-8 p-my-3">
                                    <p className="p-d-flex p-jc-center p-mt-2" style={{color: 'black'}}>
                                        Date d'expiration : {expirationDate} <br/>
                                        Numero de carte : {cardNumber}
                                    </p>
                                </Card>
                            </label>
                        </div>)
                    )
                    // no card
                    :
                    (
                        <Card className="p-d-flex p-jc-center p-ai-center p-mx-auto p-my-4">
                            <p className="p-d-flex p-jc-center" style={{color: 'black'}}>
                                Aucune carte banquaire enregistrée. Veuillez en renseigner une.
                            </p>
                        </Card>
                    )
                }
            </div>

            {/* to open dialog */}
            <Button label="Ajouter une carte" onClick={() => setDisplayAddDialog(true)} className="p-d-flex p-ai-center perso-color-blue p-m-auto" />
            
            {/* dialog */}
            <Dialog header="Nouvelle carte" visible={displayAddDialog} onHide={() => setDisplayAddDialog(false)} draggable={false}>
                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="p-d-flex p-grid p-jc-center p-my-1">
                        {/* card number */}
                        <span className="p-float-label p-col-6">
                            <Controller name="cardNumber" control={control} rules={{ required: 'Le numéro de carte est requis', pattern: { value: /\d{4} \d{4} \d{4} \d{4}/i, message: 'Le format ne correspond pas.'}}} render={({ field, fieldState }) => (
                                <InputMask id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} mask="9999 9999 9999 9999" />
                            )} />
                            <label htmlFor="cardNumber" className={classNames({ 'p-error': errors.cardNumber })}>Numéro de carte</label>
                            {getFormErrorMessage('cardNumber')}
                        </span>
                        {/* owner */}
                        <span className="payement-info-span p-float-label p-col-3">
                            <Controller name="owner" control={control} rules={{ required: 'Le titulaire de la carte est requis' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="owner" className={classNames({ 'p-error': errors.owner })}>Nom</label>
                            {getFormErrorMessage('owner')}
                        </span>
                        {/* date of expiration */}
                        <span className="p-float-label p-col-3">
                            <Controller name="expirationDate" control={control} rules={{ required: 'La date d\'expiration est requise' }} render={({ field, fieldState }) => (
                                <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} showIcon view="month" dateFormat="mm/yy" yearNavigator yearRange="2022:2100" mask="99/9999"/>
                            )} />
                            <label htmlFor="expirationDate" className={classNames({ 'p-error': errors.expirationDate })}>Date d'expiration</label>
                            {getFormErrorMessage('expirationDate')}
                        </span>
                    </div>
                    {/* to submit form */}
                        <Button type="submit" label="Valider" className="p-d-flex p-jc-center p-m-auto p-w-3"/>
                </form>
            </Dialog>

            <span className="p-d-flex p-buttonset p-jc-center p-mb-4 p-mt-4">
                <Button label="Précédent" className="perso-color-blue" onClick={() => setActiveIndex(1)}/>
                <Button label="Suivant" className="perso-color-blue" onClick={() => setActiveIndex(3)} disabled={selectedPayement.idCopy === null}/>
            </span>
        </div>
    );
}

export default PayementInfo;