import "./PersonalInfo.css"
import { Button } from  "primereact/button"

function PersonalInfo({setActiveIndex}){
    let name="matthis";
    let firstname="pinon";
    let mail="test@mail";
    
    return (
        <div>
            <div className="intro">
                <h1>Vos informations</h1>
                <p>
                    Si certaines de ces informations sont fausses, merci de les modifier
                </p>
            </div>
            <div className="print_container">
                <p className="print">{firstname}</p>
                <p className="print">{name}</p>
                <p className="print">{mail}</p>
            </div>
            <div className="g-button">
                <span>
                    <Button label="Abandonner"/>
                    <Button label="Modifier"/>
                    <Button label="Suivant" onClick={()=>setActiveIndex(1)}/>
                </span>
            </div>
        </div>
    )
}

export default PersonalInfo;