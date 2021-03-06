import UserServices from './menu/user-services/UserServices';
import UserStatistics from './menu/user-statistics/UserStatistics';
import UserInfos from './menu/user-infos/UserInfos';
import AccountAssocSidnav from './sidnav/AccountAssocSidnav';
import {useState} from "react";
import "./AccountAssociation.css";
import {useEffect} from 'react';
import { AccountAssociationApi } from './api/accountAssociationApi';

function AccountAssociation() {
    const [type, setType] = useState("infos");
    const [infos, setInfos]= useState({})

    useEffect(()=>{
        fetchAll();
    },[]);

    //this methode get data regarding an association information
    //sesionstorage...==user id connected
    async function fetchAll(){
        const resp = await AccountAssociationApi.getInfos(sessionStorage.getItem('userId'));
        setInfos(resp)
    };
    const component = () => {
        switch (type) {
            case "infos" : if(infos) return <UserInfos infos={infos} fetchAll={fetchAll}/>;
                break;
            case "statistics": return <UserStatistics/>;
            case "services": return <UserServices/>;
            default: if(infos) return <UserInfos infos={infos} fetchAll={fetchAll}/>;
        }
    }
    return <div className="AccountAssociation">
        <div className="AccountAssociation-container">
            <div className="admin-sidenav"> 
             <AccountAssocSidnav type={type} setType={setType} infos={infos}/>
            </div>
            <div className="admin-contents">
                {component()}
            </div> 
        </div>
    </div>
}

export default AccountAssociation;