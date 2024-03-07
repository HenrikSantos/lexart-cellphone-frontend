import axios from "axios";

interface ILoginResponse {
    id: number;
    email: string;
    token: string; 
}

export default async function loginUser(email: string, password: string) {
    try {
        const response = await axios.post<ILoginResponse>(
            "http://localhost:4000/api/login",
            {
                email,
                password,
            }
        );

        return response.data;
    } catch (error) {
        window.alert("Erro no login");
    }
}
