"use client";

import { useState } from "react";
import { Product } from "@/interfaces/product";
import { CartProduct } from "@/interfaces/cart-product";
import { useCartStore } from "@/store/products/cart-product-store";
import { useShallow } from 'zustand/shallow'
interface Props {
  product: any;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore(useShallow(state => state.addProductTocart));

  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    const cartProduct: CartProduct = {
      _id: product._id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      currency: product.currency,
      image: product.images[0]
    }
    addProductToCart(cartProduct);
    setQuantity(1);
  };

  return (
    <>
      <button onClick={addToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};
