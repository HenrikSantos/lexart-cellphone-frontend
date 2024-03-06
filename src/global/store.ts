import { create } from "zustand";

export interface Option {
    id?: number;
    price: number;
    color: string;
    CellphoneId: number;
}
  
export interface Cellphone {
    id: number;
    name: string;
    brand: string;
    model: string;
    options: Option[];
}

interface Store {
    storeCellphones: Cellphone[],
    // eslint-disable-next-line no-unused-vars
    setStoreCellphones: (newCellphones: Cellphone[]) => void
}

const useCellphoneStore = create<Store>((set) => ({
    storeCellphones: [],
    setStoreCellphones: (newCellphones) => set(() => ({ storeCellphones: newCellphones })),
}));

export default useCellphoneStore;
