"use client";

import { useState } from "react";
import { Product } from "@/types/Products";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";

type Props = {
  product: Product;
  initialQuantity?: number;
};

export default function QuantitySelector({
  product,
  initialQuantity = 1,
}: Props) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={decrease}
          disabled={quantity <= 1}
          className={`px-3 py-1 rounded ${
            quantity <= 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          -
        </button>
        <span className="font-medium">{quantity}</span>
        <button
          onClick={increase}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div className="flex gap-4">
        <AddToCartButton product={product} quantity={quantity} />
        <AddToWishlistButton product={product} />
      </div>
    </div>
  );
}
