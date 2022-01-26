export class SignUpService {
    CreateDonor(data) {
        return fetch("http://localhost:4200/sign-up", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }
            })
        });
    }
}