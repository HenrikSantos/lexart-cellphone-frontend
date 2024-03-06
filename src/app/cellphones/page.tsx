"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCellphoneStore, { Cellphone } from "@/global/store";
import getCellphones from "@/utils/getCellphones";
import getToken from "@/utils/getToken";

export default function Cellphones() {
    const router = useRouter();
    const { setStoreCellphones } = useStore(useCellphoneStore);
    const [cellphones, setCellphones] = useState<Cellphone[]>([]);

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

    if (!cellphones.length) {
        return <p>Carregando...</p>;
    }

    return (
        <main className="flex">
            {cellphones.map((cellphone) => 
                <div className="m-2 border-2 p-2" key={cellphone.id}>
                    <h2>{cellphone.name}</h2>
                    <p>{cellphone.brand} - {cellphone.model}</p>
                    <p>Cores:</p>
                    {cellphone.options.map((option) => 
                        <div key={option.id}>
                            <p>Preço: {option.price}</p>
                            <p>Cor: {option.color}</p>
                        </div>
                    )}
                    <Link href={`/cellphones/${cellphone.id}/edit`}>
                        <button className="rounded-sm border-2 px-2 hover:bg-slate-50">Editar</button>
                    </Link>
                </div>
            )}
        </main>
    );
}
