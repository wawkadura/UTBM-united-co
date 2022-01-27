export class UserApi {

    public static async getUser(userId: number) {
        try {
            const resp = await fetch(`http://localhost:4200/users/userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return await resp.json().then(d => d.data);
        } catch(e) {
            console.log("getUser Error : ", e);
            // return fetch('mocks/users-mock/users.json').then(res => res.json()).then(d => d.data);
        }
    }

}
