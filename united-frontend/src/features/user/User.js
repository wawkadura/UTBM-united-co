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
    const [user, setUser] = useState({
        firstname: "Chaeyfijrifijoung",
        lastname: "Park",
        role: "KPOP Idol",
        birthdate: "11/02/1997",
        genre: "woman",
        email: "rosie@blackpink.kr",
        phone: "+823532450845",
        payment: {
            type: "credit_card",
            bic: "FRFDFG",
            iban: "FR04 1234 4584 4652 845"
        }
    });

    const component = () => {
        switch (type) {
            case "info" : return <UserInfo user={user} setUser={setUser}/>;
            case "favorites": return <UserFavorites/>;
            case "subscriptions": return <UserSubscriptions/>;
            case "invoices": return <UserInvoices/>;
            case "security": return <UserSecurity user={user}/>;

            default: return <UserInfo/>;
        }
    }
    return <div className="user">
        <div className="user-container">
            <div className="user-sidenav">
                <UserSidenav type={type} setType={setType} user={user}/>
            </div>
            <div className="user-contents">
                {component()}
            </div>
        </div>
    </div>
}

export default User
