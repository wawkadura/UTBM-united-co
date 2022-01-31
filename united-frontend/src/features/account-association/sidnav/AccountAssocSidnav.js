import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
import "./AccountAssocSidnav.css";

import { useState } from "react";
import {useEffect} from 'react';

function AccountAssocSidnav({type, setType, infos}) {

    const [conv, convSet] =useState();
    
    useEffect(()=>{
        fetchLogo();
    },[infos]);
    
    //convert the binany data to string
    async function fetchLogo(){
        if(infos.value){
            if(infos.value.logo){
            const B64string = await btoa(String.fromCharCode(...new Uint8Array(infos.value.logo.data)));
            convSet(B64string)
            }
        }
        else{
            convSet("")
        }
    }
    //on change display différent menu
    const onChangeType = (type) => {
        setType(type);
    }

    //retun tab pressed
    return <div className="accountassociation-sidenav">
        {infos.value? 
        <div className="sidenav-header">
            {conv?
                <img src={`data:image/png;base64,${conv}`} alt="logo"/>
            :''}
            <div>
                <h3>{infos.value.name}</h3>
                <p>{infos.value.acronym}</p>
            </div>
        </div>
        : ''} 
        <div className="sidenav-contents">
            <Button onClick={() => {onChangeType("infos")}} label="Mes Informations" icon="pi pi-info-circle" />
            <Divider/>

            <Button onClick={() => {onChangeType("statistics")}} label="Statistiques générales" icon="pi pi-chart-bar" />
            <Divider />

            <Button onClick={() => {onChangeType("services")}} label="Mes services" icon=" pi pi-briefcase" />
        </div>
    </div>
}

export default AccountAssocSidnav;