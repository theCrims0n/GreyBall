'use server';

import Products from "@/schemas/products";
import connection from "../../../db/connection";

export const getProductById = async (_id: Object) => {

    try {
        await connection()
        const data = await Products.findById({ _id })
        const product = JSON.parse(JSON.stringify(data))
        if (!product) return null;
        return {
            ...product,
        };

    } catch (error) {
        console.log(error);
        throw new Error('Error with this product');
    }
}