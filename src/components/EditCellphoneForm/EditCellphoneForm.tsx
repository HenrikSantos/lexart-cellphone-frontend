import React, { FormEvent, useState } from "react";
import { Cellphone, Option } from "@/global/store";
import updateCellphone from "@/api/updateCellphone";

export default function EditCellphoneForm({ cellphone }: { cellphone: Cellphone }) {
    const [cellphoneForm, setCellphoneForm] = useState<Cellphone>(cellphone);
    const [newOption, setNewOption] = useState<Omit<Option, "id">>({ price: 0, color: "", CellphoneId: cellphone.id });

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

    const handleRemoveOption = (index: number) => {
        setCellphoneForm(prevCellphone => ({
            ...prevCellphone,
            options: prevCellphone.options.filter((option, insideIndex) =>  insideIndex !== index)
        }));
    };

    return (
        <form 
            className="mx-auto flex flex-wrap gap-3 md:w-4/12"
            onSubmit={(e) => {
                e.preventDefault();
                updateCellphone(cellphoneForm);
            }}
        >
            
            <label className="w-full px-3" htmlFor="nameForm">
                Nome:
                <input
                    className="w-full px-1"
                    id="nameForm"
                    type="text"
                    name="name"
                    value={cellphoneForm.name}
                    onChange={(e) => setCellphoneForm({ ...cellphoneForm, name: e.target.value })}
                />
            </label>
            <label className="w-full px-3" htmlFor="brandForm">
                Marca:
                <input
                    className="w-full px-1"
                    id="brandForm"
                    type="text"
                    name="brand"
                    value={cellphoneForm.brand}
                    onChange={(e) => setCellphoneForm({ ...cellphoneForm, brand: e.target.value })}
                />
            </label>
            <label className="w-full px-3" htmlFor="modelForm">
                Modelo:
                <input
                    className="w-full px-1"
                    id="modelForm"
                    type="text"
                    name="model"
                    value={cellphoneForm.model}
                    onChange={(e) => setCellphoneForm({ ...cellphoneForm, model: e.target.value })}
                />
            </label>
            <label className="w-full px-3">
                Opções:
                {cellphoneForm.options.map((option, index) =>
                    <div className="my-3 rounded-md border px-3 py-2" key={index}>
                        <p>Cor</p>
                        <input
                            className="w-full px-1"
                            type="text"
                            name={`option-${index}-color`}
                            value={option.color}
                            onChange={(e) => handleOptionChange(index, e.target.value, "color")}
                        />
                        <p>Preço:</p>
                        <input
                            className="w-full px-1"
                            type="number"
                            id={`price${index}`}
                            name={`option-${index}-price`}
                            value={option.price}
                            onChange={(e) => handleOptionChange(index, +e.target.value, "price")}
                        />
                        <button 
                            className="mb-3 mt-4 rounded-md border px-2 py-1 hover:bg-red-600" type="button"
                            onClick={() => {handleRemoveOption(index);}}
                        >
                            Remover
                        </button>
                    </div>
                )}
            </label>
            <div className="mx-3 flex w-full flex-wrap gap-3 rounded-md border p-3">
                <p className="underline">Add new option:</p>
                <label className="w-full" htmlFor="newPrice">
                    Price:
                    <input
                        className="w-full px-1" type="number" id="newPrice" value={newOption.price} onChange={(e) => setNewOption({ ...newOption, price: +e.target.value })}/>
                </label>
                <label className="w-full" htmlFor="newColor">
                    Color:
                    <input
                        placeholder="Digite a cor"
                        className="w-full px-1" type="text" id="newColor" value={newOption.color} onChange ={(e) => setNewOption({ ...newOption, color: e.target.value })}/>
                </label>
                <button className="my-2 w-full rounded-md border py-2 hover:bg-yellow-400 hover:text-black" type="button" onClick={handleAddNewOption}>Add</button>
            </div>
            <button className="gradient-border mx-3 w-full rounded-md border py-2 hover:bg-white/20" type="submit">Salvar</button>
        </form>
    );
}
