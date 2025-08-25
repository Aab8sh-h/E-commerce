import { Product } from "@/types/Products";
import path from "path";
import fs from "fs";
import { FaStar } from "react-icons/fa";
import QuantitySelector from "@/components/QuantitySelector";
import ProductGallery from "@/components/ProductGallery";

async function getProduct(id: string): Promise<Product | null> {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = await fs.promises.readFile(filePath, "utf-8");
  const products: Product[] = JSON.parse(jsonData);

  const product = products.find((p) => p.id.toString() === id);
  if (!product) return null;

  const images = [product.url, product.url2, product.url3, product.url4].filter(
    Boolean
  );

  return { ...product, images } as Product & { images: string[] };
}

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 pt-35">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductGallery images={product.images ?? []} />

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-lg text-gray-700">{product.longDescription}</p>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-600">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(product.rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {product.rating.toFixed(1)}
              </span>
            </span>
          </div>

          <QuantitySelector product={product} />
        </div>
      </div>
    </div>
  );
}
