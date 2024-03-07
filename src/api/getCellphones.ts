import { Cellphone } from "@/global/store";
import axios from "axios";

export default async function getCellphones(token: string) {
    try {
        const response = await axios.get<Cellphone[]>("https://lexart-cellphone-backend.vercel.app/api/cellphone", {
            headers: {
                Authorization: `${token}`,
            },
        });
        
        return response.data;
    } catch (error) {
        window.alert(`Ocorreu um erro ao buscar os produtos, verifique o status do servidor, erro: ${error}`);
    }
}
