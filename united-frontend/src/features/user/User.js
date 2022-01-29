import "./User.css";

import UserSidenav from "./user-sidenav/UserSidenav";
import UserInfo from "./user-menu/user-info/UserInfo";

import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import UserSecurity from "./user-menu/user-security/UserSecurity";
import UserFavorites from "./user-menu/user-favorites/UserFavorites";
import UserInvoices from "./user-menu/user-invoices/UserInvoices";
import UserSubscriptions from "./user-menu/user-subscriptions/UserSubscriptions";
import {UserService} from "./UserService";
import stringUtil from "../../utils/StringUtil";

function User() {
    const location = useLocation();
    const userService = new UserService();

    const [type, setType] = useState("info");
    const [userId, setUserId] = useState(location.state.id);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        role: "donor",
        email: "",
/*        phone: "+823532450845",
        payment_type: "credit_card",
        bic: "FRFDFG",
        iban: "FR04 1234 4584 4652 845"*/
    });

    useEffect(() => {
        userService.getUser(userId).then(data => {
            setUser(data);
        });
    }, []);

    const component = () => {
        switch (type) {
            case "info" : return <UserInfo user={user} userId={userId} setUser={setUser} stringUtil={stringUtil}/>;
            case "favorites": return <UserFavorites userId={userId}/>;
            case "subscriptions": return <UserSubscriptions/>;
            case "invoices": return <UserInvoices/>;
            case "security": return <UserSecurity user={user} setUser={setUser} userId={userId}/>;

            default: return <UserInfo/>;
        }
    }
    return <div className="user">
        <div className="user-container">
            <div className="user-sidenav">
                <UserSidenav type={type} setType={setType} user={user} stringUtil={stringUtil}/>
            </div>
            <div className="user-contents">
                {component()}
            </div>
        </div>
    </div>
}

export default User


/*
{
    firstName: "Chaeyoung",
        lastName: "Park",
    role: "donor",
    birthdate: new Date("1997-02-11"),
    genre: "woman",
    email: "rosie@blackpink.kr",
    phone: "+823532450845",
    payment_type: "credit_card",
    bic: "FRFDFG",
    iban: "FR04 1234 4584 4652 845"
}*/
