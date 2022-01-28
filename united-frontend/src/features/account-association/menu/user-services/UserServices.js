import 'primeflex/primeflex.css';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {TabView, TabPanel } from 'primereact/tabview';
import {useEffect, useState,useRef } from 'react';
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import { useForm } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { AccountAssociationApi } from '../../api/accountAssociationApi';
import { Toast } from 'primereact/toast';


function UserServices(){
    const [activeIndex] = useState(0)
    const [services, setServices]=useState([]);
    const {register, handleSubmit,reset, formState: { errors } } = useForm();
    const [dataModal, setDataModal] = useState({})
    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {'displayBasic': setDisplayBasic};
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const dialogFuncMap2 = {'displayBasic2': setDisplayBasic2};
    const [id, setId]= useState();
    const toast = useRef(null);

     //Message showed when the form is fill correctly and posted
    const showToast = (resp) => {
        if (resp.statusCode===200) toast.current.show({severity:'success', summary: 'Service', detail:resp.message, life: 3000});
        else if(resp.statusCode===500 || resp.statusCode===404) toast.current.show({severity:'error', summary: 'Service', detail:"Contacter le support", life: 3000});
    }
    useEffect(()=>{
        fetchAll();
    },[]);
    //this methode get all services regading an association 
    async function fetchAll(){
        //sessionStorage.getItem('userId'); correspond to user id connected
        const resp = await AccountAssociationApi.getServices(sessionStorage.getItem('userId'));
        setServices(resp)
    };
    
    const onClick = (name, data) => { 
        dialogFuncMap[`${name}`](true); 
        setDataModal(data);
    };
    const openFormAddservice=(name)=>{
        dialogFuncMap2[`${name}`](true); 
    };
    const onHide = (name) => { 
        dialogFuncMap[`${name}`](false); 
        reset();
    };
    const onHide2 = (name) => { 
        dialogFuncMap2[`${name}`](false); 
        reset();
    };
    const ErrorMessage = ({message})=>(<h5 className='errors-text-color'>{message}</h5>) ;

    function cardFooter(data) {
        return (
            <div className="actions">
                <Button label="Modifier" icon="pi pi-pencil" iconPos="left" onClick={() => onClick('displayBasic', data)} style={{marginRight: '.25em'}}/>
                <Button label="Supprimer" icon="pi pi-times" className="p-button-secondary" onClick={() => deleteService( data)}/>                
            </div>
        );
    };
    //update a service
    const UpdateService = async(data) => {
        if (data&&id){
            const resp = await AccountAssociationApi.updateService(id,data); //sent data to the api in oder to update database
            if (resp){
                fetchAll();
                showToast(resp);
            }
            onHide('displayBasic')
        }
    }; 
     
    //create new service 
    const AddService = async(data) => {
        const association_id=services.services[0].association_id
        if(data&&association_id){
            const resp = await AccountAssociationApi.createService(data,association_id); //sent data to the api in oder to populate database
            if (resp){
                fetchAll();
                showToast(resp);
            }
            onHide2('displayBasic2')
        }
    };
    //delete a service
    const deleteService = async(data) => { 
        if(data){
            const resp = await AccountAssociationApi.deleteService(data.id); //sent data to the api in oder to delete service
            if (resp){
                fetchAll();
                showToast(resp);
            }
        }
    };
    //check if the button was pressed then make an action 
    const FooterAddService = (
        <div>
            <Button type="submit" label="Ajouter" icon="pi pi-save"  onClick={handleSubmit(AddService)} /> 
        </div>
    );
    const Footer = (
        <div>
            <Button type="submit" label="Sauvegarder" icon="pi pi-save"  onClick={handleSubmit(UpdateService)} />
        </div>
    );
    
    //i return to the main controller association service
    return <div>
        <Toast ref={toast} />
        <div className="p-d-flex p-flex-column p-flex-md-row">
            {services.services ? services.services.map((item, index) => (
                <div key={index} className="p-mb-2 p-mr-2">
                    <TabView activeIndex={activeIndex} >
                        <TabPanel header={"Service "+item.title} icon="pi pi-info-circle">
                        <Card footer={cardFooter(item)} style={{ height: '100%' }}>
                            <Panel className="panel-color">
                                <p><b>Titre : </b>{item.title}</p>
                                <Divider />
                                <p><b>Description : </b>{item.description}</p>
                                <Divider />
                                <p><b>Prix(€) : </b>{item.price}</p>
                            </Panel>
                        </Card>
                        </TabPanel>
                    </TabView>
                </div>
            )) : ''}

            <Dialog position="center" footer={Footer} draggable={false} visible={displayBasic} style={{ width: '40vw' }} onHide={() => onHide('displayBasic')}>
                <form >
                    <div className="p-fluid p-formgrid p-grid" >
                        <div className="p-field p-col-12">
                            <label htmlFor="title1"><b>Titre </b></label>
                            <InputText type="text" {...register("title", {required:"Choisir un titre", maxLength:{value:50, message:"Saisir 50 carractères max."}})} defaultValue={dataModal.title} />
                            {errors?.title && <ErrorMessage message={errors.title.message}/>}  
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="description"><b>Description</b></label>
                            <InputTextarea rows={2}  type="text" {...register("description", { required:"Entrer une  description" , maxLength:{value:400, message:"Saisir 400 carractères max."}})} defaultValue={dataModal.description}/>
                            {errors?.description && <ErrorMessage message={errors.description.message}/>} 
                        </div>
                        <div className="p-field p-col-6">
                            <label htmlFor="price"><b>Prix(€)</b></label>
                            <InputText  type="number"  {...register("price", {onChange:()=>(setId(dataModal.id)) ,required:"Nouveau prix requis", min:{value:1,message:"Service doit être au moins égale à 1 euro."} })} placeholder={dataModal.price}/>
                            {errors?.price && <ErrorMessage message={errors.price.message}/>}  
                        </div>
                    </div>
                </form>
            </Dialog>
            
            { services.services? services.services.length<3 ?
             <div className="p-mb-2 p-mr-2">
                <Button type="submit" label="Ajouter un service" icon="pi pi-plus" onClick={() => {openFormAddservice("displayBasic2")}}/>
            </div>: <></> :''
            }
        </div>

        <Dialog header="Ajout d'un nouveau service" position="center" footer={FooterAddService} draggable={false} visible={displayBasic2} style={{ width: '40vw' }} onHide={() => onHide2('displayBasic2')}>
            <form>
                <Divider/>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12">
                        <label htmlFor="title1"><b>Titre </b></label>
                        <InputText type="text" {...register("title", {required:"Choisir un nouveau titre", maxLength:{value:50, message:"Saisir 50 carractères max."}})} placeholder={"Entrer une titre"} />
                        {errors?.title && <ErrorMessage message={errors.title.message}/>}  
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="description"><b>Description</b></label>
                        <InputTextarea rows={2} type="text" {...register("description", { required:"Description requise" , maxLength:{value:200, message:"Saisir 200 carractères max."}})} placeholder={"Entrer un description"} />
                        {errors?.description && <ErrorMessage message={errors.description.message}/>}                    
                    </div>
                    <div className="p-field p-col-12">
                        <label htmlFor="price"><b>Prix(€)</b></label>
                        <InputText type="number" {...register("price", { required:"Prix requis", min:{value:1,message:"Abonnement doit être au moins égale à 1 euro."} })}  placeholder={"Entrer le prix de l'abonnement"}/>
                        {errors?.price && <ErrorMessage message={errors.price.message}/>}  
                    </div>
                </div>
            </form>
        </Dialog>
    </div>
}

export default UserServices;