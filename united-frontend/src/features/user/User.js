import "./User.css";

import UserSidenav from "./user-sidenav/UserSidenav";
import UserInfo from "./user-menu/user-info/UserInfo";
import {useState} from "react";

import UserSecurity from "./user-menu/user-security/UserSecurity";
import UserFavorites from "./user-menu/user-favorites/UserFavorites";
import UserInvoices from "./user-menu/user-invoices/UserInvoices";
import UserSubscriptions from "./user-menu/user-subscriptions/UserSubscriptions";

function User() {
    const [type, setType] = useState("info");
    const component = () => {
        switch (type) {
            case "info" : return <UserInfo/>;
            case "favorites": return <UserFavorites/>;
            case "subscriptions": return <UserSubscriptions/>;
            case "invoices": return <UserInvoices/>;
            case "security": return <UserSecurity/>;

            default: return <UserInfo/>;
        }
    }
    return <div className="user">
        <div className="user-container">
            <div className="user-sidenav">
                <UserSidenav type={type} setType={setType}/>
            </div>
            <div className="user-contents">
                {component()}
            </div>
        </div>
    </div>
}

export default User
