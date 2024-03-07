"use client";

import getCellphones from "@/api/getCellphones";
import getToken from "@/utils/getToken";
import CellphoneCard from "@/components/CellphoneCard/CellphoneCard";
import sortItems from "@/utils/sortItems";
import useCellphoneStore, { Cellphone } from "@/global/store";
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";

interface FilterOptions {
    query: string;
    selectedColor: string | undefined;
    selectedBrand: string | undefined;
}

export default function ShowCellphones(){
    const router = useRouter();
    const { storeCellphones, setStoreCellphones } = useStore(useCellphoneStore);
    const [cellphones, setCellphones] = useState<Cellphone[]>([]);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({ query: "", selectedColor: "", selectedBrand: "" });
    const [colors, setColors] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            const token = getToken();
            if (!token) {
                router.push("/");

                return;
            }
    
            const data = await getCellphones(token);
    
            if (!data) return;
    
            setStoreCellphones(data);
            setCellphones(data);
        };
    
        fetchData();
    }, [router, setStoreCellphones]);
    
    useEffect(() => {
        const applyFilter = () => {
            let filtered = storeCellphones.filter(cellphone =>
                cellphone.name.toLowerCase().includes(filterOptions.query.toLowerCase())
            );
            if (filterOptions.selectedColor) {
                filtered = filtered.filter(cellphone =>
                    cellphone.options.some(option => option.color === filterOptions.selectedColor)
                );
            }
            if (filterOptions.selectedBrand) {
                filtered = filtered.filter(cellphone =>
                    cellphone.brand === filterOptions.selectedBrand
                );
            }
            setCellphones(filtered);
        };
    
        applyFilter();
    }, [filterOptions, storeCellphones]);

    useEffect(() => {
        const uniqueColors = new Set<string>();
        const uniqueBrands = new Set<string>();
    
        storeCellphones.forEach(cellphone => {
            cellphone.options.forEach(option => {
                uniqueColors.add(option.color);
            });
    
            uniqueBrands.add(cellphone.brand);
        });
    
        const uniqueColorsArray = Array.from(uniqueColors).sort();
        const uniqueBrandsArray = Array.from(uniqueBrands).sort();
    
        setColors(uniqueColorsArray);
        setBrands(uniqueBrandsArray);
    
    }, [storeCellphones]);
    
    if (!cellphones) {
        return <h1 className="text-center">Loading...</h1>;
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
                        value={filterOptions.query}
                        onChange={(e) => setFilterOptions({ ...filterOptions, query: e.target.value })}
                    />
                </div>

                <div className="my-3 grid grid-cols-4 gap-2 text-sm">
                    <button 
                        className="rounded-md border p-1 hover:bg-white/10" 
                        onClick={() => setCellphones(sortItems([...cellphones], "name-asc"))}
                    >
                        Nome (A-Z)
                    </button>
                    <button 
                        className="rounded-md border p-1 hover:bg-white/10" 
                        onClick={() => setCellphones(sortItems([...cellphones], "name-desc"))}
                    >
                        Nome (Z-A)
                    </button>
                    <button 
                        className="rounded-md border p-1 hover:bg-white/10" 
                        onClick={() => setCellphones(sortItems([...cellphones], "price-asc"))}
                    >
                        Preço Crescente
                    </button>
                    <button 
                        className="rounded-md border p-1 hover:bg-white/10" 
                        onClick={() => setCellphones(sortItems([...cellphones], "price-desc"))}
                    >
                        Preço Decrescente
                    </button>
                </div>

                <section className="flex gap-2">
                    <select
                        value={filterOptions.selectedColor || ""}
                        onChange={(e) => setFilterOptions({ ...filterOptions, selectedColor: e.target.value || undefined })}
                    >
                        <option value="">Todas as cores</option>
                        {colors.map(color =>
                            <option key={color} value={color}>{color}</option>
                        )}
                    </select>

                    <select
                        value={filterOptions.selectedBrand || ""}
                        onChange={(e) => setFilterOptions({ ...filterOptions, selectedBrand: e.target.value || undefined })}
                    >
                        <option value="">Todas as marcas</option>
                        {brands.map(brand =>
                            <option key={brand} value={brand}>{brand}</option>
                        )}
                    </select>
                </section>
            </section>
            
            <section className="justify-between gap-3 space-y-3 md:grid md:w-7/12 md:grid-cols-3 md:space-y-0">
                {cellphones.map((cellphone) =>
                    <CellphoneCard key={cellphone.id} cellphone={cellphone} setCellphones={setCellphones} />
                )}
            </section>
        </main>
    );
}
