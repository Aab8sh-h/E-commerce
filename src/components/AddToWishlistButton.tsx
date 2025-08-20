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
      className={`px-3 py-1.5 text-sm rounded-lg font-medium shadow-md transition-transform duration-300
        ${
          inWishlist
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-pink-500 hover:bg-pink-600 text-white"
        }`}
    >
      {inWishlist ? "🤍" : "💗"}
    </button>
  );
}
