import { Button } from  "primereact/button"
import "./SubInfo.css"
import { InputNumber } from 'primereact/inputnumber'; 

function SubInfo({setActiveIndex, subInfo, setSubInfo}){

    function SetInfo(dur, tot){
        setSubInfo({
            price : subInfo.price,
            duration : dur,
            total : tot,
            type: subInfo.type
        })
    }

    function SetPrice(price, tot){
        setSubInfo({
            price : price,
            duration : subInfo.duration,
            total : tot,
            type: subInfo.type
        })
    }
    
    return (
        <div>
            <div className="p-d-flex p-flex-column p-ai-center p-my-3">
                <h1>Détail de l'abonnement</h1>
                <p>
                    Saisissez les informations relatives à votre abonnement
                </p>
            </div>
            {subInfo.type === "sub"? //if it's a sub (price determinate)
                <div className="p-d-flex p-flex-column p-ai-center">
                    <p className="p-d-flex perso-color-gray p-jc-center p-ai-center" style={{height: 2+'rem', width: 25+'%'}}>
                        Montant mensuel : {subInfo.price}€
                    </p>
                    <p className="p-d-flex perso-color-black-blue p-ai-center p-mt-3 p-pl-3" style={{width: 58.3333+'%', height: 2+'rem'}}>
                        Abonnement
                    </p>
                    <div className="p-d-flex p-flex-column p-my-2 p-jc-center p-ai-center" style={{width: 100+'%'}}>
                        <div className="p-d-flex w-full p-jc-center p-ai-center p-my-2">
                            <p className="p-d-flex perso-color-gray p-jc-center p-ai-center p-mr-4 p-px-2" style={{height: 2+'rem'}}>
                                Durée de l'abonnement : 
                            </p>
                            
                            <InputNumber value={subInfo.duration} onValueChange={(e) => {SetInfo(e.value, e.value*subInfo.price)}} mode="decimal" showButtons min={0} max={12} 
                            incrementButtonClassName="perso-color-blue" decrementButtonClassName="perso-color-blue" allowEmpty={false} size={2} suffix=" mois"
                            />
                        </div>
                        
                        <p className="p-d-flex perso-color-gray p-jc-center p-ai-center" style={{height: 2+'rem', width: 8.3333+'%'}}>
                            Total : {subInfo.total} €
                        </p>
                    </div>                
                </div>
            
            : //else, it's a donation (feel free to the amount)
            
                <div className="p-d-flex p-flex-column p-ai-center">
                    <p className="p-d-flex perso-color-black-blue text-white border-round p-ai-center p-mt-3 p-pl-3" style={{width: 58.3333+'%', height: 2+'rem'}}>
                        Donation libre
                    </p>
                    <div className="p-d-flex p-jc-center p-ai-center p-my-2" style={{width: 100+'%'}}>
                        <p className="p-d-flex perso-color-gray p-jc-center p-ai-center p-mr-4 p-px-2" style={{height: 2+'rem'}}>
                            Montant de votre don mensuel: 
                        </p>
                        
                        <InputNumber className="flex-order-1" value={subInfo.price} onValueChange={(e) => SetPrice(e.value, e.value*subInfo.duration)} mode="currency" currency="EUR" 
                        showButtons min={0} incrementButtonClassName="perso-color-blue" decrementButtonClassName="perso-color-blue" allowEmpty={false} size={2}
                        />
                    </div>
                    <div className="p-d-flex w-full p-jc-center p-ai-center p-my-2">
                        <p className="p-d-flex perso-color-gray p-jc-center p-ai-center p-mr-4 p-px-2" style={{height: 2+'rem'}}>
                            Pour une durée de : 
                        </p>
                        
                        <InputNumber value={subInfo.duration} onValueChange={(e) => {SetInfo(e.value, e.value*subInfo.price)}} mode="decimal" showButtons min={0} max={12} 
                        incrementButtonClassName="perso-color-blue" decrementButtonClassName="perso-color-blue" allowEmpty={false} size={2} suffix=" mois"
                        />
                    </div>
                    <p className="p-d-flex perso-color-gray p-jc-center p-ai-center" style={{height: 2+'rem', width: 8.3333+'%'}}>
                        Total : {subInfo.total} €
                    </p>

                </div>
            }
            <span className="p-d-flex p-buttonset p-jc-center p-mb-4 p-mt-2">
                <Button label="Précédent" className="perso-color-blue" onClick={()=>setActiveIndex(0)}/>
                <Button label="Suivant" className="perso-color-blue" onClick={()=>setActiveIndex(2)} disabled={subInfo.total===0}/>
            </span>
        </div>
    )
}

export default SubInfo;