"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/products/cart-product-store';

export const NavBar = () => {

    const [loaded, setLoaded] = useState(false);
    const totalItemsInCart = useCartStore((state) => state.getTotalItems());

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <nav className="flex p-4 px-5 justify-between items-center w-full bg-stone-300">
            <div>
                <Link href="/">
                    <span className={`${titleFont.className} antialiased font-bold`}>
                        Products
                    </span>
                    <span> | Store</span>
                </Link>
            </div>
            <div className="flex items-center">
                <Link href={
                    ((totalItemsInCart === 0) && loaded)
                        ? '/empty'
                        : "/cart"
                } className="mx-2">
                    <div className="relative">
                        {(loaded && totalItemsInCart > 0) && (
                            <span className="fade-in absolute text-xs px-1.5 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                                {totalItemsInCart}
                            </span>
                        )}
                        <ShoppingCart className="w-5 h-5" />
                    </div>
                </Link>

            </div>
        </nav>
    );
};
