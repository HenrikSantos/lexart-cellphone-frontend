"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Option {
  id: number;
  price: number;
  color: string;
  CellphoneId: number;
}

interface Cellphone {
  id: number;
  name: string;
  brand: string;
  model: string;
  options: Option[];
}

export default function Cellphones() {
    const [cellphones, setCellphones] = useState<Cellphone[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("lexartCellphoneLogin");

        if (!token) {
            router.push("/");

            return;
        }

        axios.get<Cellphone[]>("http://localhost:4000/api/cellphone", {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((response) => {
                setCellphones(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (!cellphones.length) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            {cellphones.map((cellphone) => 
                <div key={cellphone.id}>
                    <h2>{cellphone.name}</h2>
                    <p>{cellphone.brand} - {cellphone.model}</p>
                    {cellphone.options.map((option) => 
                        <div key={option.id}>
                            <p>Preço: {option.price}</p>
                            <p>Cor: {option.color}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
