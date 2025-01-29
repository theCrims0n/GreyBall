'use client'

import { useCartStore } from "@/store/products/cart-product-store"
import clsx from "clsx"
import { useEffect, useState } from "react"

export const ProductSnackBar = () => {
    const { success, clearSuccess } = useCartStore();
    const totalItemsInCart = useCartStore((state) => state.getTotalItems());
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        if (!success) { return }
        setHidden(false)
        setTimeout(() => {
            setHidden(true)
            clearSuccess()
        }, 3000);
    }, [totalItemsInCart])

    useEffect(() => {
        clearSuccess()
    }, [])

    return (
        <>
        {!hidden && <div className="bg-green-300 border border-green-400 px-4 py-3 rounded relative mt-2 flex justify-start items-center fade-in" role="success">
            <strong className="font-bold">Good! </strong>
            <span className="block sm:inline pl-2">Your product was successfully added</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setHidden(true)}>
                <svg className="fill-current h-6 w-6 text-zinc-900" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>}
        </>
    )
}