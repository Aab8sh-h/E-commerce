import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata: Metadata = {
  title: "Ecom",
  description: "A simple e-commerce platform built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body className="min-h-screen bg-base-100 text-base-content">
        <CartProvider>
          <WishlistProvider>
            <Navbar />

            <main className="container mx-auto p-4">{children}</main>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
