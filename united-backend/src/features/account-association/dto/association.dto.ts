
export interface serviceDTO{
    id: number;
    price: number;
    title: any;  //error when type "string"
    description : any;
    state: boolean;
    association_id:number;
}

export interface InfosDTO{
    id: number;
    name: any;
    acronym: any;  
    type : any;
    email : any;
    state: boolean;
    description: any;
    address:any;
    city:any;
    website:any;
    telephone:any;
    iban: any;
    created_at:any;
}

