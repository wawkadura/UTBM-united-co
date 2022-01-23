import { TabView, TabPanel } from 'primereact/tabview';
import { useState } from 'react';
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import './userInfos.css'

function UserInfos({userAssociation, setUserAssociation}){
    const [activeIndex, setActiveIndex] = useState(0);
    const [form, setForm] = useState(userAssociation);
    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {'displayBasic': setDisplayBasic};

    const onClick = (name) => { dialogFuncMap[`${name}`](true); }
    const onHide = (name) => { dialogFuncMap[`${name}`](false); }

    function cardFooter() {
        return (
            <div className="actions">
                <Button label="Modifier" icon="pi pi-pencil" iconPos="right" onClick={() => onClick('displayBasic')} />
            </div>
        );
    }

    const handleChange = (event) => {
        const name = event.target.name;
        let value  = event.target.value;
        setForm(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserAssociation(form);
    }

    return <div> 
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="Informtions génerale" icon="pi pi-info-circle">
                
                <Card footer={cardFooter} subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
                    <Panel className="panel-color" header="Renseignemets essentiels">
                        <p><b>Nom association : </b>{userAssociation.associationname}</p>
                        <Divider />
                        <p><b>Acronyme : </b>{userAssociation.acronym}</p>
                        <Divider />
                        <p><b>Date création : </b>{userAssociation.creationdate}</p>
                        <Divider />
                        <p><b>type :  </b>{userAssociation.type}</p>
                        <Divider />
                        <p><b>description :  </b>{(userAssociation.description)}</p>
                    </Panel>
                    <Panel className="panel-color" header="Informations de bancaire">
                        <p><b>IBAN :  </b>{userAssociation.iban}</p>
                    </Panel>

                    <Dialog header="Informtions génerale" position="center" draggable={false} visible={displayBasic} style={{ width: '40vw' }} onHide={() => onHide('displayBasic')}>
                        <Divider/>
                        <form onSubmit={handleSubmit}>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12">
                                    <label htmlFor="associationname1"><b>Nom association </b></label>
                                    <InputText name="associationname" type="text" defaultValue={userAssociation.associationname} onChange={handleChange}/>
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="acronym"><b>Acronyme</b></label>
                                    <InputText name="acronym" type="text" defaultValue={userAssociation.acronym}  onChange={handleChange}/>
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="description"><b>Description</b></label>
                                    <InputText name="description" type="text" defaultValue={userAssociation.description} onChange={handleChange}/>
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="iban"><b>Iban</b></label>
                                    <InputText name="iban" type="text" defaultValue={userAssociation.iban}  onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Button type="submit" label="Sauvegarder" icon="pi pi-save" onClick={() => { onHide('displayBasic')}}/>
                            </div>
                        </form>
                    </Dialog>
                </Card>
            </TabPanel>

            <TabPanel header="Informations de contact">

            <Card footer={cardFooter} subTitle="Vous pouvez sur cette page modifier l'ensemble des données vous concernant" style={{ height: '100%' }}>
                    <Panel className="panel-color" header="Informations basiques">
                        <p><b>Email : </b>{userAssociation.email}</p>
                        <Divider />
                        <p><b>Télephone: </b>{userAssociation.phone}</p>
                        <Divider />
                        <p><b>Adresse: </b>{userAssociation.adresse}</p>
                        <Divider />
                        <p><b>Ville : </b>{userAssociation.city}</p>
                        <Divider />
                        <p><b>Site web : </b>{userAssociation.website}</p>
                    </Panel>

                    <Dialog header="Informtions génerale" position="center" draggable={false} visible={displayBasic} style={{ width: '30vw' }} onHide={() => onHide('displayBasic')}>
                        <Divider/>
                        <form onSubmit={handleSubmit}>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12">
                                    <label htmlFor="phone"><b>Télephhone</b></label>
                                    <InputText name="phone" type="text" defaultValue={userAssociation.phone}  onChange={handleChange}/>
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="Adresse"><b>Adresse</b></label>
                                    <InputText name="adresse" type="text" defaultValue={userAssociation.adresse} onChange={handleChange}/>
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="ville"><b>Ville</b></label>
                                    <InputText name="Ville" type="text" defaultValue={userAssociation.city}  onChange={handleChange}/>
                                </div>
                                <div className="p-field p-col-12">
                                    <label htmlFor="website"><b>Site web</b></label>
                                    <InputText name="website" type="text" defaultValue={userAssociation.website}  onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="form-actions">
                                <Button type="submit" label="Sauvegarder" icon="pi pi-save" onClick={() => { onHide('displayBasic')}}/>
                            </div>
                        </form>
                    </Dialog>
                </Card>
            </TabPanel>
        </TabView>
    </div>
}

export default UserInfos;