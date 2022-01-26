//
export class NewslettersApi{
    public static async createOne(createRequest:JSON){
        const resp= await fetch("http://localhost:4200/newsletters",{
            method : "POST",
            headers : {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: createRequest
            })
        })
        const data = await resp.json();
        return data
    }
}
