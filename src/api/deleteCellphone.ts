import getToken from "@/utils/getToken";
import axios from "axios";

export async function deleteCellphone(id: number) {
    try {
        await axios.delete(`https://lexart-cellphone-backend.vercel.app/api/cellphone/${id}`, {
            headers: {
                Authorization: getToken()
            }
        });
    } catch (error) {
        console.error("Error editing cellphone:", error);
    }
}
