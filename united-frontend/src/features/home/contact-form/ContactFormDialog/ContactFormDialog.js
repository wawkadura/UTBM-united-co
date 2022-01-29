import * as React from 'react';
import "./ContactFormDialog.css"
import { Dialog, } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useRef} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import { useForm } from "react-hook-form";
import { Toast } from 'primereact/toast';
import { ContactSentEmailApi } from '../api/sendEmail';

function ContactFormDialog({displayBasic, setDisplayBasic,headerDialog}) {
  
  const {handleSubmit, reset,register, formState: { errors } } = useForm();
  //error message display when a text field require spécifcation
  const ErrorMessage = ({message})=>(<h5 className='errors-text-color'>{message}</h5>) 
  //close the dialog
  const onHide = () => {
      setDisplayBasic(false);
  }
  const toast = useRef(null);
  //Message showed when the form is fill correctly
  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Message envoyé', detail:'Votre message à été envoyé avec succès', life: 3000});
  }
  //action made when the form is submited ( i send a email using emailjs api)
  const onSubmit = async(data) => {
    if (data) {
      const send=await ContactSentEmailApi.sendEmail(data)
      if (send){
        onHide();
        showSuccess();
        reset()
      }
    }
  }
  const closeIcon = (
    <button className="p-dialog-titlebar-icon p-link"></button>
  )

  const Footer = (
    <div>
        <Button label="Envoyer" id="SendFormContact" icon="pi pi-check" onClick={handleSubmit(onSubmit)} />
    </div>
  )

  //retrun form dialog, user can submit to send a email to admin.
  return <div className='contact-form-dialog' id='contactformdialog'>
    <Toast ref={toast} />
    <form>
      <Dialog header={headerDialog} footer={Footer} icons={closeIcon} visible={displayBasic} style={{width: '50vw'}} modal onHide={onHide}>
        <div className="p-fluid p-formgrid p-grid ">
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="firstname">Prenom</label>
                <InputText id="firstname" type="text" {...register("firstname",{required:false})}/>
            </div>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="lastname">Nom</label>
                <InputText id="lastname" type="text" {...register("lastname",{required:false})}/>
            </div>
            <div className="p-field p-col-12">
                <label htmlFor="Email">Adresse mail</label>
                <InputText id="Email" type="email" {...register("email",{required:"Saisir une adresse email.", pattern:{value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message:"Saisir une adresse email valide."}})} />
                {errors?.email && <ErrorMessage message={errors.email.message}/>}
            </div>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="subject">Sujet</label>
                <InputText id="subject" type="text" {...register("subject",{required:false})}/>
            </div>
            <div className="p-field p-col-12">
                <label htmlFor="message">Votre message</label>
                <InputTextarea id="message" rows={5} type="text" {...register("message",{required:true, maxLength:{value:500, message:"Saisir 500 carractères max."}})} />
                {errors?.message && <ErrorMessage message={errors.message.message}/>}
            </div>
        </div> 
     </Dialog>
    </form> 
  </div>

}

export default ContactFormDialog;
