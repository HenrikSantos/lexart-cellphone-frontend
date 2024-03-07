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
        if (
            cellphone.options.some(el => !el.color || !el.price) || 
            !cellphone.name || 
            !cellphone.brand || 
            !cellphone.model
        ) {
            window.alert("Alguma opção está inválida");

            return;
        }

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

        return true;
    } catch (error) {
        console.error("Error creating cellphone:", error);
    }
}
