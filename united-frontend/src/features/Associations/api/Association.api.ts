//
export class AssociationApi {
    
    public static async getAssociations(userId: number) {
        try {
            const token = sessionStorage.getItem('token');
            const resp = await fetch(`http://localhost:4200/association/userId=${userId}`,{
            method : "GET",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return await resp.json().then(d => d.data);
        } catch(e) {
            console.log("getAssociations Error:", e); 
            return fetch('mocks/associations-mock/associations.json').then(res => res.json()).then(d => d.data);
        }
    }

    public static async getTypes() {
        try {
            const token = sessionStorage.getItem('token');
            const resp = await fetch("http://localhost:4200/association/types",{
            method : "GET",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        // formatting for dropdown
        return await resp.json().then(d => d.data.map(
            (row:any) => { 
                return { label: row.type, value: row.type }
            }
        ));
        } catch(e) {
            console.log("getTypes Error:", e); 
            return fetch('mocks/associations-mock/types.json').then(res => res.json()).then(d => d.data);
        }
    }

    public static async getDateFilterMinMaxValues() {
        try {
            const token = sessionStorage.getItem('token');
            const resp = await fetch("http://localhost:4200/association/date-filter-values", {
            method : "GET",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return await resp.json().then(d => d.data);
        } catch(e) {
            console.log("getTypes Error:", e); 
        }
    }

    public static async getServicesById(associationId: number) {
        try { 
            const token = sessionStorage.getItem('token');
            const resp = await fetch(`http://localhost:4200/association/services/${associationId}`,{
                method : "GET",
                headers : {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return await resp.json().then(d => d.data);
        } catch (e) {
            console.log("getServicesById Error:", e);
            return fetch('mocks/associations-mock/services.json')
                .then(res => res.json())
                .then(d => d.data.filter(
                    (service:any) => service.association_id === associationId
                ));
        }
    }

    public static async setFavorites(user_id: number, association_id: number, isFavorite: boolean) {
        const token = sessionStorage.getItem('token');
        const rep = await fetch("http://localhost:4200/association/favorite",{
            method : "POST",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                user_id: user_id,
                association_id: association_id, 
                isFavorite: isFavorite 
            })
        })
        return rep;
    }
    
}

export class AccountAssociationApi{

    public static async createService(value:any){
        const token = sessionStorage.getItem('token');
        const resp= await fetch("http://localhost:4200/account-association",{
            method : "POST",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
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
        const token = sessionStorage.getItem('token');
        const resp = await fetch(`http://localhost:4200/account-association/${id}`,{
            method : "PUT",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
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

    public static async deleteService(id:number){
        const token = sessionStorage.getItem('token');
        const resp = await fetch(`http://localhost:4200/account-association/${id}`,{
            method : "DELETE",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await resp.json();
        return data
    }
}
