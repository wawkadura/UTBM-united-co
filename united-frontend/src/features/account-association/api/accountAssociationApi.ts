export class AccountAssociationApi{

    public static async getServices(id:number){
        const resp = await fetch(`http://localhost:4200/account-association/${id}`,{
            method : "GET",
            headers : {
                'Content-Type':'application/json'
            },
        })
        const data = await resp.json();
        return data
    }

    public static async getInfos(id:number){
        const resp = await fetch(`http://localhost:4200/account-association-infos/${id}`,{
            method : "GET",
            headers : {
                'Content-Type':'application/json'
            },
        })
        const data = await resp.json();
        return data
    }
    // id correspond to the association connected
    public static async getPieSeries(id:number){
        const resp = await fetch(`http://localhost:4200/account-association-statistic/pieseries/${id}`,{
            method : "GET",
            headers : {
                'Content-Type':'application/json'
            },
        })
        const data = await resp.json();
        return data
    }
    // id correspond to the association connected
    public static async getBarSeries(id:number){
        const resp = await fetch(`http://localhost:4200/account-association-statistic/barseries/${id}`,{
            method : "GET",
            headers : {
                'Content-Type':'application/json'
            },
        })
        const data = await resp.json();
        return data
    }

    public static async createService(value:any){
        const resp= await fetch("http://localhost:4200/account-association",{
            method : "POST",
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title: value.title,
                description : value.description,
                price: value.price,
                state:true,
            })
        })
        const data = await resp.json();
        return data
    }

    public static async updateService(id:number,value:any){
        const resp = await fetch(`http://localhost:4200/account-association/${id}`,{
            method : "PUT",
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title: value.title,
                description : value.description,
                price: value.price
            })
        })
        const data = await resp.json();
        return data
    }

    public static async updateInfos(id:number,value:any){
        const resp = await fetch(`http://localhost:4200/account-association-infos/${id}`,{
            method : "PUT",
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: value.name,
                acronym : value.acronym,      
                type :  value.type ,    
                description :value.description,
                iban: value.iban,
            })
        })
        const data = await resp.json();
        return data
    }
    public static async updateInfosContact(id:number,value:any){
        const resp = await fetch(`http://localhost:4200/account-association-infos/${id}`,{
            method : "PUT",
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                telephone: value.telephone,
                address: value.address,
                city: value.city,
                website:value.website
            })
        })
        const data = await resp.json();
        return data
    }

    public static async deleteService(id:number){
        const resp = await fetch(`http://localhost:4200/account-association/${id}`,{
            method : "DELETE",
            headers : {
                'Content-Type':'application/json'
            },
        })
        const data = await resp.json();
        return data
    }
}


