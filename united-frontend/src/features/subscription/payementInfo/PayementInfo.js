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

function PayementInfo({ setActiveIndex, typesPayement, setTypesPayement, selectedPayement, setSelectedPayement }) {

    const successToast = useRef(null);
    const [displayAddDialog, setDisplayAddDialog] = useState(false);
    
    const defaultValues = {
        cardNumber: null,
        owner: "",
        expirationDate: null,
    };
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    
    function AddCard(number, name, date){
		const currentCard = typesPayement.find((c)=>c.cardNumber === number)

		//credit card doesn't exist
		if(!currentCard){			
			//add new credit card in array
            setTypesPayement([...typesPayement, {id: 4, owner: name, cardNumber: number, expirationDate: date}]);
		}
	}

    const onSubmit = (data) => {
        //TODO : post wit back
        AddCard(data.cardNumber, data.owner, Moment(data.expirationDate).format('MM/yyyy'));
        setDisplayAddDialog(false);
        showSuccess();
        reset();
    };
    
    const showSuccess = () => {
        successToast.current.show({
            severity:'success', 
            summary: 'Enregistré', 
            detail:'Votre carte a bien été enregistrée', 
            life: 3000
        });
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <div>
            <Toast ref={successToast}/>
            {/* <p>{formData.cardNumber} {formData.owner} {formData.expirationDate}</p> */}
            <div className="grid mx-3 my-2">
                {typesPayement.length > 0 ? (
                    typesPayement.map(({id, owner, cardNumber, expirationDate})=>
                        <div className="flex justify-content-center align-items-center col-6">
                            <RadioButton inputId={id} value={id} name="Virement banquaire" 
                                onChange={() => setSelectedPayement({idCopy: id, ownerCopy: owner, cardNumberCopy: cardNumber, expirationDateCopy: expirationDate})} 
                                checked={selectedPayement.idCopy === id} 
                                className="flex align-items-center justify-content-center my-2"
                            />
                            <label htmlFor={id} className="-mx-6">
                                <Card key={id} title={"Carte de " + owner} className="flex flex-column justify-content-center align-items-center mx-8 my-3">
                                    <p className="flex justify-content-center mt-2">
                                        Date d'expiration : {expirationDate} <br/>
                                        Numero de carte : {cardNumber}
                                    </p>
                                </Card>
                            </label>
                        </div>)
                    )
                    :
                    (
                        <Card className="flex justify-content-center align-items-center mx-8 my-4">
                            <p className="flex justify-content-center">
                                Aucune carte banquaire enregistrée. Veuillez en renseigner une.
                            </p>
                        </Card>
                    )
                }
            </div>

            <Button label="Ajouter une carte" onClick={() => setDisplayAddDialog(true)} className="flex align-items-center perso-color-blue m-auto" />

            <Dialog header="Nouvelle carte" visible={displayAddDialog} onHide={() => setDisplayAddDialog(false)} draggable={false}>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="flex grid justify-content-center my-1">
                            <span className="p-float-label col-6">
                                <Controller name="cardNumber" control={control} rules={{ required: 'Le numéro de carte est requis', pattern: { value: /\d{4} \d{4} \d{4} \d{4}/i, message: 'Le format ne correspond pas.'}}} render={({ field, fieldState }) => (
                                    <InputMask id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} mask="9999 9999 9999 9999" />
                                )} />
                                <label htmlFor="cardNumber" className={classNames({ 'p-error': errors.cardNumber })}>Numéro de carte</label>
                                {getFormErrorMessage('cardNumber')}
                            </span>
                            <span className="p-float-label col-3">
                                <Controller name="owner" control={control} rules={{ required: 'Le titulaire de la carte est requis' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="owner" className={classNames({ 'p-error': errors.owner })}>Nom</label>
                                {getFormErrorMessage('owner')}
                            </span>
                            <span className="p-float-label col-3">
                                <Controller name="expirationDate" control={control} rules={{ required: 'La date d\'expiration est requise' }} render={({ field, fieldState }) => (
                                    <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} showIcon view="month" dateFormat="mm/yy" yearNavigator yearRange="2022:2100" mask="99/9999"/>
                                )} />
                                <label htmlFor="expirationDate" className={classNames({ 'p-error': errors.expirationDate })}>Date d'expiration</label>
                                {getFormErrorMessage('expirationDate')}
                            </span>
                    </div>
                        <Button type="submit" label="Valider" className="flex justify-content-center m-auto w-3"/>
                </form>
            </Dialog>

            <span className="flex p-buttonset justify-content-center mb-4 mt-4">
                <Button label="Précédent" className="perso-color-blue" onClick={() => setActiveIndex(1)}/>
                <Button label="Suivant" className="perso-color-blue" onClick={() => setActiveIndex(3)} disabled={selectedPayement.idCopy === null}/>
            </span>
        </div>
    );
}

export default PayementInfo;