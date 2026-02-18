"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Room {
  id: number;
  name: string;
  price: number;
  description: string | null;
  images: string[];
  maxOccupancy: number;
  isAvailable: boolean;
}

export default function RoomCard({ room }: { room: Room }) {
  const [index, setIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const total = room.images.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  const currentImage = room.images[index];

  return (
    <div className={`group bg-gray-900 rounded-3xl overflow-hidden border ${
      room.isAvailable 
        ? 'border-gray-800 hover:shadow-2xl hover:border-amber-600/50' 
        : 'border-gray-800/50 opacity-75'
    } transition-all duration-500`}>
      
      {/* Carousel with Availability Overlay */}
      <div className="relative aspect-16/11 overflow-hidden bg-gray-800">
        
        {/* UNAVAILABLE BANNER */}
        {!room.isAvailable && (
          <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
            <div className="bg-red-600/90 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wide shadow-lg transform -rotate-12 border-2 border-white/20">
              ⚡ FULLY BOOKED ⚡
            </div>
          </div>
        )}
        
        {/* SOLD OUT Badge */}
        {!room.isAvailable && (
          <div className="absolute top-4 left-4 z-30">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              SOLD OUT
            </span>
          </div>
        )}
      
        {total > 0 && currentImage && !imageError ? (
          <>
            <Image
              src={currentImage}
              alt={room.name}
              fill
              className={`object-cover transition-all duration-700 ${
                !room.isAvailable ? 'grayscale' : ''
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImageError(true)}
              priority={index === 0}
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 ${
              room.isAvailable 
                ? 'bg-gradient-to-t from-black/80 via-black/30 to-transparent' 
                : 'bg-gradient-to-t from-black/90 via-black/60 to-black/30'
            }`} />

            {/* Navigation Controls - only for available rooms */}
            {total > 1 && room.isAvailable && (
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

            {/* Dots Indicator */}
            {total > 1 && room.isAvailable && (
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

        {/* Price Tag */}
        <div className={`absolute top-4 right-4 ${
          room.isAvailable 
            ? 'bg-black/70 backdrop-blur-md' 
            : 'bg-gray-800/90'
        } px-4 py-1.5 rounded-full text-sm border border-white/10 z-10`}>
          ₦{Math.round(room.price).toLocaleString()} / night
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col min-h-[220px]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-light tracking-wide">{room.name}</h3>
          {!room.isAvailable && (
            <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full">
              Unavailable
            </span>
          )}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
          {room.description || "A luxurious space designed for rest, privacy, and comfort."}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              room.isAvailable ? 'bg-emerald-400' : 'bg-gray-500'
            }`} />
            Up to {room.maxOccupancy} guest{room.maxOccupancy !== 1 ? "s" : ""}
          </div>

          {room.isAvailable ? (
            <Link href={`/Bookings/${room.id}?checkIn=2026-02-10&checkOut=2026-02-12`}>
              <button className="text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition">
                View Details
              </button>
            </Link>
          ) : (
            <button 
              disabled
              className="text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-gray-700 text-gray-600 cursor-not-allowed"
            >
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}