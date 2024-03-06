import React from "react";
import { deleteCellphone } from "@/api/deleteCellphone";

export default function DeleteProductButtom({ id }: {id: number}) {

    return (
        <button className="rounded-sm border-2 px-2 hover:bg-slate-50" type="button" onClick={() => {
            deleteCellphone(id);
        }}>
            Deletar
        </button>
    );
}
