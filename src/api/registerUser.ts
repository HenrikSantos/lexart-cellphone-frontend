import axios from "axios";

interface IRegisterResponse {
    token: string;
}

export default async function registerUser(email: string, password: string) {
    try {
        const response = await axios.post<IRegisterResponse>("https://lexart-cellphone-backend.vercel.app/api/user", { email, password });

        return response.data;
    } catch (error) {
        window.alert("Erro no registro, verifique o status da API.");
    }
}
