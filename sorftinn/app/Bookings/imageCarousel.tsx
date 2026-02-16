// app/Bookings/imageCarousel.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[]; // Now expects array of full URLs
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setImageError(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setImageError(false);
  };

  // If no images
  if (!images || images.length === 0) {
    return (
      <div className="relative h-64 overflow-hidden rounded-t-xl bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative h-64 overflow-hidden rounded-t-xl bg-gray-100">
      {currentImage && !imageError ? (
        <Image
          src={currentImage}
          alt={`Room image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500"
          priority={currentIndex === 0}
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <span className="text-gray-500">
            {imageError ? "Failed to load image" : "No image available"}
          </span>
        </div>
      )}

      {/* arrows - only show if more than one image */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition z-10"
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition z-10"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* dots - show if more than one image */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setImageError(false);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}