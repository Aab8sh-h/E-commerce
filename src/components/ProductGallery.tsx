"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  /* Auto */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative group w-full max-w-md mx-auto">
      {/* container */}
      <div className="relative w-full h-[450px] sm:h-[200px] md:h-[300px] flex items-center justify-center bg-gray-50 rounded-xl shadow-lg overflow-hidden">
        <img
          src={images[current]}
          alt={`Product image ${current + 1}`}
          className="max-h-full max-w-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
        />

        {/* Left arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 -translate-y-1/2 
                      p-3 rounded-full shadow-lg 
                      hover:scale-110 
                     transition-all opacity-0 group-hover:opacity-100"
        >
          <FaChevronLeft className="text-gray-700" size={20} />
        </button>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 -translate-y-1/2 
                      p-3 rounded-full shadow-lg 
                      hover:scale-110 
                     transition-all opacity-0 group-hover:opacity-100"
        >
          <FaChevronRight className="text-gray-700" size={20} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3 justify-center ">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`w-14 h-10 sm:w-16 sm:h-12 object-contain bg-gray-100 rounded-md cursor-pointer border-2 transition-transform hover:scale-105 ${
              current === index ? "border-blue-500" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
