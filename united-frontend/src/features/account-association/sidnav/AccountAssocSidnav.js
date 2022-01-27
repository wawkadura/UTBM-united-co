import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
import "./AccountAssocSidnav.css";

import us from "../../../images/shared/united_logo.png"

function AccountAssocSidnav({type, setType, infos}) {

    const onChangeType = (type) => {
        setType(type);
    }
    return <div className="accountassociation-sidenav">
        {infos.value? 
        <div className="sidenav-header">
            <img src={us} alt="user_logo"/>
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