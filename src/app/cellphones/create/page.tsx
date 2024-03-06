"use client";

import React, { FormEvent, useState } from "react";
import createCellphone, { ICellphoneCreate, IOptionCreate } from "@/api/createCellphone";

export default function Create() {
    const [cellphoneForm, setCellphoneForm] = useState<ICellphoneCreate>({
        name: "",
        brand: "",
        model: "",
        options: [],
    });
    const [newOption, setNewOption] = useState<IOptionCreate>({ price: 0, color: "" });

    const handleAddNewOption = (e: FormEvent) => {
        e.preventDefault();
        
        setCellphoneForm((prevCellphone) => ({
            ...prevCellphone,
            options: [...prevCellphone.options, newOption]
        }));

        setNewOption({ price: 0, color: "" });
    };

    const handleOptionChange = (indexToChange: number, value: number | string, type: string) => {
        setCellphoneForm(prevCellphone => ({
            ...prevCellphone,
            options: prevCellphone.options.map((option, index) =>   
                index === indexToChange ? { ...option, [type]: value } : option
            )
        }));
    };
    
    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            createCellphone(cellphoneForm);
        }}>
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
            <label htmlFor="brandForm">
                Brand:
                <input
                    id="brandForm"
                    type="text"
                    name="brand"
                    value={cellphoneForm.brand}
                    onChange={(e) => setCellphoneForm({ ...cellphoneForm, brand: e.target.value })}
                />
            </label>
            <label htmlFor="modelForm">
                Model:
                <input
                    id="modelForm"
                    type="text"
                    name="model"
                    value={cellphoneForm.model}
                    onChange={(e) => setCellphoneForm({ ...cellphoneForm, model: e.target.value })}
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
            <button type="submit">Criar</button>
        </form>
    );
}
