"use client";

import Link from "next/link";
import { deleteCellphone } from "@/api/deleteCellphone";
import React from "react";
import { Cellphone } from "@/global/store";

export default function CellphoneCard({ cellphone, handleGetCellphones }: {cellphone: Cellphone, handleGetCellphones: () => void} ) {
    return (
        <div className="relative rounded-md border-2 p-2 pb-10" key={cellphone.id}>
            <h2 className="text-2xl font-bold underline">{cellphone.name}</h2>
            <p>
                {cellphone.brand} - {cellphone.model}
            </p>
            <p>Opções:</p>
            <div className="ml-1">
                {cellphone.options.map((option) => 
                    <div className="" key={option.id}>
                        <p>Cor: <span className="font-bold">{option.color}</span></p>
                        <p className="text-xl font-bold">R${option.price}</p>
                    </div>
                )}
            </div>
            <section className="absolute bottom-1 left-1 flex gap-2">
                <Link href={`/cellphones/${cellphone.id}/edit`}>
                    <button className="rounded-sm border px-2 hover:bg-yellow-400 hover:text-black">Editar</button>
                </Link>
                <button className="rounded-sm border px-2 hover:bg-red-500" type="button" onClick={() => {
                    deleteCellphone(cellphone.id);
                    handleGetCellphones();
                }}>
                Deletar
                </button>
            </section>
        </div>
    );
}
