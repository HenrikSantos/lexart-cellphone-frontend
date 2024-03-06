import axios from "axios";

interface IRegisterResponse {
    token: string;
}

export default async function registerUser(email: string, password: string) {
    try {
        const response = await axios.post<IRegisterResponse>("http://localhost:4000/api/user", { email, password });

        return response.data;
    } catch (error) {
        window.alert("Erro no registro");
    }
}
