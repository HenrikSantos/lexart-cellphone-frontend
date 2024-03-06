import getToken from "@/utils/getToken";
import axios from "axios";

export async function deleteCellphone(id: number) {
    try {
        await axios.delete(`http://localhost:4000/api/cellphone/${id}`, {
            headers: {
                Authorization: getToken()
            }
        });
    } catch (error) {
        console.error("Error editing cellphone:", error);
    }
}
