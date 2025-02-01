'use client';

import { Product } from '@/interfaces/product';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    const onloadCallBack = (e: any) => {
        setIsLoading(false)
        typeof onload === 'function'
    }

    return (
        <div className="flex flex-col md:h-96 w-full md:min-w-64 box-shadow-card p-4 space-y-4">
            <div className='flex flex-col h-full justify-center items-center'>
                <header  className=" flex justify-center items-center bg-transparent ">
                    <Link href={`/product/${product._id}`}>
                        <Image
                            key={product.title}
                            width={150}
                            height={150}
                            src={product.images[0]}
                            alt={product.title}
                            loading='lazy'
                            className={clsx("rounded bg-transparent md:h-fit h-32 w-32 md:w-fit max-w-40 max-h-36 fade-in ease-in-out animation duration-500 hover:scale-110 opacity-0", !isLoading && 'fade-in opacity-100')}
                            onLoad={onloadCallBack}
                        />
                    </Link>
                </header>
                <div className='md:text-xs text-sm space-y-2'>
                    <div className=" flex items-center justify-between">
                        <Link
                            className="hover:text-blue-600"
                            href={`/product/${product._id}`}>
                            <p color="blue-gray" className="font-medium lg:text-md text-sm">
                                {product.title}
                            </p>
                        </Link>
                        <p color="blue-gray" className="font-medium lg:text-sm text-sm">
                            ${product.price + ' ' + product.currency}
                        </p>
                    </div>
                    <p
                        color="black"
                        className="font-normal opacity-75 "
                    >
                        {product.description.slice(0, 60) + '...'}
                    </p>
                </div>
            </div>
            <footer className='flex w-full justify-center items-center'>
                <button
                    onClick={() => router.push(`/product/${product._id}`)}
                    className="bg-zinc-800 w-full h-10 text-zinc-100 text-sm rounded-lg animation duration-300 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    Add to Cart
                </button>
            </footer>
        </div>
    );
};