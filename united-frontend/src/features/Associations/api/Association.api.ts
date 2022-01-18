//
export class AssociationApi {
    
    public static async getAssociations() {
        return fetch('mocks/associations-mock/associations.json').then(res => res.json()).then(d => d.data);
    }

    public static async getTypes() {
        return fetch('mocks/associations-mock/types.json').then(res => res.json()).then(d => d.data);
    }

    public static async getServicesById(associationId: number) {
        return fetch('mocks/associations-mock/services.json')
            .then(res => res.json())
            .then(d => d.data.filter(
                (service:any) => service.association_id === associationId
            ));
        // const resp= await fetch("http://localhost:4200/getServicesById",{
        //     method : "GET",
        //     headers : {
        //         'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: createRequest
        //     })
        // })
        // const data = await resp.json();
        // return data
    }
}
