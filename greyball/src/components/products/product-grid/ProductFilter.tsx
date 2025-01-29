'use client'

import { getProductByTitle } from "@/actions/product/get-product-title"
import { Product } from "@/interfaces/product"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const ProductFilter = () => {

    const [text, setText] = useState('')
    const [product, setProduct] = useState<Product[]>([])

    useEffect(() => {
        if (text === '') {
            setProduct([])
            return
        }
        handleProductByTitle(text)
    }, [text])


    const handleProductByTitle = async (text : string) => {
        const product: any = await getProductByTitle(text)
        setProduct(product)
    }

    return (
        <div className="flex justify-center items-center  h-full m-1">
            <div id="hs-combobox-basic-usage" className="relative" data-hs-combo-box="">
                <div className="relative md:w-[500px] w-96">
                    <input placeholder="Filter by title product" onChange={(e) => setText(e.target.value)} className="py-3 ps-4 pe-9 block w-full border border-blue-500 rounded-lg focus:border-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" role="combobox" aria-expanded="false" value={text} data-hs-combo-box-input="" />
                    <button id='close' onClick={() => setText('')} className="absolute top-1/2 end-3 -translate-y-1/2">
                        <X className="text-zinc-900 w-10" />
                    </button>
                </div>
                {
                        product.length > 0 &&
                        <div className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        {product.map((product, index) => {
                            return (
                                <div key={index} className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none ">
                                <Link  href={`/product/${product.id}`}  >
                                    <div className="flex justify-between items-center w-full">
                                        <span data-hs-combo-box-search-text="France" >{product.title}</span>
                                        <Image alt={product.title} width={50} height={50} src={product.images[0]} />

                                    </div>
                                </Link>
                                </div>
                                )
                        })}                  
                </div> 
                 }
            </div>
        </div>)}