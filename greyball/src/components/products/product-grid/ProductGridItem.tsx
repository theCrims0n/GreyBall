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

    const [isLoading, setIsLoading] = useState(true)

    const onloadCallBack = (e: any) => {
        setIsLoading(false)
        typeof onload === 'function'
    }

    return (
        <div className="rounded-md overflow-hidden fade-in h-full w-full ">
            <Link href={`/product/${product._id}`}>
                <Image
                    key={product.title}
                    width={500}
                    height={500}
                    src={product.images[0]}
                    alt={product.title}
                    loading='lazy'
                    className={clsx("rounded fade-in h-60 w-90 ease-in-out animation duration-500 hover:scale-110 opacity-0", !isLoading && 'opacity-100')}
                    onLoad={onloadCallBack}
                />
            </Link>
            <div className="p-4 flex flex-col">
                <Link
                    className="hover:text-blue-600"
                    href={`/product/${product._id}`}>
                    {product.title}
                </Link>
                <span className="font-bold">${product.price + ' ' + product.currency}</span>
            </div>
        </div>
    );
};