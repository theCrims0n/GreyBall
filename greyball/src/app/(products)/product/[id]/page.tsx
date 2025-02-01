import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { getProductById } from "@/actions/product/get-product-id";
import { ProductSlides } from "@/components/product/slide/Slide";
import { AddToCart } from "./ui/AddToCart";
import { ProductRating } from "@/components/product/product-rating/ProductRating";
import { ProductSnackBar } from "@/components/product/product-snack-bar/ProductSnackBar";

interface Props {
  params: Promise<{ [id: string]: Object }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currSearchParams: any = await params;
  const { id } = await currSearchParams;

  const product = await getProductById(id);

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Product not found",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductByIdPage({ params }: Props) {
  const currSearchParams: any = await params;
  const { id } = await currSearchParams;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 flex flex-col md:flex-row">
      <div className="col-span-1 md:col-span-2 ">
        <ProductSlides
          title={product.title}
          images={product.images}
        />
      </div>

      <div className="col-span-1 px-5">
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <AddToCart product={product} />
        <p className="text-lg mb-5">${product.price + ' ' + product.currency}</p>
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
        <ProductRating rating={product.rating} />
        <ProductSnackBar />
      </div>
    </div>
  );
}