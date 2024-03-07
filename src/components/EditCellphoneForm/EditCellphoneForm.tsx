import React, { FormEvent, useState } from "react";
import { Cellphone, Option } from "@/global/store";
import updateCellphone from "@/api/updateCellphone";

export default function EditCellphoneForm({ cellphone }: { cellphone: Cellphone }) {
    const [cellphoneForm, setCellphoneForm] = useState<Cellphone>(cellphone);
    const [newOption, setNewOption] = useState<Omit<Option, "id">>({ price: 0, color: "", CellphoneId: cellphone.id });
    const [message, setMessage] = useState<string>("");

    const handleOptionChange = (indexToChange: number, value: number | string, type: string) => {
        if (type === "price" && 0 > +value) return;

        setCellphoneForm(prevCellphone => ({
            ...prevCellphone,
            options: prevCellphone.options.map((option, index) =>   
                index === indexToChange ? { ...option, [type]: value } : option
            )
        }));
    };

    const handleAddNewOption = (e: FormEvent) => {
        e.preventDefault();
        
        if (!newOption.color || newOption.price <= 0) return;

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
            className="mx-auto mb-10 flex flex-wrap gap-3 px-3 md:w-4/12"
            onSubmit={async(e) => {
                e.preventDefault();

                const result = await updateCellphone(cellphoneForm);
                if(result) setMessage("Celular atualizado com sucesso!");
            }}
        >
            <h2 className="text-xl">Editar Produto</h2>
            <label className="w-full" htmlFor="nameForm">
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
            <label className="w-full " htmlFor="brandForm">
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
            <label className="w-full " htmlFor="modelForm">
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
            <section className="w-full">
                Opções:
                {cellphoneForm.options.map((option, index) =>
                    <div className="my-3 rounded-md border  px-3 py-2" key={index}>
                        <label htmlFor={`color${index}`}>
                            Cor:
                            <input
                                className="w-full px-1"
                                type="text"
                                id={`color${index}`}
                                name={`option-${index}-color`}
                                value={option.color}
                                onChange={(e) => handleOptionChange(index, e.target.value, "color")}
                            />
                        </label>
                        <label htmlFor={`price${index}`}>
                            Preço:
                            <input
                                className="w-full px-1"
                                type="number"
                                id={`price${index}`}
                                name={`option-${index}-price`}
                                value={option.price}
                                onChange={(e) => handleOptionChange(index, +e.target.value, "price")}
                            />
                        </label>
                        <button 
                            className="mb-3 mt-4 rounded-md border px-2 py-1 hover:bg-red-600" type="button"
                            onClick={() => {handleRemoveOption(index);}}
                        >
                            Remover
                        </button>
                    </div>
                )}
            </section>
            <section className="flex w-full flex-wrap gap-3 rounded-md border p-3">
                <p className="underline">Adicionar nova opção:</p>
                <label className="w-full" htmlFor="newColor">
                    Cor:
                    <input
                        placeholder="Digite a cor"
                        className="w-full px-1" type="text" id="newColor" value={newOption.color} onChange ={(e) => setNewOption({ ...newOption, color: e.target.value })}/>
                </label>
                <label className="w-full" htmlFor="newPrice">
                    Preço:
                    <input
                        className="w-full px-1" type="number" id="newPrice" value={newOption.price} onChange={(e) => setNewOption({ ...newOption, price: +e.target.value })}/>
                </label>
                <button 
                    className="my-2 w-full rounded-md border py-2 hover:bg-yellow-400 hover:text-black disabled:opacity-20" type="button" 
                    disabled={
                        (newOption.color ? false : true) || 
                    (newOption.price > 0 ? false : true)
                    } 
                    onClick={handleAddNewOption}
                >
                    Adicionar
                </button>
            </section>
            <button className="gradient-border my-5 w-full rounded-md border py-2 hover:bg-white/20" type="submit">Salvar</button>
            {message && <p>{message}</p>}
        </form>
    );
}
