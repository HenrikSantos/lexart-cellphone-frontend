"use client";

import getCellphones from "@/api/getCellphones";
import getToken from "@/utils/getToken";
import CellphoneCard from "@/components/CellphoneCard/CellphoneCard";
import useCellphoneStore, { Cellphone } from "@/global/store";
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import CellphoneFilters from "@/components/CellphoneFilters/CellphoneFilters";
import Loading from "@/components/Loading/Loading";

export default function ShowCellphones(){
    const router = useRouter();

    const { setStoreCellphones } = useStore(useCellphoneStore);
    const [cellphones, setCellphones] = useState<Cellphone[]>([]);

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
    
    if (!cellphones) {
        return <Loading />;
    }

    return (
        <main className="mx-auto w-full items-start px-4 md:flex md:w-8/12 md:space-x-3 md:px-0">
            
            <CellphoneFilters cellphones={cellphones} setCellphones={setCellphones} />
            <section className="justify-between gap-3 space-y-3 md:grid md:w-7/12 md:grid-cols-3 md:space-y-0">
                {cellphones.map((cellphone) =>
                    <CellphoneCard key={cellphone.id} cellphone={cellphone} setCellphones={setCellphones} />
                )}
            </section>
        </main>
    );
}
