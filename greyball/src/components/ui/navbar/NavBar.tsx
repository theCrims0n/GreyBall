"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { titleFont } from "@/config/fonts";
import {  Menu, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/products/cart-product-store';
import { useUIStore } from '@/store/ui/ui-store';

export const NavBar = () => {

    const [loaded, setLoaded] = useState(false);
    const totalItemsInCart = useCartStore((state) => state.getTotalItems());
    const { openSideMenu } = useUIStore()

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <nav className="flex p-4 px-5 justify-between items-center w-full bg-[rgb(251, 251, 251)] shadow shadow-b-lg">
            <div className='flex justify-center items-center space-x-4'>
                <button onClick={() => openSideMenu()}>
                    <Menu />
                </button>
                <Link href="/">
                    <span className={`${titleFont.className} antialiased font-bold`}>
                        Products
                    </span>
                    <span> | Store</span>
                </Link>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2">
                <Link href={
                    ((totalItemsInCart === 0) && loaded)
                        ? '/empty'
                        : "/cart"
                } className="mx-2">
                    <div className="relative">
                        {(loaded && totalItemsInCart > 0) && (
                            <span className="fade-in flex justify-center items-center absolute text-xs h-[20px] w-[20px] rounded-full font-bold -top-3 -right-2 bg-blue-700 text-white">
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
