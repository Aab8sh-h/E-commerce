"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import FiltersSidebar from "./FilterSidebar";

type Product = {
  id: number;
  url: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  rating: number;
  category: string;
};

interface SearchProps {
  products: Product[];
}

export default function Search({ products }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const productsPerPage = 12;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedRating(null);
  };

  // filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(debouncedQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesRating =
      selectedRating === null || product.rating >= selectedRating;

    return matchesSearch && matchesCategory && matchesRating;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 h-screen w-60 bg-white shadow-lg z-40 transform transition-transform duration-300
    ${isFiltersOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <FiltersSidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          clearFilters={clearFilters}
        />
      </div>

      {isFiltersOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsFiltersOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-60 p-6">
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-md flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search for products..."
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 
                         shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/30 
                         outline-none transition-all duration-300 text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setIsFiltersOpen(true)}
              className="lg:hidden flex items-center justify-center px-3 py-2 border rounded-md bg-white shadow-sm hover:bg-gray-50"
              aria-label="Open filters"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 disabled:text-gray-400"
            >
              «
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 disabled:text-gray-400"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-white text-black border hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 disabled:text-gray-400"
            >
              ›
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 disabled:text-gray-400"
            >
              »
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
