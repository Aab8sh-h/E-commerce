"use client";

import Link from "next/link";
import { Product } from "@/types/Products";
import AddToWishlistButton from "./AddToWishlistButton";

type Props = {
  product: Product;
  className?: string;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300 w-full max-w-sx mx-auto relative">
      <figure>
        <img
          src={product.url}
          alt={product.title}
          className="h-50 w-full object-cover sm:h-52 md:h-56"
        />
      </figure>

      <div className="card-body p-4   relative">
        <h2 className="card-title text-base font-semibold line-clamp-1">
          {product.title}
        </h2>
        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-sm text-primary">
            ₹{product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-yellow-400 text-xs ${
                  i < Math.round(product.rating) ? "opacity-100" : "opacity-30"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <Link
            href={`/product/${product.id}`}
            className="px-2 py-1 rounded-md border border-gray-400 
               text-gray-700 text-sm font-medium 
               hover:bg-gray-900 hover:text-white 
               hover:shadow-md hover:scale-105 
               transition-transform duration-300"
          >
            View More
          </Link>

          <AddToWishlistButton product={product} />
        </div>
      </div>
    </div>
  );
}
