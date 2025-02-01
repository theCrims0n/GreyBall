'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/products/cart-product-store';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { useShallow } from "zustand/shallow";

export const ProductsCart = () => {

    const updateProductQuantity = useCartStore(useShallow(state => state.updateProductQuantity));
    const removeProduct = useCartStore(useShallow(state => state.removeProduct));
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(useShallow(state => state.cart));

    useEffect(() => {
        setLoaded(true);
    });


    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {productsInCart.map((product, index) => (
                <div key={index} className="flex mb-5">
                    <ProductImage
                        src={product.image}
                        width={100}
                        height={100}
                        style={{
                            width: "100px",
                            height: "100px",
                        }}
                        alt={product.title}
                        className="mr-5 rounded"
                    />
                    <div>
                        <Link
                            className="hover:underline cursor-pointer"
                            href={`/product/${product._id} `}>
                            {product.title}
                        </Link>
                        <p>${product.price + ' ' + product.currency}</p>
                        <QuantitySelector
                            quantity={product.quantity}
                            onQuantityChanged={(quantity: number) => updateProductQuantity(product, quantity)}
                        />
                        <button
                            onClick={() => removeProduct(product)}
                            className="underline mt-3">Remove</button>
                    </div>
                </div>
            ))}
        </>
    );
};
