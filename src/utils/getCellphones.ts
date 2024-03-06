import { Cellphone } from "@/global/store";
import axios from "axios";

export default async function getCellphones(token: string) {
    const response = await axios.get<Cellphone[]>("http://localhost:4000/api/cellphone", {
        headers: {
            Authorization: `${token}`,
        },
    });

    return response.data;
}
