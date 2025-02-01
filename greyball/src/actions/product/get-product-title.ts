'use server';

import Products from '@/schemas/products';

export const getProductByTitle = async (title: string) => {

    try {
        const data = await Products.find({ title : { $regex : new RegExp(title, "i") } } )
        const product = JSON.parse(JSON.stringify(data))
        if (!product) return [];
        return product

    } catch (error) {
        console.log(error);
        throw new Error('Error with this product');
    }
}