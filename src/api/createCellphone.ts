import getToken from "@/utils/getToken";
import axios from "axios";

export interface IOptionCreate {
    price: number;
    color: string;
}

export interface ICellphoneCreate {
    name: string;
    brand: string;
    model: string;
    options: IOptionCreate[];
}

export default async function createCellphone(cellphone: ICellphoneCreate) {
    try {
        await axios.post("http://localhost:4000/api/cellphone/", [{
            name: cellphone.name,
            brand: cellphone.brand,
            model: cellphone.model,
            data: cellphone.options
        }], 
        {
            headers: {
                Authorization: getToken()
            }
        });
    } catch (error) {
        console.error("Error creating cellphone:", error);
    }
}
