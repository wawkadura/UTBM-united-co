import user_man from "../../../images/shared/user-man.png";

import SupportSidenav from "./sidenav/SupportSidenav";
import DonatorSidenav from "./sidenav/DonatorSidenav";

import "./UserSidenav.css";

function UserSidenav({type, setType, user}) {
    const onChangeType = (type) => { setType(type); }
    const sidenav = () => {
        switch (user.role) {
            case "donor": return <DonatorSidenav onChangeType={onChangeType}/>;
            case "support": return <SupportSidenav onChangeType={onChangeType}/>;
            case "admin": return <SupportSidenav onChangeType={onChangeType}/>;
            case "association": return <SupportSidenav onChangeType={onChangeType}/>;
        }
    }

    function userRole(type) {
        return type === "donor" ? "Donateur" : type === "association" ? "Association" : type === "admin" ? "Administrateur" : "Support"
    }

    return <div className="user-sidenav">
        <div className="sidenav-header">
            <img src={user_man} alt="user_logo"/>
            <div>
                <h3>{`${user.lastName} ${user.firstName}`}</h3>
                <p>{userRole(user.role)}</p>
            </div>
        </div>
        <div className="sidenav-contents">
            {sidenav()}
        </div>
    </div>
}

export default UserSidenav
