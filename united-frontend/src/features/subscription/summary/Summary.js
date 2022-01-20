import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';

function Summary ({setActiveIndex, user, selectedPayement, subInfo}){
    const navigate = useNavigate();

    function HandleClick (){
        localStorage.clear();
        navigate('/home');
    }

    return(
        <div>
            <Card title="Informations personnelles" className="flex flex-column justify-content-center align-items-center mx-8 my-3">
                <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                    Nom : {user.name}
                </p>
                <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                    Prénom : {user.firstname}
                </p>
                <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                    Email : {user.email}
                </p>
            </Card>
            {subInfo.price !== null && subInfo.price !== 0 ? 
                <Card title="Abonnement" className="flex flex-column justify-content-center align-items-center mx-8 my-3">
                    <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                        Prix mensuel de l'abonnement : {subInfo.price}
                    </p>
                    <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                        Durée de l'abonnement : {subInfo.duration}
                    </p>
                    <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                        Cout total : {subInfo.total}
                    </p>
                </Card>
            :
                <Card title="Don" className="flex flex-column justify-content-center align-items-center mx-8 my-3">                    
                    <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                        Montant du don : {subInfo.total}
                    </p>
                </Card>
            }
            <Card title="Moyen de payement" className="flex flex-column justify-content-center align-items-center mx-8 my-3">
                <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                    Titulaire : {selectedPayement.ownerCopy} <br/>
                </p>
                <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                    Date d'expiration : {selectedPayement.expirationDateCopy}
                </p>
                <p className="flex text-white border-round perso-color-gray align-items-center pl-3 mx-auto my-2 w-5 h-2rem">
                    Numero de carte : {selectedPayement.cardNumberCopy}
                </p>
            </Card>

            <span className="flex p-buttonset justify-content-center mb-4 mt-2">
                <Button label="Précédent" className="perso-color-blue" onClick={()=>setActiveIndex(2)}/>
                <Button label="Confirmer" className="perso-color-blue" onClick={()=> HandleClick()}/>
            </span>
        </div>
    );
}

export default Summary