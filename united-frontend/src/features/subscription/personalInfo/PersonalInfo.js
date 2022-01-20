import "./PersonalInfo.css"
import { Button } from  "primereact/button"
import { useNavigate } from "react-router-dom"

function PersonalInfo({setActiveIndex, user}){
    const navigate = useNavigate();
    
    return (
        <div>
            <div className="flex flex-column align-items-center my-3">
                <h1 className="mb-2">Vos informations</h1>
                <p>
                    Si certaines de ces informations sont fausses, merci de les modifier
                </p>
            </div>
            <div className="flex flex-column align-items-center">
                <p className="flex text-white border-round perso-color-gray align-items-center pl-3 my-2 w-5 h-2rem">
                    Nom : {user.name}
                </p>
                <p className="flex text-white border-round perso-color-gray align-items-center pl-3 my-2 w-5 h-2rem">
                    Prénom : {user.firstname}
                </p>
                <p className="flex text-white border-round perso-color-gray align-items-center pl-3 my-2 w-5 h-2rem">
                    Email : {user.email}
                </p>
            </div>
            <span className="flex p-buttonset justify-content-center mb-4 mt-3">
                <Button label="Abandonner" className="perso-color-blue" onClick={()=>navigate('/associations')}/>
                <Button label="Suivant" className="perso-color-blue" onClick={()=>setActiveIndex(1)}/>
            </span>
        </div>
    )
}

export default PersonalInfo;