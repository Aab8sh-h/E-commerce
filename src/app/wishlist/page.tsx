"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import { Product } from "@/types/Products";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Your wishlist is empty
        </h2>
      </div>
    );
  }

  return (
    <main className="bg-base-200 min-h-screen px-6 py-10 pt-20">
      <h2 className="text-3xl font-semibold mb-6 text-center text-base-content pb-7">
        Your Wishlist💗
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((item) => {
          const mappedProduct: Product = {
            id: item.id,
            title: item.title,
            price: item.price,
            url: item.url ?? "/placeholder.png",
            description: item.description ?? "",
            longDescription: item.description ?? "",
            rating: item.rating ?? 0,
          };

          return (
            <div
              key={item.id}
              className="card bg-base-100 shadow rounded-lg overflow-hidden 
                         transition-transform transform hover:scale-105 hover:shadow-lg 
                         duration-300 w-full max-w-[280px] mx-auto h-full flex flex-col"
            >
              <Link href={`/product/${mappedProduct.id}`}>
                <img
                  src={mappedProduct.url}
                  alt={mappedProduct.title}
                  className="h-50 w-full object-cover"
                />
              </Link>

              <div className="card-body p-2 flex flex-col gap-2 flex-grow">
                <Link
                  href={`/product/${mappedProduct.id}`}
                  className="card-title text-base font-semibold line-clamp-1"
                >
                  {mappedProduct.title}
                </Link>
                <Link
                  href={`/product/${mappedProduct.id}`}
                  className="text-sm text-gray-500 line-clamp-2 flex-grow"
                >
                  {mappedProduct.description}
                </Link>

                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm text-primary">
                    ₹{mappedProduct.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-[5px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-yellow-400 text-xs ${
                          i < Math.round(mappedProduct.rating)
                            ? "opacity-100"
                            : "opacity-20"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <div className="flex items-center justify-between gap-4">
                    <AddToCartButton product={mappedProduct} />
                    <AddToWishlistButton product={mappedProduct} />
                  </div>

                  <div className="flex">
                    <Link
                      href={`/product/${mappedProduct.id}`}
                      className="px-2 py-1 rounded-md border border-gray-400 
                                 text-gray-700 text-sm font-medium 
                                 hover:bg-gray-900 hover:text-white 
                                 hover:shadow-md hover:scale-105 
                                 transition-transform duration-300"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
