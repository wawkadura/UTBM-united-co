import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import "./Summary.css"
import axios from "../../../shared/jwt.interceptor"
import Moment from 'moment';

function Summary ({setActiveIndex, user, selectedPayement, subInfo}){
    const navigate = useNavigate();

    //when confirm
    async function HandleClick (){
        let serviceId = sessionStorage.getItem('serviceId')
        
        //if it's donation, we have to determine the service
        if(sessionStorage.getItem('subType') === "don"){
            //return services order by ascending price
            let resp = await axios.get(`http://localhost:4200/association/services/${serviceId}`)
                
            let newServiceId = null;
            //have we data 
            if (resp.data.data.lenght !== 0){
                resp.data.data.forEach(element => {
                    //affect service by the amount of donation
                    if(subInfo.price >= element.price){
                        newServiceId = element.id; 
                    }
                });
            }
            serviceId = newServiceId;
        }
        axios.post('http://localhost:4200/subscription', {
            price: subInfo.price,
	        endDate: Moment(Date.now()).add(subInfo.duration, "months").format('yyyy/MM/DD'),
            date: Moment(Date.now()).format('yyyy/MM/DD'),
         	user_id: sessionStorage.getItem('userId'),
            service_id: serviceId
        })

        //clear sub session
        sessionStorage.removeItem('activeIndex');
        sessionStorage.removeItem('subInfo');
        sessionStorage.removeItem('selectedPayement');
        sessionStorage.removeItem('subType');
        sessionStorage.removeItem('subPrice');
        sessionStorage.removeItem('serviceId');

        navigate('/home');
    }

    return(
        <div className="summary-info">
            <h1 className="p-d-flex p-jc-center p-mx-auto p-mt-4">Résumé</h1>
            <Card title="Informations personnelles" className="p-d-flex p-flex-column p-jc-center p-ai-center p-my-3" style={{'margin-left': 9+'rem', 'margin-right': 9+'rem'}}>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Nom : {user.name}
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Prénom : {user.firstname}
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Email : {user.email}
                </p>
            </Card>
            {subInfo.type === "sub"? 
                <Card title="Abonnement" className="flex p-flex-column p-jc-center p-ai-center p-my-3" style={{'margin-left': 9+'rem', 'margin-right': 9+'rem'}}>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Prix mensuel de l'abonnement : {subInfo.price} €
                    </p>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Durée de l'abonnement : {subInfo.duration} mois
                    </p>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Cout total : {subInfo.total} €
                    </p>
                </Card>
            :
                <Card title="Don" className="p-d-flex p-flex-column p-jc-center p-ai-center p-my-3" style={{'margin-left': 9+'rem', 'margin-right': 9+'rem'}}>                    
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Montant total du mensuel : {subInfo.price} €
                    </p>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Durée du don : {subInfo.duration} mois
                    </p>
                    <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                        Montant total du don : {subInfo.total} €
                    </p>
                </Card>
            }
            <Card title="Moyen de payement" className="flex p-flex-column p-jc-center p-ai-center p-my-3" style={{'margin-left': 9+'rem', 'margin-right': 9+'rem'}}>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Titulaire : {selectedPayement.ownerCopy} <br/>
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
                    Date d'expiration : {selectedPayement.expirationDateCopy}
                </p>
                <p className="p-d-flex perso-color-gray p-ai-center p-pl-3 p-mx-auto p-my-2 print-info" style={{width: 41.6667+'%', height: 2+'rem'}}>
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