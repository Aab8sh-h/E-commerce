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
    <div
      className="card bg-base-100 shadow-md rounded-lg overflow-hidden 
                 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 
                 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm mx-auto relative"
    >
      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <img
          src={product.url}
          alt={product.title}
          className="h-40 w-full object-cover sm:h-48 md:h-56"
        />
      </Link>

      {/* Card body */}
      <div className="card-body p-3 sm:p-4 relative">
        <Link
          href={`/product/${product.id}`}
          className="card-title text-sm sm:text-base font-semibold line-clamp-1"
        >
          {product.title}
        </Link>
        <Link
          href={`/product/${product.id}`}
          className="text-xs sm:text-sm text-gray-500 line-clamp-2"
        >
          {product.description}
        </Link>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-sm sm:text-base text-primary">
            ₹{product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-0.5 sm:gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-yellow-400 text-xs sm:text-sm ${
                  i < Math.round(product.rating) ? "opacity-100" : "opacity-30"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex justify-between items-center gap-2">
          <Link
            href={`/product/${product.id}`}
            className="px-2 sm:px-3 py-1 rounded-md border border-gray-400 
                       text-gray-700 text-xs sm:text-sm font-medium 
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
