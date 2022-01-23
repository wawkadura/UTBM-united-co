import { Steps } from "primereact/steps"
import PersonalInfo from "./personalInfo/PersonalInfo"
import { useState, useEffect } from 'react'
import NotFound from "../../shared/not-found/NotFound";
import SubInfo from "./subInfo/SubInfo";
import PayementInfo from "./payementInfo/PayementInfo";
import Summary from "./summary/Summary";

function Subscription(){
    //first component show
    const savedActiveIndex = sessionStorage.getItem('activeIndex');
    const [activeIndex, setActiveIndex] = useState(savedActiveIndex ? JSON.parse(savedActiveIndex) : 0);
    
    useEffect(() => {
        sessionStorage.setItem('activeIndex', JSON.stringify(activeIndex))
    }, [activeIndex])
    
    //TODO : get to initialise
    const [typesPayement, setTypesPayement] = useState([
        {
            id : 1,
            owner : "PINON",
            cardNumber : 12331242342,
            expirationDate : "09/2022",
        },
        {
            id : 2,
            owner : "INFOX",
            cardNumber : 19843194723,
            expirationDate : "10/2020",
        },
        {
            id : 3,
            owner : "JILLE",
            cardNumber : 19843194723,
            expirationDate : "10/2020",
        },
        {
            id : 4,
            owner : "LOUPE",
            cardNumber : 19843194723,
            expirationDate : "10/2020",
        }
    ]);
    
    //TODO : get to initialise
    const user =
    {
        firstname : "Matthis",
        name : "PINON",
        email : "matthis.pinon@utbm.fr"
    };
    
    const savedSubInfo = sessionStorage.getItem('subInfo');
    const [subInfo, setSubInfo] = useState( savedSubInfo ? JSON.parse(savedSubInfo) : {
        price : 1,
        duration : 0,
        total : 0
    });

    useEffect(() => {
        sessionStorage.setItem('subInfo', JSON.stringify(subInfo))
    }, [subInfo])

    const savedSelectedPayement = sessionStorage.getItem('selectedPayement');
    const [selectedPayement, setSelectedPayement] = useState(savedSelectedPayement ? JSON.parse(savedSelectedPayement) : {
        idCopy: null,
        cardNumberCopy: null,
        ownerCopy: null,
        expirationDateCopy: null
    });

    useEffect(() => {
        sessionStorage.setItem('selectedPayement', JSON.stringify(selectedPayement))
    }, [selectedPayement])

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
                readOnly={true}
            />
            {
                activeIndex === 0 ? <PersonalInfo setActiveIndex={setActiveIndex} user={user}/> : 
                activeIndex === 1 ? <SubInfo 
                                        setActiveIndex={setActiveIndex} 
                                        subInfo={subInfo} 
                                        setSubInfo={setSubInfo}
                                    /> : 
                activeIndex === 2 ? <PayementInfo 
                                        setActiveIndex={setActiveIndex} 
                                        typesPayement={typesPayement} 
                                        setTypesPayement={setTypesPayement} 
                                        selectedPayement={selectedPayement} 
                                        setSelectedPayement={setSelectedPayement}
                                    /> : 
                activeIndex === 3 ? <Summary
                                        setActiveIndex={setActiveIndex}
                                        user={user}
                                        selectedPayement={selectedPayement}
                                        subInfo={subInfo}
                                    /> : 
                <NotFound/>
            }
        </div>
    );
}



export default Subscription;