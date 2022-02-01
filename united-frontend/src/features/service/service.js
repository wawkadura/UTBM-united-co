function Service () {
    const serviceId = sessionStorage.getItem("servicePageId");
    const assoId = sessionStorage.getItem("assoPageId");

    
    return(
        <div>
            <p className="p-d-flex p-jc-center">
                Association : {assoId} <br/>
                Nom du service : {serviceId}
            </p>
        </div>
    )
}

export default Service;