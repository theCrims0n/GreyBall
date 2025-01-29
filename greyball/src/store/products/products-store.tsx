import { create } from "zustand";

interface Products {
    title: string;
    getProductsByName: (title: string) => void;
}

export const useProducts = create<Products>()(
    (set, get) => ({
        title: '',
        getProductsByName(title) {
            set({ title: title })
        },
    })
);
