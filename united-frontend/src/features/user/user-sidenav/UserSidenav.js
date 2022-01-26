import user_man from "../../../shared/images/user-man.png";

import SupportSidenav from "./sidenav/SupportSidenav";
import DonatorSidenav from "./sidenav/DonatorSidenav";

import "./UserSidenav.css";

function UserSidenav({type, setType, user}) {
    const onChangeType = (type) => { setType(type); }
    const sidenav = () => {
        switch (user.role) {
            case "donor": return <DonatorSidenav onChangeType={onChangeType}/>;
            case "support": return <SupportSidenav onChangeType={onChangeType}/>;
        }
    }

    return <div className="user-sidenav">
        <div className="sidenav-header">
            <img src={user_man} alt="user_logo"/>
            <div>
                <h3>{`${user.lastname} ${user.firstname}`}</h3>
                <p>{user.role}</p>
            </div>
        </div>
        <div className="sidenav-contents">
            {sidenav()}
        </div>
    </div>
}

export default UserSidenav
