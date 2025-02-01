import { Product } from "@/interfaces/product";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
    products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
    return (
        <div className="flex justify-center items-center grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-10 p-6 min-h-[70dvh]">
            {
                products.map((product, index) => (
                    <ProductGridItem
                        key={index || Math.random()}
                        product={product}
                    />
                ))
            }
        </div>
    )
}