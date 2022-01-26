import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import "./Summary.css"

function Summary ({setActiveIndex, user, selectedPayement, subInfo}){
    const navigate = useNavigate();

    function HandleClick (){
        sessionStorage.removeItem('activeIndex');
        sessionStorage.removeItem('subInfo');
        sessionStorage.removeItem('selectedPayement');
        navigate('/home');
    }

    return(
        <div>
            <h1 className="p-d-flex p-jc-center p-mx-auto p-mt-4">Résumé</h1>
            <Card title="Informations personnelles" className="p-d-flex p-flex-column p-jc-center p-ai-center p-my-3" style={{'margin-left': 9+'rem', 'margin-right': 9+'rem'}}>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Nom : {user.name}
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Prénom : {user.firstname}
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Email : {user.email}
                </p>
            </Card>
            {subInfo.type === "sub"? 
                <Card title="Abonnement" className="flex p-flex-column p-jc-center p-ai-center p-my-3" style={{'margin-left': 9+'rem', 'margin-right': 9+'rem'}}>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Prix mensuel de l'abonnement : {subInfo.price} €
                    </p>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Durée de l'abonnement : {subInfo.duration} mois
                    </p>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Cout total : {subInfo.total} €
                    </p>
                </Card>
            :
                <Card title="Don" className="p-d-flex p-flex-column p-jc-center p-ai-center p-my-3" style={{'margin-left': 9+'rem', 'margin-right': 9+'rem'}}>                    
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Montant total du mensuel : {subInfo.price} €
                    </p>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Durée du don : {subInfo.duration} mois
                    </p>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Montant total du don : {subInfo.total} €
                    </p>
                </Card>
            }
            <Card title="Moyen de payement" className="flex p-flex-column p-jc-center p-ai-center p-my-3" style={{'margin-left': 9+'rem', 'margin-right': 9+'rem'}}>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Titulaire : {selectedPayement.ownerCopy} <br/>
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Date d'expiration : {selectedPayement.expirationDateCopy}
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Numero de carte : {selectedPayement.cardNumberCopy}
                </p>
            </Card>

            <span className="p-d-flex p-buttonset p-jc-center p-mb-4 p-mt-2">
                <Button label="Précédent" className="perso-color-blue" onClick={()=>setActiveIndex(2)}/>
                <Button label="Confirmer" className="perso-color-blue" onClick={()=> HandleClick()}/>
            </span>
        </div>
    );
}

export default Summary