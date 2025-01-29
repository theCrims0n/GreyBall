'use server';

import data from '@/json/product.json';

export const getProductByTitle = async (title: string) => {

    try {

        const product = await data.filter(item => item.title.toLowerCase().trim().includes(title.toLowerCase().trim()))
        if (!product) return null;
        return  product 

    } catch (error) {
        console.log(error);
        throw new Error('Error with this product');
    }
}