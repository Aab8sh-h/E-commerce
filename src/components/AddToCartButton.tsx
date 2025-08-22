"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Products";

type Props = {
  product: Product;
  quantity?: number;
};

export default function AddToCartButton({ product, quantity = 1 }: Props) {
  const { cart, addToCart, removeFromCart } = useCart();

  const inCart = cart.some((item) => item.id === product.id);

  const handleClick = () => {
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.url,
          description: product.description,
          rating: product.rating,
        },
        quantity
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium shadow-sm transition-transform duration-300 w-full sm:w-auto ${
        inCart
          ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-red-400/50 hover:scale-105"
          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-blue-400/50 hover:scale-105"
      }`}
    >
      {inCart ? "Remove 🛒" : "Add to Cart 🛒"}
    </button>
  );
}
