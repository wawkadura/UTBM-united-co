import { Button } from  "primereact/button"
import "./SubInfo.css"

function SubInfo({setActiveIndex}){
    let prix = 10
    
    return (
        <div>
            <div className="intro">
                <h1>Détail de l'abonnement</h1>
                <p>
                    Saisissez les informations relative à votre abonnement
                </p>
            </div>
            <div className="flex flex-column align-items-center">
                <p className="flex price text-white h-4rem justify-content-center align-items-center">{prix}€</p>
                <div className="print-container">
                    <p className="main-print">Abonnement</p>
                </div>
            </div>
            <div className="g-button">
                <span>
                    <Button className=" p-button-danger" label="Précédent" onClick={()=>setActiveIndex(0)}/>
                    <Button label="Suivant"/>
                </span>
            </div>
        </div>
    )
}

export default SubInfo;