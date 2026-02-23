"use client";

import RoomCard from "./roomCard";
import ImagePreloader from "../components/ImagePreloader";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

/* ---------- TYPES ---------- */

type RoomImage = {
  id: number;
  image: string;
  caption: string;
};

type DjangoRoom = {
  id: number | string;
  room_name: string;
  room_number: string;
  room_type: string;
  capacity: number;
  price_per_night: number | string;
  images?: RoomImage[];
  is_available?: boolean;
};

/* ---------- HELPERS ---------- */

const getFullImageUrl = (url: string): string => {
  if (!url) return "";

  if (url.startsWith("http")) return url;

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "devo42kc9";

  if (url.startsWith("/")) {
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
    return `${apiBase}${url}`;
  }

  return `https://res.cloudinary.com/${cloudName}/${url}`;
};

const transformRoomData = (djangoRoom: DjangoRoom) => {
  const processedImages =
    djangoRoom.images?.map((img) => getFullImageUrl(img.image)) || [];

  if (processedImages.length === 0) {
    processedImages.push("/fallback-room.jpg");
  }

  return {
    id: Number(djangoRoom.id),
    name: djangoRoom.room_name,
    price:
      typeof djangoRoom.price_per_night === "string"
        ? parseFloat(djangoRoom.price_per_night)
        : djangoRoom.price_per_night,
    description: `${djangoRoom.room_type} room - Room #${djangoRoom.room_number}`,
    images: processedImages,
    maxOccupancy: djangoRoom.capacity,
    isAvailable: djangoRoom.is_available ?? true,
  };
};

/* ---------- COMPONENT ---------- */

export default function RoomsPage({
  searchParams,
}: {
  searchParams?: Promise<{ checkIn?: string; checkOut?: string }>;
}) {
  const [rooms, setRooms] = useState<DjangoRoom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

        const response = await fetch(
          `${apiBase}/api/rooms/available/`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setRooms(Array.isArray(data) ? data : []);
      } catch {
        setError("Unable to load rooms.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const transformedRooms = rooms.map(transformRoomData);
  const allImages = transformedRooms.flatMap((r) => r.images);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 420;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section className="bg-white py-20 overflow-hidden">
      <ImagePreloader images={allImages} />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-600">
              Luxury Collection
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Rooms & Suites
          </h2>

          <p className="text-gray-600 text-lg">
            Discover refined comfort and timeless elegance in our
            curated selection of premium rooms.
          </p>
        </div>

        {error && (
          <div className="text-center text-red-500 py-8 bg-red-50 rounded-xl">
            {error}
          </div>
        )}

        {/* Scroll Area */}
        <div className="relative">
          {/* Arrows (Fixed inside container) */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-xl items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white rounded-full shadow-xl items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
          >
            {transformedRooms.map((room) => (
              <div
                key={room.id}
                className="flex-none w-[320px] md:w-[400px] snap-start"
              >
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}