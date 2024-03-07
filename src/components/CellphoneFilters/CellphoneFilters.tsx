import React, { useEffect, useState } from "react";
import sortItems from "@/utils/sortItems";
import { useStore } from "zustand";
import useCellphoneStore, { Cellphone } from "@/global/store";

interface IFilterOptions {
    query: string;
    selectedColor: string | undefined;
    selectedBrand: string | undefined;
}

interface ICellphoneFilters {
    cellphones: Cellphone[];
    setCellphones: React.Dispatch<React.SetStateAction<Cellphone[]>>;
}

export default function CellphoneFilters({ cellphones, setCellphones } : ICellphoneFilters) {
    const { storeCellphones } = useStore(useCellphoneStore);
    const [filterOptions, setFilterOptions] = useState<IFilterOptions>({ query: "", selectedColor: "", selectedBrand: "" });
    const [colors, setColors] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);

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
    }, [filterOptions, storeCellphones, setCellphones]);
    
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

    return (
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
    );
}
