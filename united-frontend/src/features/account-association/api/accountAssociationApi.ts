export class AccountAssociationApi{

    public static async getServices(){
        const resp = await fetch("http://localhost:4200/account-association",{
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
                tittle: value.tittle,
                description : value.description,
                price: value.price,
                state:true,
            })
        })
        const data = await resp.json();
        return data
    }

    public static async UpdateService(id:number,value:any){
        const resp = await fetch(`http://localhost:4200/account-association/${id}`,{
            method : "PUT",
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                tittle: value.tittle,
                description : value.description,
                prix: value.price
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


