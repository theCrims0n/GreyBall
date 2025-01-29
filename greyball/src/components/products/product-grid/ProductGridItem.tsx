'use client';

import { Product } from '@/interfaces/product';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    return (
        <div className="rounded-md overflow-hidden fade-in h-full md:max-w-80 w-full">
            <Link href={`/product/${product.id}`}>
                <Image
                    width={500}
                    height={500}
                    src={product.images[0]}
                    alt={product.title}
                    loading='lazy'
                    className="rounded fade-in h-60 w-90 animtion duration-300 ease-in-out hover:scale-110"
                />
            </Link>
            <div className="p-4 flex flex-col">
                <Link
                    className="hover:text-blue-600"
                    href={`/product/${product.id}`}>
                    {product.title}
                </Link>
                <span className="font-bold">${product.price + ' ' + product.currency}</span>
            </div>
        </div>
    );
};