"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import useCellphoneStore, { Cellphone } from "@/global/store";
import getCellphones from "@/api/getCellphones";
import getToken from "@/utils/getToken";
import CellphoneCard from "@/components/CellphoneCard/CellphoneCard";
import sortItems from "@/utils/sortItems";

export default function ShowCellphones() {
    const router = useRouter();
    const { storeCellphones, setStoreCellphones } = useStore(useCellphoneStore);
    const [cellphones, setCellphones] = useState<Cellphone[]>([]);
    const [query, setQuery] = useState("");
    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);

    const handleGetCellphones = useCallback(async() => {
        const token = getToken();
        if (!token) {
            router.push("/");

            return;
        }
        const data = await getCellphones(token);
        setStoreCellphones(data);
        setCellphones(data);
    }, [router, setStoreCellphones]);

    useEffect(() => {
        handleGetCellphones();
    }, [handleGetCellphones]);
    
    const filterCellphones = useCallback(() => {
        let filtered = storeCellphones.filter(cellphone =>
            cellphone.name.toLowerCase().includes(query.toLowerCase())
        );
        if (selectedColor) {
            filtered = filtered.filter(cellphone =>
                cellphone.options.some(option => option.color === selectedColor)
            );
        }
        if (selectedBrand) {
            filtered = filtered.filter(cellphone =>
                cellphone.brand === selectedBrand
            );
        }
        setCellphones(filtered);
    }, [query, selectedColor, selectedBrand, storeCellphones]);

    useEffect(() => {
        filterCellphones();
    }, [query, selectedColor, selectedBrand, storeCellphones, filterCellphones]);

    const handleSortChange = (type: string) => {
        setCellphones(sortItems(cellphones, type));
    };

    if (cellphones.length === 0) {
        return <h1>Loading...</h1>;
    }

    return (
        <main className="mx-auto w-full items-start px-4 md:flex md:w-8/12 md:space-x-3 md:px-0">
            <section className="mb-3 flex flex-wrap font-bold md:w-4/12 md:border-r md:pr-3">
                <div className="w-full">
                    <p>Filtrar:</p>
                    <input
                        placeholder="Digite o nome do produto..."
                        className="w-full pl-2"
                        type="text"
                        name="query"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="my-3 grid grid-cols-4 gap-2 text-sm">
                    <button className="rounded-md border p-1 hover:bg-white/10" onClick={() => handleSortChange("name-asc")}>Nome (A-Z)</button>
                    <button className="rounded-md border p-1 hover:bg-white/10" onClick={() => handleSortChange("name-desc")}>Nome (Z-A)</button>
                    <button className="rounded-md border p-1 hover:bg-white/10" onClick={() => handleSortChange("price-asc")}>Preço Crescente</button>
                    <button className="rounded-md border p-1 hover:bg-white/10" onClick={() => handleSortChange("price-desc")}>Preço Decrescente</button>
                </div>
                <section className="flex gap-2">
                    <select
                        value={selectedColor || ""}
                        onChange={(e) => setSelectedColor(e.target.value || undefined)}
                    >
                        <option value="">Todas as cores</option>
                        {storeCellphones.map((cellphone) =>
                            Array.from(new Set(cellphone.options.map(opt => opt.color))).map((color, colorIndex) =>
                                <option key={colorIndex} value={color}>{color}</option>
                            )
                        )}
                    </select>
                    <select
                        value={selectedBrand || ""}
                        onChange={(e) => setSelectedBrand(e.target.value || undefined)}
                    >
                        <option value="">Todas as marcas</option>
                        {storeCellphones.map((cellphone) =>
                            <option key={cellphone.brand} value={cellphone.brand}>{cellphone.brand}</option>
                        )}
                    </select>
                </section>
            </section>
            <section className="justify-between gap-3 space-y-3 md:grid md:w-7/12 md:grid-cols-3 md:space-y-0">
                {cellphones.map((cellphone) =>
                    <CellphoneCard key={cellphone.id} cellphone={cellphone} handleGetCellphones={handleGetCellphones} />
                )}
            </section>
        </main>
    );
}
