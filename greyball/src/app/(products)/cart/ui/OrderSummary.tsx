"use client";

import { useCartStore } from "@/store/products/cart-product-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const OrderSummary = () => {

  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const { itemsInCart, subTotal, tax, total, currency } = useCartStore(useShallow((state) =>
    state.getSummaryInformation())
  );

  useEffect(() => {
    setLoaded(true);
  }, []);


  useEffect(() => {

    if (itemsInCart === 0 && loaded === true) {
      router.replace('/empty')
    }

  }, [itemsInCart, loaded])

  if (!loaded) return <p>Loading...</p>;

  return (

    <div className="grid grid-cols-2">
      <span>Quantity of Products</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 item" : `${itemsInCart} items`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal) + ' ' + currency}</span>

      <span>Taxes (15%)</span>
      <span className="text-right">{currencyFormat(tax) + ' ' + currency}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total) + ' ' + currency}</span>
    </div>
  );
};
