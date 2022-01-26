
export interface serviceDTO{
    id: number;
    price: number;
    title: any;  //error when type "string"
    description : any;
    state: boolean;
}

export interface InfosDTO{
    id: number;
    name: any;
    acronym: any;  //error when type "string"
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

