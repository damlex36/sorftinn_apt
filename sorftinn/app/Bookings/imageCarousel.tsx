// components/ImageCarousel.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

// Define the allowed image types
type RoomImage = string | { url: string; alt?: string };

interface ImageCarouselProps {
  images: RoomImage[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Helper to safely get src and alt
  const getImageProps = (image: RoomImage) => {
    if (typeof image === "string") {
      return {
        src: image,
        alt: "Room image",
      };
    }

    return {
      src: image.url,
      alt: image.alt || "Room image",
    };
  };

  const { src, alt } = getImageProps(images[currentIndex]);

  return (
    <div className="relative h-64 overflow-hidden rounded-t-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500"
        priority={currentIndex === 0}
      />

      {/* arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
        aria-label="Previous image"
      >
        ‹
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
        aria-label="Next image"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}