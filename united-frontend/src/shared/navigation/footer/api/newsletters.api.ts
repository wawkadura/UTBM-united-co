//
export class NewslettersApi{
    public static async createOne(createRequest:JSON){
        const token = sessionStorage.getItem('token');
        const resp= await fetch("http://localhost:4200/newsletters",{
            method : "POST",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: createRequest
            })
        })
        const data = await resp.json();
        return data
    }
}
