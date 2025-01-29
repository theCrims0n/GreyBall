"use server";

import data from '@/json/product.json';

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 10,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const skip = (page - 1) * take
    const limit = skip + 10
    const products = data.slice(skip, limit)
    const totalCount = data.length;
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products?.map((product: any) => ({
        ...product,
        images: product.images
      })),
    };
  } catch (error) {
    throw new Error("The products could not be loaded");
  }
};
