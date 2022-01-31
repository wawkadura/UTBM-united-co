import "./Services.css";
import 'primeflex/primeflex.css';

import toward from "../../../images/images_vitrine/toward.jpg"
import statistic from "../../../images/images_vitrine/statistic.jpg"
import all_assoc from "../../../images/images_vitrine/all_assoc.jpg"

function Services() {
    return <div className="services" id="services">
        <h2>Nos services</h2>
        <div className="p-d-flex p-jc-evenly services-card">
            <div className="p-mr-4">
                <img className="image-services" src={toward} alt="toward"/>    
                <h2>Mettez en avant votre association</h2>
                <h4 className="space-text"> Nous mettons votre association en avant en lui donnant de la visibilité. United.co un moyen dereferencier votre association. Nos équipes collaboront avec vous pour la création de contre compte association et vous auriez le libre choix de proposer vos services. </h4> 
            </div>
            <div className="p-mr-4">
                <img className="image-services" src={statistic} alt="statistic"/> 
                <h2>Simplifier la gestion de vos adhésions</h2>
                <h4 className="space-text">Pour vous association, nous proposons des outils graphiques permettant d'analyser rapidement par exemple les fonds reçus, le nombre d'adhérant... vous être maître des informations qui apparaissent sur United.co. </h4>
            </div>
            <div className="p-mr-4">   
                <img className="image-services " src={all_assoc} alt="all_assoc"/>    
                <h2>Vos associations au même endroit</h2>
                <h4 className="space-text">Pour vous donateurs, nous mettons à votre disposition une liste d'associations auxquelles vous pouvez faire des dons en quelques secondes, vous pourriez choisir vos associations favorites,  vous avez les détails de vos factures (facture annuelle et mensuelle) et la résiliation d'un abonnement ce fait en quelque click.</h4>  
            </div>
        </div> 
    </div>
}

export default Services
