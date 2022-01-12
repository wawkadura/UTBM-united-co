import { Button } from  "primereact/button"

function SubInfo({setActiveIndex}){
    
    
    return (
        <div>
            <div className="intro">
                <h1>Détail de l'abonnement</h1>
                <p>
                    Saisissez les informations relative à votre abonnement
                </p>
            </div>
            <div className="print_container">
                <p>test</p>
            </div>
            <div className="g-button">
                <span>
                    <Button label="Précédent" onClick={()=>setActiveIndex(0)}/>
                    <Button label="Suivant"/>
                </span>
            </div>
        </div>
    )
}

export default SubInfo;