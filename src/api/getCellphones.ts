import { Cellphone } from "@/global/store";
import axios from "axios";

export default async function getCellphones(token: string) {
    const response = await axios.get<Cellphone[]>("https://lexart-cellphone-backend.vercel.app/api/cellphone", {
        headers: {
            Authorization: `${token}`,
        },
    });

    return response.data;
}
