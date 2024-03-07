"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCellphoneStore, { Cellphone } from "@/global/store";
import getCellphones from "@/api/getCellphones";
import getToken from "@/utils/getToken";
import { deleteCellphone } from "@/api/deleteCellphone";

export default function Cellphones() {
    const router = useRouter();
    const { storeCellphones, setStoreCellphones } = useStore(useCellphoneStore);
    const [cellphones, setCellphones] = useState<Cellphone[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const handleGetCellphones = async() => {
            const token = getToken();
            if (!token) {
                router.push("/");

                return;
            }
            const data = await getCellphones(token);
            setStoreCellphones(data);
            setCellphones(data);
        };

        handleGetCellphones();
    }, [router, setStoreCellphones]);

    const sortCellphones = (type: string) => {
        const sortedCellphones = [...cellphones];
        if (type === "name-asc") {
            sortedCellphones.sort((a, b) => a.name.localeCompare(b.name));
        } else if (type === "name-desc") {
            sortedCellphones.sort((a, b) => b.name.localeCompare(a.name));
        }else if (type === "price-asc") {
            sortedCellphones.sort((a, b) => a.options[0].price - b.options[0].price);
        } else if (type === "price-desc") {
            sortedCellphones.sort((a, b) => b.options[0].price - a.options[0].price);
        }
        setCellphones(sortedCellphones);
    };

    const handleFilter = useCallback(() => {
        const filteredCellphones = storeCellphones.filter(cellphone =>
            cellphone.name.toLowerCase().includes(query.toLowerCase())
        );
        setCellphones(filteredCellphones);
    }, [query, storeCellphones]);

    useEffect(() => {
        handleFilter();
    }, [query, handleFilter]);

    return (
        <main className="mx-auto w-full items-start px-4 md:flex md:w-8/12 md:space-x-3 md:px-0">
            <section className="flex flex-wrap font-bold md:w-4/12 md:border-r md:pr-3">
                <div className="w-full">
                    <p>Filtrar:</p>
                    <input placeholder="Digite o nome do produto..." className="w-full pl-2" type="text" name="query" id="query" onChange={(e) => setQuery(e.target.value)}/>
                </div>
                <div className="my-3 flex space-x-3 text-sm">
                    <button className="w-2/5 rounded-md border p-1 hover:bg-white/10" onClick={() => sortCellphones("name-asc")}>Nome (A-Z)</button>
                    <button className="w-2/5 rounded-md border p-1 hover:bg-white/10" onClick={() => sortCellphones("name-desc")}>Nome (Z-A)</button>
                    <button className="w-2/5 rounded-md border p-1 hover:bg-white/10" onClick={() => sortCellphones("price-asc")}>Preço Crescente</button>
                    <button className="w-2/5 rounded-md border p-1 hover:bg-white/10" onClick={() => sortCellphones("price-desc")}>Preço Decrescente</button>
                </div>
            </section>
            <section className="justify-between gap-3 space-y-3 md:grid md:w-7/12 md:grid-cols-3 md:space-y-0">
                {cellphones.map((cellphone) => 
                    <div className="rounded-md border-2 p-2" key={cellphone.id}>
                        <h2 className=" text-2xl font-bold underline">{cellphone.name}</h2>
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
                        <section className="mt-2 flex gap-1">
                            <Link href={`/cellphones/${cellphone.id}/edit`}>
                                <button className="rounded-sm border px-2 hover:bg-slate-50/20">Editar</button>
                            </Link>
                            <button className="rounded-sm border px-2 hover:bg-slate-50/20" type="button" onClick={() => {
                                deleteCellphone(cellphone.id);
                            }}>
                            Deletar
                            </button>
                        </section>
                    </div>
                )}
            </section>
        </main>
    );
}
