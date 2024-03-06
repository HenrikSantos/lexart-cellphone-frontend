import { Cellphone } from "@/global/store";
import getToken from "@/utils/getToken";
import axios from "axios";

export default async function updateCellphone(cellphone: Cellphone) {
    try {
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
    } catch (error) {
        console.error("Error editing cellphone:", error);
    }
}
