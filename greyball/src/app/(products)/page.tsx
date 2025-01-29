import { getPaginatedProductsWithImages } from '@/actions/product/product-pagination';
import { ProductFilter } from '@/components/products/product-grid/ProductFilter';
import { ProductGrid } from '@/components/products/product-grid/ProductGrid';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { redirect } from 'next/navigation';

type Props = {
    searchParams: Promise<{ [page: number]: number }>;
};

export default async function Home({ searchParams }: Props) {

    const currSearchParams: any = await searchParams || 1;
    const { page } = currSearchParams
    const { products, totalPages } = await getPaginatedProductsWithImages({ page });

    if (products.length === 0) {
        redirect('/');
    }
    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <ProductFilter />
            <ProductGrid products={products} />
            <Pagination totalPages={totalPages} />
        </div>
    );
}
