import fs from "fs";
import path from "path";
import Search from "../components/Search";

type Product = {
  id: number;
  url: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  rating: number;
};

async function getProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const jsonData = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="bg-base-200 min-h-screen">
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-base-content mb-8 tracking-wide">
          Explore Our Products
        </h1>

        <Search products={products} />
      </section>
    </main>
  );
}
