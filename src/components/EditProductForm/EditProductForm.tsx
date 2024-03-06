import React, { FormEvent, useState } from "react";
import { Cellphone, Option } from "@/global/store";
import "./EditProductForm.css";
import axios from "axios";
import getToken from "@/utils/getToken";

export default function EditProductForm({ cellphone }: { cellphone: Cellphone }) {
    const [cellphoneForm, setCellphoneForm] = useState<Cellphone>(cellphone);
    const [newOption, setNewOption] = useState<Omit<Option, "id">>({ price: 0, color: "", CellphoneId: cellphone.id });

    const handleEditCellphone = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            await axios.put(`http://localhost:4000/api/cellphone/${cellphone.id}`, {
                id: cellphone.id,
                name: cellphoneForm.name,
                brand: cellphoneForm.brand,
                model: cellphoneForm.model,
                data: cellphoneForm.options
            }, {
                headers: {
                    Authorization: getToken()
                }
            });
        } catch (error) {
            console.error("Error editing cellphone:", error);
        }
    };

    const handleOptionChange = (indexToChange: number, value: number | string, type: string) => {
        setCellphoneForm(prevCellphone => ({
            ...prevCellphone,
            options: prevCellphone.options.map((option, index) =>   
                index === indexToChange ? { ...option, [type]: value } : option
            )
        }));
    };

    const handleAddNewOption = (e: FormEvent) => {
        e.preventDefault();
        
        setCellphoneForm((prevCellphone) => ({
            ...prevCellphone,
            options: [...prevCellphone.options, newOption]
        }));

        setNewOption({ price: 0, color: "", CellphoneId: cellphone.id });
    };

    return (
        <form onSubmit={handleEditCellphone}>
            <label htmlFor="nameForm">
                Name:
                <input
                    id="nameForm"
                    type="text"
                    name="name"
                    value={cellphoneForm.name}
                    onChange={(e) => setCellphoneForm({ ...cellphoneForm, name: e.target.value })}
                />
            </label>
            <label>
                Options:
                {cellphoneForm.options.map((option, index) =>
                    <div key={index}>
                        <input
                            type="number"
                            id={`price${index}`}
                            name={`option-${index}-price`}
                            value={option.price}
                            onChange={(e) => handleOptionChange(index, +e.target.value, "price")}
                        />
                        <input
                            type="text"
                            name={`option-${index}-color`}
                            value={option.color}
                            onChange={(e) => handleOptionChange(index, e.target.value, "color")}
                        />
                    </div>
                )}
            </label>
            <div>
                <p>Add new option:</p>
                <label htmlFor="newPrice">
                    Price:
                    <input type="number" id="newPrice" value={newOption.price} onChange={(e) => setNewOption({ ...newOption, price: +e.target.value })}/>
                </label>
                <label htmlFor="newColor">
                    Color:
                    <input type="text" id="newColor" value={newOption.color} onChange={(e) => setNewOption({ ...newOption, color: e.target.value })}/>
                </label>
                <button type="submit" onClick={handleAddNewOption}>Add</button>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
}
