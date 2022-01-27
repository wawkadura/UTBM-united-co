export class SignUpService {
    async CreateDonor(data) {
        const resp = await fetch("http://localhost:4200/sign-up", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            })
        });

        return await resp.json()
    }
}