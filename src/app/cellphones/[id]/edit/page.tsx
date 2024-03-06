"use client";

import EditProductForm from "@/components/EditCellphoneForm/EditProductForm";
import React, { useCallback, useEffect, useState } from "react";
import useCellphoneStore, { Cellphone } from "@/global/store";
import getCellphones from "@/api/getCellphones";
import { useRouter } from "next/navigation";
import getToken from "@/utils/getToken";
import { useStore } from "zustand";

interface EditPropTypes {
    params: {
        id: number
    }
}

export default  function Edit({ params: { id } }: EditPropTypes) {
    const [cellphone, setCellphone] = useState<Cellphone>();
    const { storeCellphones, setStoreCellphones } = useStore(useCellphoneStore);

    const router = useRouter();

    const reloadData = useCallback(async() => {
        const token = getToken();

        if (!token) {
            router.push("/");

            return;
        }

        const data = await getCellphones(token);
        setStoreCellphones(data);
    }, [router, setStoreCellphones]);

    useEffect(() => {
        if (storeCellphones.length === 0) {
            reloadData();
        }
        setCellphone(() => storeCellphones.find(el => +el.id === +id));
    }, [id, reloadData, storeCellphones]);

    return (
        <div>
            { cellphone && 
                <EditProductForm cellphone={cellphone} />
            }
        </div>
    );
}
