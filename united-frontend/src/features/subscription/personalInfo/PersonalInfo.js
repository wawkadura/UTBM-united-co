import "./PersonalInfo.css"
import { Button } from  "primereact/button"
import { useNavigate } from "react-router-dom"

function PersonalInfo({setActiveIndex, user}){
    const navigate = useNavigate();
    
    return (
        <div>
            <div className="p-d-flex p-flex-column p-ai-center p-my-3">
                <h1 className="mb-2">Vos informations</h1>
                <p>
                    Si certaines de ces informations sont fausses, merci de les modifier
                </p>
            </div>
            <div className="personal-info p-d-flex p-flex-column p-ai-center">
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Nom : {user.name}
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Prénom : {user.firstname}
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Email : {user.email}
                </p>
            </div>
            <span className="p-d-flex p-buttonset p-jc-center p-mb-4 p-mt-3">
                <Button label="Abandonner" className="perso-color-blue" onClick={()=>navigate('/associations')}/>
                <Button label="Suivant" className="perso-color-blue" onClick={()=>setActiveIndex(1)}/>
            </span>
        </div>
    )
}

export default PersonalInfo;