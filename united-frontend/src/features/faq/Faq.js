import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

import "./Faq.css"
import { Divider } from 'primereact/divider';

function Faq(){
    return (
        <div className="faq">
            <h2 className="AssoTitle">FAQ</h2>
            <div className="card">
                <Accordion activeIndex={0}>
                    <AccordionTab header="Utilisation du site">
                        <div className="faq-item">
                            <h3>Naviguer dans le site</h3>
                            <p>Vous avez accès aux différentes pages du site en cliquant sur les liens en en-tête du site ou en bas de page.</p>
                        </div>
                        <Divider/>
                        <div className="faq-item">
                            <h3>Consulter la liste des associations</h3>
                            <p>Cliquez sur le lien "Associations" dans l'entête du site</p>
                        </div>
                        <Divider/>
                        <div className="faq-item">
                            <h3>S'inscrire</h3>
                            <p>Cliquez sur le bouton S'inscrire pour ouvrir le formulaire à remplir.<br/>
                                Vous aurez ainsi la possibilité de créer un compte Donateur.
                            </p>
                        </div>
                        <Divider/>
                        <div className="faq-item">
                            <h3>Demander la création d'un compte association</h3>
                            <p>
                                Lorsque vous n'êtes pas connectés, cliquez sur le lien "Contact" en entête.<br/>
                                Vous pourrez ouvrir le formulaire de contact associé au mot "Cliquez ici".<br/>
                                Il vous faudra alors remplir les informations nécessaires à un meilleur traitement de notre part.
                            </p>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="Compte Association">
                        <div className="faq-item">
                            <h3>Consulter son profil</h3>
                            <p>
                                Cliquez sur votre nom en haut à droite de la page. Une liste déroulante va de déplier avec plusieurs liens. <br/>
                                Cliquez ensuite sur "Mon profil".
                            </p>
                        </div>
                        <Divider/>
                        <div className="faq-item">
                            <h3>Editer son profil</h3>
                            <p>
                                Cliquez sur votre nom en haut à droite de la page. Une liste déroulante va de déplier avec plusieurs liens. <br/>
                                Cliquez ensuite sur "Mon profil".<br/>
                                Vous pourrez ensuite parcourir vos données et cliquer sur modifier.
                            </p>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="Compte Donateur">
                        <div className="faq-item">
                            <h3>Consulter son profil</h3>
                            <p>
                                Cliquez sur votre nom en haut à droite de la page. Une liste déroulante va de déplier avec plusieurs liens. <br/>
                                Cliquez ensuite sur "Mon profil".
                            </p>
                        </div>
                        <Divider/>
                        <div className="faq-item">
                            <h3>Editer son profil</h3>
                            <p>
                                Cliquez sur votre nom en haut à droite de la page. Une liste déroulante va de déplier avec plusieurs liens. <br/>
                                Cliquez ensuite sur "Mon profil".<br/>
                                Vous pourrez ensuite parcourir vos données et cliquer sur modifier.
                            </p>
                        </div>
                        <Divider/>
                        <div className="faq-item">
                            <h3>Souscrire à une association</h3>
                            <p>
                                Allez sur la page des associations, sélectionnez une association en cliquant dessus. <br/>
                                Choisissez un abonnement puis cliquez sur "S'abonner".
                            </p>
                        </div>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
    );
}

export default Faq;