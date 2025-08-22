"use client";

import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types/Products";

type Props = {
  product: Product;
};

export default function AddToWishlistButton({ product }: Props) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <button
      onClick={() =>
        inWishlist
          ? removeFromWishlist(product.id)
          : addToWishlist({
              id: product.id,
              title: product.title,
              price: product.price,
              url: product.url,
              description: product.description,
              longDescription: product.longDescription,
              rating: product.rating,
            })
      }
      className={`px-2 sm:px-3 py-1 sm:py-1.5 text-base sm:text-sm rounded-lg font-medium shadow-md transition-transform duration-300
        ${
          inWishlist
            ? "bg-pink-100 text-pink-600 hover:bg-pink-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      {inWishlist ? "💗" : "🩶"}
    </button>
  );
}
