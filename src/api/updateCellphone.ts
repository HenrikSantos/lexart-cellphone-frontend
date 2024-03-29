import { Cellphone } from "@/global/store";
import getToken from "@/utils/getToken";
import axios from "axios";

export default async function updateCellphone(cellphone: Cellphone) {
    try {
        if (
            cellphone.options.length === 0 ||
            cellphone.options.some(el => !el.color || !el.price) || 
            !cellphone.name || 
            !cellphone.brand || 
            !cellphone.model
        ) {
            window.alert("Alguma opção está inválida");

            return;
        }

        await axios.put(`https://lexart-cellphone-backend.vercel.app/api/cellphone/${cellphone.id}`, {
            id: cellphone.id,
            name: cellphone.name,
            brand: cellphone.brand,
            model: cellphone.model,
            data: cellphone.options
        }, 
        {
            headers: {
                Authorization: getToken()
            }
        });

        return true;

    } catch (error) {
        console.error(`Erro ao atualizar o celular, verifique o status da API, error: ${error}`);
    } 
}
