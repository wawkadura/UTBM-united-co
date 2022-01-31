import { TabView, TabPanel } from 'primereact/tabview';
import { useState ,useRef } from 'react';
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import './userInfos.css'
import { AccountAssociationApi } from '../../api/accountAssociationApi';
import { useForm } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

//the fonction display assation inforamtion, association can modify some information
//les pramettres viennet du main contr0ller 
function UserInfos({infos, fetchAll}){

    const [id, setId]= useState()
    const {register, handleSubmit,reset, formState: { errors } } = useForm();
    const {register:registerInfo, handleSubmit:handleSubmitInfo, reset:resetInfo, formState: { errors:errorsInfo } } = useForm();
    const [activeIndex, setActiveIndex] = useState(0);
    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {'displayBasic': setDisplayBasic};
    const toast = useRef(null);
    const onClick = (name,id) => { 
        setId(id);
        dialogFuncMap[`${name}`](true);
    }
    const onHide = (name) => { 
        dialogFuncMap[`${name}`](false); 
        reset();
        resetInfo();
    };
    const ErrorMessage = ({message})=>(<h5 className='errors-text-color'>{message}</h5>) ;//message show in case on succes or error
     //Message showed when the form is fill correctly
     const showToast = (resp) => {
        if (resp.statusCode===200) toast.current.show({severity:'success', detail:resp.message, life: 3000});
        else if(resp.statusCode===500 || resp.statusCode===404) toast.current.show({severity:'error', detail:"Contacter le support", life: 6000});
    }

    function cardFooter(id) {
        return (
            <div className="actions">
                <Button label="Modifier" icon="pi pi-pencil" iconPos="right" onClick={() => onClick('displayBasic',id)} />
            </div>
        );
    };
    //methode to update general infoormation
    const updateInfos = async(data) => {
        if (data&&id){
            const resp = await AccountAssociationApi.updateInfos(id,data); //sent data to the api in oder to update database
            if (resp){
                fetchAll(); //allow to init the refresh data 
                showToast(resp);
            }
            onHide('displayBasic')
        }
    };
    //methode to update the association informations
    const updateInfosContact = async(data) => {
        if (data&&id){
            const resp = await AccountAssociationApi.updateInfosContact(id,data); //sent data to the api in oder to update database
            if (resp){
                fetchAll();
                showToast(resp);
            }
            onHide('displayBasic')
        }
    };

    // i return the div to the main contraller we data display...
    return <div> 
        <Toast ref={toast} />
        {infos.value? 
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel  header="Informtions génerale" icon="pi pi-info-circle">
                <Card footer={cardFooter(infos.value.id)} subTitle="Vous pouvez sur cette page modifier modifier certains praramètres  vous concernant" style={{ height: '100%' }}>
                    <Panel className="panelcolor-text" header="Renseignemets essentiels">
                        <p><b>Nom association : </b>{infos.value.name}</p>
                        <Divider />
                        <p><b>Acronyme : </b>{infos.value.acronym}</p>
                        <Divider />
                        <p><b>Date création : </b>{new Date(infos.value.created_at).toLocaleString().split(',')[0]}</p>
                        <Divider />
                        <p><b>type :  </b>{infos.value.type}</p>
                        <Divider />
                        <p><b>description :  </b>{(infos.value.description)}</p>
                    </Panel>
                    <Panel className="panelcolor-text" header="Informations de bancaire">
                        <p><b>IBAN :  </b>{infos.value.iban}</p>
                    </Panel>

                    <Dialog header="Informtions génerale" position="center" draggable={false} visible={displayBasic} style={{ width: '40vw' }} onHide={() => onHide('displayBasic')}>
                        <Divider/>
                        <form>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12">
                                    <label htmlFor="associationname1"><b>Nom association </b></label>
                                    <InputText type="text" defaultValue={infos.value.name} {...register("name", {required:"Entrer un non", maxLength:{value:50, message:"Saisir 50 carractères max."}})} />
                                    {errors?.name && <ErrorMessage message={errors.name.message}/>} 
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="acronym"><b>Acronyme</b></label>
                                    <InputText type="text" defaultValue={infos.value.acronym}  {...register("acronym",{required:false, maxLength:{value:10, message:"Saisir 10 carractère max."}})}/>
                                    {errors?.acronym && <ErrorMessage message={errors.acronym.message}/>} 
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="description"><b>Description</b></label>
                                    <InputTextarea rows={2}  type="text" defaultValue={infos.value.description} {...register("description", {required:"Description requise", maxLength:{value:500, message:"Saisir 500 carractères max."}})}/>
                                    {errors?.description && <ErrorMessage message={errors.description.message}/>} 
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="iban"><b>Iban</b></label>
                                    <InputText type="text" defaultValue={infos.value.iban}  {...register("iban", {required:"Iban requis", maxLength:{value:50, message:"Saisir 50 carractères max."}})}/>
                                    {errors?.iban && <ErrorMessage message={errors.iban.message}/>} 
                                </div>
                            </div>
                            <div className="form-actions">
                                <Button type="submit" label="Sauvegarder" icon="pi pi-save" onClick={handleSubmit(updateInfos)}/>
                            </div>
                        </form>
                    </Dialog>
                </Card>
            </TabPanel>
           
            <TabPanel header="Informations de contact"> 
            <Card footer={cardFooter(infos.value.id)} subTitle="Vous pouvez sur cette page modifier certains praramètres vous concernant" style={{ height: '100%' }}>
                    <Panel className="panel-color" header="Informations basiques">
                        <p><b>Email : </b>{infos.value.email}</p>
                        <Divider />
                        <p><b>Télephone: </b>{infos.value.telephone}</p>
                        <Divider />
                        <p><b>Adresse: </b>{infos.value.address}</p>
                        <Divider />
                        <p><b>Ville : </b>{infos.value.city}</p>
                        <Divider />
                        <p><b>Site web : </b>{infos.value.website}</p>
                    </Panel>

                    <Dialog header="Informtions génerale" position="center" draggable={false} visible={displayBasic} style={{ width: '30vw' }} onHide={() => onHide('displayBasic')}>
                        <Divider/>
                        <form>
                            <div className="p-fluid p-formgrid p-grid">
    
                                <div className="p-field p-col-12">
                                    <label htmlFor="phone"><b>Télephhone</b></label>
                                    <InputText type="number" defaultValue={infos.value.telephone}  {...registerInfo("telephone", {required:"Numero de  requis", maxLength:{value:10, message:"Saisir exainfos.valueent 10 carractères ex: 0698647547"}, minLength:{value:10,message:"Saisir exainfos.valueent 10 carractères ex: 0698647547"}})}/>
                                    {errorsInfo?.telephone && <ErrorMessage message={errorsInfo.telephone.message}/>} 
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="Adresse"><b>Adresse</b></label>
                                    <InputText name="adresse" type="text" defaultValue={infos.value.address} {...registerInfo("address")}/>
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="ville"><b>Ville</b></label>
                                    <InputText type="text" defaultValue={infos.value.city}  {...registerInfo("city")}/>
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="website"><b>Site web</b></label>
                                    <InputText type="text" defaultValue={infos.value.website}  {...registerInfo("website")}/>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Button type="submit" label="Sauvegarder" icon="pi pi-save" onClick={handleSubmitInfo(updateInfosContact)}/>
                            </div>
                        </form>
                    </Dialog>
                </Card>
            </TabPanel>
        </TabView>
        : ''} 
    </div>
}

export default UserInfos;