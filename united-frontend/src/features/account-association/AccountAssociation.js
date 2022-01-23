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
     

    // Sample data for graphics
    const dataPieseries = {
        2022:[
            { argument:'Regular', value:10 },
            { argument:'Premium', value:20 },
            { argument:'Premiun+', value:10},
        ],
        2021:[
            { argument:'Regular', value:7 },
            { argument:'Premium', value:2 },
            { argument:'Premiun+', value:5},
        ],
        "none":[
            { argument:'Regular', value:0 },
            { argument:'Premium', value:0 },
            { argument:'Premiun+', value:0},
        ],
    };
    const dataBarseries = {
        2022: [
            { month: 'Jan', value: 50 },
            { month: 'Feb', value: 100 },
            { month: 'Mar', value: 30, },
            { month: 'Apr', value: 107},
            { month: 'May', value: 95 },
            { month: 'Jun', value: 15 },
            { month: 'Jul', value: 20},
            { month: 'Aug', value: 110},
            { month: 'Sep', value: 54, },
            { month: 'Oct', value: 129 },
            { month: 'Nov', value: 48 },
            { month: 'Dec', value: 43 },
        ],
        2021: [
            { month: 'Jan', value: 100 },
            { month: 'Feb', value: 200 },
            { month: 'Mar', value: 50 },
            { month: 'Apr', value: 127 },
            { month: 'May', value: 105 },
            { month: 'Jun', value: 180 },
            { month: 'Jul', value: 150 },
            { month: 'Aug', value: 120 },
            { month: 'Sep', value: 59 },
            { month: 'Oct', value: 139 },
            { month: 'Nov', value: 66 },
            { month: 'Dec', value: 55 },
        ],
        "none": [
            { month: 'Jan', value: 0},
            { month: 'Feb', value: 0 },
            { month: 'Mar', value: 0 },
            { month: 'Apr', value: 0 },
            { month: 'May', value: 0 },
            { month: 'Jun', value: 0 },
            { month: 'Jul', value: 0 },
            { month: 'Aug', value: 0 },
            { month: 'Sep', value: 0 },
            { month: 'Oct', value: 0 },
            { month: 'Nov', value: 0 },
            { month: 'Dec', value: 0 },
        ],
        
      };

    const component = () => {
        switch (type) {
            case "infos" : return <UserInfos userAssociation={userAssociation} setUserAssociation={setUserAssociation}/>;
            case "statistics": return <UserStatistics dataPieseries={dataPieseries} dataBarseries={dataBarseries}/>;
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