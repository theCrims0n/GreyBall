'use server';

import data from '@/json/product.json';

export const getProductById = async (id: number) => {

    try {

        const product = await data.find(item => item.id == id)
        if (!product) return null;
        return {
            ...product,
        };

    } catch (error) {
        console.log(error);
        throw new Error('Error with this product');
    }
}