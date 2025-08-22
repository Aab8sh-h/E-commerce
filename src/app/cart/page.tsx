"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getSubtotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-2xl font-semibold text-gray-600">
          🛒 Your cart is empty
        </p>
        <Link
          href="/"
          className="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-base-200 min-h-screen px-6 py-10">
      <h2 className="text-2xl font-bold mb-8 text-center text-base-content">
        Your Cart
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="md:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-base-100 shadow rounded-lg overflow-hidden p-4 gap-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
              />

              <div className="flex flex-col flex-grow gap-2">
                <Link
                  href={`/product/${item.id}`}
                  className="font-semibold text-base hover:text-primary"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-gray-500">
                  ₹{item.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p className="font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-base-100 shadow-lg rounded-lg p-6 h-fit sticky top-24 flex flex-col gap-4">
          <h3 className="text-lg font-semibold border-b border-gray-300 pb-2">
            Order Summary
          </h3>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{getSubtotal().toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="text-gray-500">Calculated at checkout</span>
          </div>

          <div className="flex justify-between text-base font-bold border-t border-gray-300 pt-2">
            <span>Total</span>
            <span>₹{getSubtotal().toFixed(2)}</span>
          </div>

          <button
            onClick={clearCart}
            className="mt-4 px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
          >
            Clear Cart
          </button>

          <button
            onClick={() => alert("Checkout flow not implemented yet!")}
            className="mt-2 px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Proceed to Checkout
          </button>

          <Link
            href="/"
            className="mt-2 text-sm text-primary hover:underline text-center"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
