import UserServices from './menu/user-services/UserServices';
import UserStatistics from './menu/user-statistics/UserStatistics';
import UserInfos from './menu/user-infos/UserInfos';
import AccountAssocSidnav from './sidnav/AccountAssocSidnav';
import {useState} from "react";
import "./AccountAssociation.css";


function AccountAssociation() {

    const [type, setType] = useState("infos");

    // sample data for user association info
    const [userAssociation, setUserAssociation] = useState({
        associationname: "This is my association name",
        acronym: " This is the acronyme",
        creationdate: "data creation",
        type:"Not given",
        description:"None",
        email: "thisisreal@toto.com",
        phone: "0653245085",
        role: "type",
        iban: "FR04 1234 4584 4652 845",
        city:"paris",
        adresse:"15 rue de la joie",
        website:"http/wilfrid.com"
    });
     
    

    const component = () => {
        switch (type) {
            case "infos" : return <UserInfos userAssociation={userAssociation} setUserAssociation={setUserAssociation}/>;
            case "statistics": return <UserStatistics/>;
            case "services": return <UserServices/>;
            default: return <UserInfos/>;
        }
    }
    return <div className="AccountAssociation">
        <div className="AccountAssociation-container">
            <div className="admin-sidenav"> 
             <AccountAssocSidnav type={type} setType={setType}/>
            </div>
            <div className="admin-contents">
                {component()}
            </div> 
        </div>
    </div>
}

export default AccountAssociation;