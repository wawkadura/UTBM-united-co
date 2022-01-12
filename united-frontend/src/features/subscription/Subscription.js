import { Steps } from "primereact/steps"
import PersonalInfo from "./personalInfo/PersonalInfo"
import { useState } from 'react'
import NotFound from "../../shared/not-found/NotFound";

function Subscription(){
    const [activeIndex, setActiveIndex] = useState(0);

    const stepItems = [
        {
            label: 'Informations personnelles'
        },
        {
            label: 'Caractéristique de l\'abonnement'
        },
        {
            label: 'Moyen de payement'
        },
        {
            label: 'Récapitulatif'
        },
    ];

    return (
        <div>
            <Steps model={stepItems} 
                activeIndex={activeIndex} 
                onSelect={(e) => setActiveIndex(e.index)} 
                readOnly={false}
            />
            {
                activeIndex === 0 ? <PersonalInfo/> : 
                activeIndex === 1 ? <div>1</div> : 
                activeIndex === 2 ? <div>2</div> : 
                activeIndex === 3 ? <div>3</div> : 
                <NotFound/>
            }
        </div>
    );
}



export default Subscription;