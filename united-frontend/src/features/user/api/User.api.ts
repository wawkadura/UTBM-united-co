export class UserApi {

    public static async getUser(userId: number) {
        try {
            const token = sessionStorage.getItem('token');
            const resp = await fetch(`http://localhost:4200/users/user=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            return await resp.json().then(d => d.data);
        } catch(e) {
            console.log("getUser Error : ", e);
            // return fetch('mocks/users-mock/users.json').then(res => res.json()).then(d => d.data);
        }
    }

    public static async modifyUser(user: any) {
        const token = sessionStorage.getItem('token');
        return await fetch("http://localhost:4200/users/modify",{
            method : "POST",
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
    }

    public static async getFavoriteAssociations(userId: number) {
        try {
            const token = sessionStorage.getItem('token');
            const resp = await fetch(`http://localhost:4200/users/user=${userId}/associations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            return await resp.json().then(d => d.data);
        } catch(e) {
            console.log("getUser Error : ", e);
            // return fetch('mocks/users-mock/users.json').then(res => res.json()).then(d => d.data);
        }
    }

}
