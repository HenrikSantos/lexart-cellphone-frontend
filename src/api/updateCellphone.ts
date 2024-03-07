import { Cellphone } from "@/global/store";
import getToken from "@/utils/getToken";
import axios from "axios";

export default async function updateCellphone(cellphone: Cellphone) {
    try {
        if (
            cellphone.options.some(el => !el.color || !el.price) || 
            !cellphone.name || 
            !cellphone.brand || 
            !cellphone.model
        ) {
            window.alert("Alguma opção está inválida");

            return;
        }

        await axios.put(`http://localhost:4000/api/cellphone/${cellphone.id}`, {
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
        console.error("Error editing cellphone:", error);
    } 
}
