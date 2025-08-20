"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Products";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const { cart, addToCart, removeFromCart } = useCart();

  const inCart = cart.some((item) => item.id === product.id);

  return (
    <button
      onClick={() =>
        inCart
          ? removeFromCart(product.id)
          : addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.url,
              description: product.description,
              rating: product.rating,
            })
      }
      className={`px-2 py-1 rounded-lg text-s font-medium shadow-sm transition-transform duration-300 ${
        inCart
          ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-red-400/50 hover:scale-105"
          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-blue-400/50 hover:scale-105"
      }`}
    >
      {inCart ? "Remove🛒" : "Add to Cart🛒"}
    </button>
  );
}
