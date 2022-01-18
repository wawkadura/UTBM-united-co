import { Button } from  "primereact/button"
import "./SubInfo.css"
import { InputNumber } from 'primereact/inputnumber'; 

function SubInfo({setActiveIndex, subInfo, setSubInfo}){

    function SetDuration(data){
        setSubInfo({
            price : subInfo.price, 
            duration : data,
            total : subInfo.total
        })
    }

    function SetTotal(data){
        setSubInfo({
            price : subInfo.price,
            duration : subInfo.duration,
            total : data
        })
    }
    
    return (
        <div>
            <div className="flex flex-column align-items-center my-3">
                <h1>Détail de l'abonnement</h1>
                <p>
                    Saisissez les informations relatives à votre abonnement
                </p>
            </div>
            {subInfo.price!=null? //if price is providing (sub for further months)
                <div className="flex flex-column align-items-center">
                    <p className="flex text-white perso-color-gray border-round justify-content-center align-items-center h-2rem w-3">
                        Montant mensuel : {subInfo.price}€
                    </p>
                    <p className="flex perso-color-black-blue text-white border-round align-items-center mt-3 pl-3 w-7 h-2rem">
                        Abonnement
                    </p>
                    <div className="flex flex-column my-2 w-full justify-content-center align-items-center">
                        <div className="flex w-full justify-content-center align-items-center my-2">
                            <p className="flex flex-order-0 text-white perso-color-gray border-round justify-content-center align-items-center mr-4 h-2rem px-2">
                                Durée de l'abonnement : 
                            </p>
                            
                            <InputNumber className="flex-order-1" value={subInfo.duration} onValueChange={(e) => {SetDuration(e.value); SetTotal(e.value*subInfo.price)}} mode="decimal" showButtons min={0} max={12} 
                            incrementButtonClassName="perso-color-blue" decrementButtonClassName="perso-color-blue" allowEmpty={false} size={2} suffix=" mois"
                            />
                        </div>
                        
                        <p className="flex flex-order-2 text-white perso-color-gray border-round justify-content-center align-items-center h-2rem w-1">
                            Total : {subInfo.total}
                        </p>
                    </div>                
                </div>
            
            : //else, it's a unique donation (feel free to the amount)
            
                <div className="flex flex-column align-items-center">
                    <p className="flex perso-color-black-blue text-white border-round align-items-center mt-3 pl-3 w-7 h-2rem">
                        Donation libre
                    </p>
                    <div className="flex w-full justify-content-center align-items-center my-2">
                        <p className="flex flex-order-0 text-white perso-color-gray border-round justify-content-center align-items-center mr-4 h-2rem px-2">
                            Montant de votre don : 
                        </p>
                        
                        <InputNumber className="flex-order-1" value={subInfo.total} onValueChange={(e) => SetTotal(e.value)} mode="currency" currency="EUR" 
                        showButtons min={0} incrementButtonClassName="perso-color-blue" decrementButtonClassName="perso-color-blue" allowEmpty={false} size={2}
                        />
                    </div>
                </div>
            }
            <span className="flex p-buttonset justify-content-center mb-4 mt-2">
                <Button label="Précédent" className="perso-color-blue" onClick={()=>setActiveIndex(0)}/>
                <Button label="Suivant" className="perso-color-blue" onClick={()=>setActiveIndex(2)}/>
            </span>
        </div>
    )
}

export default SubInfo;