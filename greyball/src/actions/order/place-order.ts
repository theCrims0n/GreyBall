"use server";
import data from '@/json/product.json';


interface ProductToOrder {
    productId: number;
    quantity: number;
}

export const placeOrder = async (
    productIds: ProductToOrder[],
) => {

    const products: any = await data.find(item => productIds.filter(f => f.productId === item.id))

    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

    const { subTotal, tax, total } = productIds.reduce(
        (totals, item) => {
            const productQuantity = item.quantity;
            const product = products?.find((product: any) => product.id === item.productId);

            if (!product) throw new Error(`${item.productId} no existe - 500`);

            const subTotal = product.price * productQuantity;

            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.15;
            totals.total += subTotal * 1.15;

            return totals;
        },
        { subTotal: 0, tax: 0, total: 0 }
    );


};
