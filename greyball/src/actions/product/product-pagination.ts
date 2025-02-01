"use server";

import Products from '@/schemas/products';
import connection from '../../../db/connection';

interface PaginationOptions {
  page?: number;
  limit?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  limit = 10,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    await connection()
    const skip = (page - 1) * limit;
    const data = await Products.find().skip(skip).limit(limit)
    const products = JSON.parse(JSON.stringify(data))
    const totalCount = await Products.find().countDocuments()
    const totalPages = Math.ceil(totalCount / limit);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products?.map((product: any) => ({
        ...product,
        images: product.images
      })),
    };
  } catch (error) {
    console.log(error)
    throw new Error("The products could not be loaded");
  }
};
