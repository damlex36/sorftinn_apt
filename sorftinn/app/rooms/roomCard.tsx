"use client";

import { useState } from "react";
import Image from "next/image";

interface Room {
  id: number;
  name: string;
  price: number;
  description: string | null;
  images: string[]; // Now contains full URLs
  maxOccupancy: number;
}

export default function RoomCard({ room }: { room: Room }) {
  const [index, setIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const total = room.images.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  const currentImage = room.images[index];

  return (
    <div className="group bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500">
      
      {/* Carousel */}
      <div className="relative aspect-16/11 overflow-hidden bg-gray-800">
      
        {total > 0 && currentImage && !imageError ? (
          <>
            <Image
              src={currentImage}
              alt={room.name}
              fill
              className="object-cover transition-all duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImageError(true)}
              priority={index === 0}
              // Remove unoptimized if not needed
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Controls */}
            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur text-white w-8 h-8 rounded-full hover:bg-black/70 transition z-10"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur text-white w-8 h-8 rounded-full hover:bg-black/70 transition z-10"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}

            {/* Dots */}
            {total > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {room.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition ${
                      i === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500">
            {imageError ? "Failed to load image" : "No image available"}
          </div>
        )}

        {/* Price */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-sm border border-white/10 z-10">
          ₦{Math.round(room.price).toLocaleString()} / night
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col min-h-[220px]">
        <h3 className="text-xl font-light tracking-wide mb-2">{room.name}</h3>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
          {room.description || "A luxurious space designed for rest, privacy, and comfort."}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Up to {room.maxOccupancy} guest{room.maxOccupancy !== 1 ? "s" : ""}
          </div>

          <button className="text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}