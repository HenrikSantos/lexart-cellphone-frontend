"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCellphoneStore, { Cellphone } from "@/global/store";
import getCellphones from "@/api/getCellphones";
import getToken from "@/utils/getToken";
import DeleteProductButtom from "@/components/DeleteCellphoneButtom/DeleteProductButtom";

export default function Cellphones() {
    const router = useRouter();
    const { storeCellphones, setStoreCellphones } = useStore(useCellphoneStore);
    const [cellphones, setCellphones] = useState<Cellphone[]>([]);
    const [sortBy, setSortBy] = useState("price-asc");
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
        setSortBy(type);
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
        <main>
            <div>
                <p>Filtrar:</p>
                <input type="text" name="query" id="query" onChange={(e) => setQuery(e.target.value)}/>
                <button onClick={() => sortCellphones("name-asc")}>Nome (A-Z)</button>
                <button onClick={() => sortCellphones("name-desc")}>Nome (Z-A)</button>
                <button onClick={() => sortCellphones("price-asc")}>Preço Crescente</button>
                <button onClick={() => sortCellphones("price-desc")}>Preço Decrescente</button>
                <p className="float-right">Atual: {sortBy}</p>
            </div>
            <br />
            <div className="flex">
                {cellphones.map((cellphone) => 
                    <div className="m-2 rounded-md border-2 p-2" key={cellphone.id}>
                        <h2>{cellphone.name}</h2>
                        <p>
                            {cellphone.brand} - {cellphone.model}
                        </p>
                        <p>Opções:</p>
                        <div className="ml-1">
                            {cellphone.options.map((option) => 
                                <div key={option.id}>
                                    <p>Cor: {option.color}</p>
                                    <p>Preço: {option.price}</p>
                                </div>
                            )}
                        </div>
                        <Link href={`/cellphones/${cellphone.id}/edit`}>
                            <button className="rounded-sm border-2 px-2 hover:bg-slate-50">Editar</button>
                        </Link>
                        <DeleteProductButtom id={cellphone.id} />
                    </div>
                )}
            </div>
        </main>
    );
}
