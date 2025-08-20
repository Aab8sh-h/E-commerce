// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { FaHeart, FaShoppingCart, FaHome } from "react-icons/fa";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className="bg-base-200 shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-primary">
        Ecom
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/" className="relative">
          <FaHome size={22} />
        </Link>

        <Link href="/wishlist" className="relative">
          <FaHeart size={22} />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
              {wishlist.length}
            </span>
          )}
        </Link>

        <Link href="/cart" className="relative">
          <FaShoppingCart size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full px-2">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
