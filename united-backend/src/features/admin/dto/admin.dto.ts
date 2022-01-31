export interface CreateAssociationDTO{
    name: any,
    acronym: any,
    type: any,
    email: any,
    password: any,
    description: any,
    role: any,
    created_at: any,
}

export interface UpdateAssociationDTO{
    id: any,
    name: any,
    acronym: any,
    type: any,
    email: any,
    description: any,
    address: any,
    city: any,
    website: any,
    telephone: any,
    state: boolean,
    created_at: any,
    logo: any,
    iban: any
}

export interface UpdateUserDTO{
    id: any,
    firstName: any,
    lastName: any,
    email: any,
    state: any,
    role: any,
}


export interface UserDTO{
    email: any,
    password: any,
    role: any,
}


export interface AssociationDTO{
    name: any,
    acronym: any,
    type: any,
    email: any,
    description: any,
    created_at: any,
}
