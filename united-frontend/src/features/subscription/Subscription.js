import { Steps } from "primereact/steps"
import PersonalInfo from "./personalInfo/PersonalInfo"
import { useState } from 'react'
import NotFound from "../../shared/not-found/NotFound";
import SubInfo from "./subInfo/SubInfo";
import PayementInfo from "./payementInfo/PayementInfo";

function Subscription(){
    //first component show
    const [activeIndex, setActiveIndex] = useState(3);

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
                activeIndex === 0 ? <PersonalInfo setActiveIndex={setActiveIndex}/> : 
                activeIndex === 1 ? <SubInfo setActiveIndex={setActiveIndex}/> : 
                activeIndex === 2 ? <PayementInfo setActiveIndex={setActiveIndex}/> : 
                activeIndex === 3 ? <div>3</div> : 
                <NotFound/>
            }
        </div>
    );
}



export default Subscription;