import * as React from 'react';
import "./ContactFormDialog.css"
import { Dialog, } from 'primereact/dialog';
import { Button } from 'primereact/button';
import {useState, useRef} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import { useForm } from "react-hook-form";
import { Toast } from 'primereact/toast';

function ContactFormDialog() {
  
  const {handleSubmit, register, formState: { errors } } = useForm();
  //error message display when a text field require spécifcation
  const ErrorMessage = ({message})=>(<h5 className='errors-text-color'>{message}</h5>) 
  const [displayBasic, setDisplayBasic] = useState(false);
  //diplay the dialogue
  const onClick = () => {
    setDisplayBasic(true);
  }
  //close the dialog
  const onHide = () => {
      setDisplayBasic(false);
  }
  const toast = useRef(null);
  //Message showed when the form is fill correctly
  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Message envoyé', detail:'Votre message à été envoyé avec succès', life: 3000});
  }
  //action made when the form is submited 
  const onSubmit = (data) => {
    console.log({data});
    if (data) {
      onHide();
      showSuccess();
    }
  }
  const myIcon = (
    <button className="p-dialog-titlebar-icon p-link"></button>
  )
  const Footer = (
    <div>
        <Button label="Envoyer" id="SendFormContact" icon="pi pi-check" onClick={handleSubmit(onSubmit)} />
    </div>
  )
  
  //retrun form dialog, user can submit to send a email to admin.
  return <div>
    <Toast ref={toast} />
    <Button  className="p-button-text" label="ici" onClick={() => onClick('displayBasic')} />
    <Dialog header="Formulaire de contact" footer={Footer} icons={myIcon} visible={displayBasic} style={{width: '50vw'}} modal onHide={onHide}>
    <form >
      <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-6">
              <label htmlFor="firstname">Prenom</label>
              <InputText id="firstname" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-6">
              <label htmlFor="lastname">Nom</label>
              <InputText id="lastname" type="text" />
          </div>
          <div className="p-field p-col-12">
              <label htmlFor="Email">Adresse mail</label>
              <InputText id="Email" type="email" {...register("email",{required:"Saisir une adresse email.", pattern:{value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message:"Saisir une adresse email valide."}})} />
              {errors?.email && <ErrorMessage message={errors.email.message}/>}
          </div>
          <div className="p-field p-col-12 p-md-6">
              <label htmlFor="subject">Sujet</label>
              <InputText id="subject" type="text" />
          </div>
          <div className="p-field p-col-12">
              <label htmlFor="message">Votre message</label>
              <InputTextarea id="message" rows={5} type="text" {...register("message",{required:true, maxLength:{value:500, message:"Saisir 500 carractères max."}})} />
              {errors?.message && <ErrorMessage message={errors.message.message}/>}
          </div>
      </div> 
    </form> 
    </Dialog>
    
  </div>

}

export default ContactFormDialog;