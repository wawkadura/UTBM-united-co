import "./AdminAssociations.css";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from 'primereact/calendar';
import { DataTable } from "primereact/datatable";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { useForm, Controller } from 'react-hook-form';
import { confirmPopup } from 'primereact/confirmpopup';
import { ProgressSpinner } from 'primereact/progressspinner';
import { AdminService } from "../../AdminService"
import { Column } from "primereact/column";
import { classNames } from 'primereact/utils';
import React, { useState, useEffect, useRef } from 'react';


var associations = [
    { id: "1", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux", address: "110 rue abbe gregoire", city: "belfort", created_at: "2020/02/02", description: "oooooooooooooooooooouuu dezczenjcnze jfnez infzeionnfoz nefn eznfiozef " },
    { id: "2", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux" },
    { id: "3", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux" },
    { id: "4", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux" },
    { id: "5", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux" },
    { id: "6", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux" },
    { id: "7", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux" },
    { id: "8", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux" },
    { id: "9", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux" },
    { id: "10", name: "Société protectrice des animaux", acronym: "SPA", email: "dons@spa.com", website: "www.spa.com", phone: "0612345678", type: "animaux" },
]
function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function AdminAssociations({Refresh, toast }) {
    const { control, watch, formState: { errors }, handleSubmit, reset } = useForm({});
    const { control : control1, formState: { errors: errors1 } ,handleSubmit:handleSubmit1, reset:reset1 } = useForm({});
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [mailExists, setMailExists] = useState(false);
    const [addDisplay, setAddDisplay] = useState(false);
    const [uploadFile, setUploadFile] = useState();
    const [updateDisplay, setUpdateDisplay] = useState(false);
    const [selectedAssociation, setSelectedAssociation] = useState(null);
    const [detailsDisplay, setDetailsDisplay] = useState(false);
    var idToDelete = ''
    const adminService = new AdminService();

    useEffect(() => {
        adminService.getAssociations().then((response) => {
            if (response.statusCode!=200 && toast.current != null) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode +" : "+ response.message, life: 3000 });
            }else {
                associations = response.data
            }
            setIsLoading(false)
        });
    });

    const confirm = (event, id) => {
        idToDelete = id
        confirmPopup({
            target: event.currentTarget,
            message: 'Êtes-vous sûr de vouloir supprimer le compte de cette association ?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: "Oui",
            rejectLabel: "Non",
            accept,
        });
    };

    const update = (data) => {
        setSelectedAssociation(data)
        setUpdateDisplay(true)
    }

    const accept = () => {
        adminService.deleteAssociation(idToDelete).then((response) => {
            if (response.statusCode!=200 && toast.current != null) {
                toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode +" : "+ response.message, life: 3000 });
            } else {
                toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'L\'association a bien été supprimé', life: 3000 });
            }
            Refresh()
        });
        idToDelete = ''
    };

    const onClick = () => {
        setAddDisplay(true)
    }

    const onHide = () => {
        setAddDisplay(false)
        setDetailsDisplay(false)
        setUpdateDisplay(false)
        setIsPending(false)
        setMailExists(false)
        setSelectedAssociation(null)
        reset()
        reset1()
        setUploadFile(null)
        Refresh()
    }

    function onChange(value) {
        setSelectedAssociation(value)
        setDetailsDisplay(true)
    }

    const updateAssociation = (data) => {
        if(uploadFile != null) {
            data.logo = uploadFile
        }
        setIsPending(true)
        adminService.updateAssociation(selectedAssociation.id, data).then((response) => {
            if (response.statusCode!=200 && toast.current != null) {
                if(response.statusCode==400) {
                    setMailExists(true)
                }else{
                    toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode +" : "+ response.message, life: 3000 });
                }
            }else {
                onHide()
                toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Les modifications on bien étais pris en compte !', life: 3000 });
            }
            setIsPending(false)
        });
    }

    const createAssociation = (data) => {

        setIsPending(true)
        adminService.createAssociation(data).then((response) => {
            if (response.statusCode!=200 && toast.current != null) {
                if( response.statusCode == 400) {
                    setMailExists(true)
                }else{
                    toast.current.show({ severity: 'error', summary: 'Erreur', detail: response.statusCode +" : "+ response.message, life: 3000 });
                }
            }else {
                onHide()
                toast.current.show({ severity: 'success', summary: 'Confirmation', detail: 'Les modifications on bien étais pris en compte !', life: 3000 });
            }
            setIsPending(false)
        });
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const getFormErrorMessage1 = (name) => {
        return errors1[name] && <small className="p-error">{errors1[name].message}</small>
    };

    function dialogFooter() {
        return (
            <div style={{ textAlign: 'center' }}>
                {isPending ? 
                <Button label="Validation..." type="submit" disabled icon="pi pi-save" />
                :
                <Button label="Valider"  type="submit"  icon="pi pi-save" />
                }
            </div>
        );
    }

    function updateFooter() {
        return (
            <div style={{ textAlign: 'center' }}>
                {isPending ?
                    <Button type="submit" disabled label="Sauvegarde..." icon="pi pi-save" />
                    :
                    <Button type="submit" label="Sauvegarder" icon="pi pi-save" />
                }
            </div>
        );
    }

    function addButton() {
        return (
            <div style={{ textAlign: 'right' }} className="add-association">
                <Button label="Ajouter une association" icon="pi pi-plus" iconPos="right" onClick={() => onClick()} />
            </div>
        );
    }

    function actions(data) {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" onClick={() => update(data)} className="p-button-rounded p-button-text" />
                <Button className="p-button-rounded p-button-danger" icon="pi pi-trash" onClick={(event) => confirm(event, data.id)} />
            </div>
        )
    }

    function AddAssociationDialog() {
        return <Dialog header="Ajout d'une association" position="center" draggable={false} visible={addDisplay} style={{ width: '40vw' }} onHide={() => onHide()}>
            <Divider />
            <form onSubmit={handleSubmit(createAssociation)} className="p-fluid">
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="nom">Nom</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-building" />
                            <Controller name="name" control={control} rules={{ required: 'Nom obligatoire.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                        {getFormErrorMessage('name')}
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="acronym">Acronym</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-hashtag" />
                            <Controller name="acronym" rules={{ required: 'Acronym obligatoire.' }} control={control} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                        {getFormErrorMessage('acronym')}
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="acronym">Type</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-info-circle" />
                            <Controller name="type" control={control} rules={{ required: 'Type obligatoire.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                        {getFormErrorMessage('type')}
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="email">Date de création</label>
                        <span className="p-input-icon-left">
                            <i className="pi calendar" />
                            <Controller name="createdAt" control={control} rules={{ required: 'Date de création obligatoire.' }} render={({ field, fieldState }) => (
                                <Calendar id={field.name}  {...field}  monthNavigator yearNavigator yearRange="1900:2022" mask="99/99/9999"  showIcon  className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                        {getFormErrorMessage('createdAt')}
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="email">Adresse email</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-at" />
                            <Controller name="email" control={control}
                                rules={{ required: 'Email obligatoire.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Adresse email invalide. Ex: example@email.com' } }}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.name} onInput={() => setMailExists(false)} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                        </span>
                        {getFormErrorMessage('email')}
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="email">Mot de passe</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-lock" />
                            <Controller name="password" rules={{ required: 'Mot de passe obligatoire.' }} control={control} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="email">Confirmer le mot de passe</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-lock" />
                            <Controller name="confirmPassword" rules={{ required: 'Confirmation du mot de passe obligatoire.', validate: value => value !== watch('password') ? "Les mots de passes ne correspondent pas" : undefined }} control={control} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                        {getFormErrorMessage('confirmPassword')}
                    </div>

                    <br/>
                    <div className="p-field p-col-12">
                        <label htmlFor="description">Description</label>
                        <span className="p-input-icon-left">
                            <Controller name="description" control={control} render={({ field, fieldState }) => (
                                <InputTextarea id={field.name} placeholder="(facultatif)" rows={4} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                    </div>
                    {/* <div className="p-field p-col-12">
                        <label htmlFor="description">Logo</label>
                        <span className="p-input-icon-left">
                            <Controller name="logo" control={control} render={({ field, fieldState }) => (
                                <FileUpload name={field.name} mode="basic" url="./upload" maxFileSize={10000000} className={classNames({ 'p-invalid': fieldState.invalid })}  ></FileUpload>
                            )} />

                        </span>
                    </div> */}

                </div>
                <br />
                {dialogFooter()}
            </form>
            {mailExists && <small className="p-error">l'adresse email renseignée est déjà utilisé</small>}

        </Dialog>
    }

    const uploadHandler = (f) => {
        if(f.files.length > 0) {
            getBase64(f.files[0], setUploadFile)
        }
    };

    const clearUpload= (event) => {
        event.options.clear()
        setUploadFile(null)
    }

    function UpdateAssociationDialog() {
        return <Dialog header="Modifications des Informations" position="center" draggable={false} visible={updateDisplay} style={{ width: '50vw' }} onHide={() => onHide()}>
            <Divider />
            <form onSubmit={handleSubmit1(updateAssociation)} className="p-fluid">
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="nom">Nom</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-building" />
                            <Controller name="name" control={control1} render={({ field, fieldState }) => (
                                <InputText id={field.name} placeholder={selectedAssociation.name} {...field}  autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="acronym">Acronym</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-hashtag" />
                            <Controller name="acronym" control={control1} render={({ field, fieldState }) => (
                                <InputText id={field.name} placeholder={selectedAssociation.acronym}  {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="acronym">Type</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-info-circle" />
                            <Controller name="type" control={control1} render={({ field, fieldState }) => (
                                <InputText id={field.name} placeholder={selectedAssociation.type} {...field}  className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="email">Adresse email</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-at" />
                            <Controller name="email" control={control1}
                                rules={{ pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Adresse email invalide. Ex: example@email.com' } }}
                                render={({ field, fieldState }) => (
                                    <InputText id={field.name} onInput={() => setMailExists(false)}  placeholder={selectedAssociation.email} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                        </span>
                        {getFormErrorMessage1('email')}
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="email">Adresse</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-map" />
                            <Controller name="address" control={control1} render={({ field, fieldState }) => (
                                <InputText id={field.name} placeholder={selectedAssociation.address} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="email">Ville</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-map" />
                            <Controller name="city" control={control1} render={({ field, fieldState }) => (
                                <InputText id={field.name} placeholder={selectedAssociation.city} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="phone">Téléphone</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-phone" />
                            <Controller name="telephone" control={control1} render={({ field, fieldState }) => (
                                <InputText id={field.name} placeholder={selectedAssociation.telephone} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                    </div>
                    <div className="p-field p-col-14 p-md-6">
                        <label htmlFor="phone">Site web</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-globe" />
                            <Controller name="website" control={control1} render={({ field, fieldState }) => (
                                <InputText id={field.name} placeholder={selectedAssociation.website} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="description">Description</label>
                        <span className="p-input-icon-left">
                            <Controller name="description" control={control1} render={({ field, fieldState }) => (
                                <InputTextarea id={field.name} rows={4} placeholder={selectedAssociation.description} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                        </span>
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="description">Logo</label>
                        <span className="p-input-icon-left">
                            <Controller name="logo" control={control1} render={({ field, fieldState }) => (
                               <FileUpload id={field.name} accept="image/*" customUpload={true}  {...field} uploadHandler={clearUpload}  onSelect={uploadHandler} mode="basic" chooseLabel="Upload logo" className={classNames({ 'p-invalid': fieldState.invalid })} />                
                            )} />
                        </span>
                    </div>


                </div>
                <br />
                {updateFooter()}
            </form>
            {mailExists && <small className="p-error">l'adresse email renseignée est déjà utilisé</small>}

        </Dialog>
    }

    function AssociationDetails() {
        return (
            <Dialog header="Détails" position="center" draggable={false} visible={detailsDisplay} style={{ width: '40vw' }} onHide={() => onHide()}>
                <Divider />

                <br />
                <div className="p-d-flex p-jc-evenly">
                    <div className="p-mr-4">
                        <div className="dataview-modal-subsection">
                            <div><b>Date de création: </b>{selectedAssociation.created_at}</div>
                            <Divider />
                            <div><b>Nom: </b>{selectedAssociation.name}</div>
                            <Divider />
                            <div><b>Adresse: </b>{selectedAssociation.address}</div>
                            <Divider />
                            <div><b>Site web: </b>{selectedAssociation.website}</div>
                            <Divider />
                            <div style={{ width: '10vw' }}><b>Description: </b>{selectedAssociation.description}</div>

                            <br />
                        </div>
                    </div>
                    <div className="p-mr-4">
                        <div><b>Type: </b>{selectedAssociation.type}</div>
                        <Divider />
                        <div><b>E-mail: </b>{selectedAssociation.email}</div>
                        <Divider />
                        <div><b>Acronym: </b>{selectedAssociation.acronym}</div>
                        <Divider />
                        <div><b>Ville: </b>{selectedAssociation.city}</div>
                        <Divider />
                        <div><b>Téléphone: </b>{selectedAssociation.telephone}</div>
                        <br />
                    </div>
                </div>
            </Dialog>
        )

    }



    return <div className="admin-associations">
        <Toast ref={toast} />
        <Card className="admin-associations-card" title="Gestion des associations" subTitle="Vous pouvez retrouvez sur cette page l'ensemble des associations de la platforme" style={{ height: '100%' }}>
            <Divider />
            {!isLoading ?
                <div>
                    {addButton()}
                    <br />
                    < DataTable value={associations} selectionMode="single" selection={selectedAssociation} onSelectionChange={e => onChange(e.value)} dataKey="id" responsiveLayout="scroll" scrollable scrollHeight="38rem" size="normal">
                        <Column field="name" header="Nom" sortable />
                        <Column field="acronym" header="Acronym" sortable />
                        <Column field="email" header="Email" sortable />
                        <Column field="website" header="Site web" sortable />
                        <Column field="telephone" header="Téléphone" sortable />
                        <Column field="type" header="Type" sortable />
                        <Column header="Actions" body={(data) => actions(data)} />
                    </DataTable>
                </div>
                : <div className="spinner"> <ProgressSpinner /></div>
            }
        </Card>
        {AddAssociationDialog()}
        {detailsDisplay && AssociationDetails()}
        {updateDisplay && UpdateAssociationDialog()}
    </div >
}

export default AdminAssociations
