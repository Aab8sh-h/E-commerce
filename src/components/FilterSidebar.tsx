"use client";

import React from "react";

type FiltersSidebarProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRating: number | null;
  setSelectedRating: React.Dispatch<React.SetStateAction<number | null>>;
  clearFilters: () => void;
};

const categories = [
  "Tops",
  "Bottoms",
  "Shoes",
  "Bags",
  "Electronics",
  "Accessories",
  "Essential",
  "Stationary",
];

export default function FiltersSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedRating,
  setSelectedRating,
  clearFilters,
}: FiltersSidebarProps) {
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  };

  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-white border-r border-gray-200 shadow-md p-5 overflow-y-auto">
  
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-lg text-gray-800">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="accent-blue-600"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filters */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Rating</h3>
        <div className="flex flex-col gap-3">
          {[2, 3, 4].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800"
            >
              <input
                type="checkbox"
                checked={selectedRating === rating}
                onChange={() => toggleRating(rating)}
                className="accent-blue-600"
              />
              {rating}★ & above
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
