"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Home,
  ChevronLeft,
  ChevronRight,
  Star,
  Wifi,
  Tv,
  Coffee,
  Snowflake,
} from "lucide-react";

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
  const total = room.images.length;

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev + 1) % total);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={room.images[index]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* carousel arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-orange-500 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-orange-500 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* price */}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow border border-orange-500 text-sm font-semibold text-orange-500">
          ₦{room.price.toLocaleString()}
          <span className="text-gray-500 text-xs"> / night</span>
        </div>

        {/* rating */}
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full shadow flex items-center gap-1 text-xs">
          <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
          4.9
        </div>

        {/* availability badge */}
        <div className="absolute bottom-3 left-3">
          {room.isAvailable ? (
            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
              Available
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              Fully Booked
            </span>
          )}
        </div>
      </div>

   {/* CONTENT */}
<div className="p-5 flex flex-col flex-1 justify-between">
  
  {/* Top Section */}
  <div>
    <div className="flex items-start justify-between">
      <h3 className="text-lg font-semibold group-hover:text-orange-500 transition">
        {room.name}
      </h3>

      <span className="text-right">
        <p className="text-sm text-gray-500">From</p>
        <p className="text-lg font-bold text-orange-500">
          ₦{room.price.toLocaleString()}
        </p>
      </span>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-orange-500" />
        {room.maxOccupancy} Guests
      </div>

      <div className="flex items-center gap-2">
        <Home className="w-4 h-4 text-orange-500" />
        Deluxe Room
      </div>

      <div className="flex items-center gap-2">
        <Wifi className="w-4 h-4 text-gray-500" />
        Free WiFi
      </div>

      <div className="flex items-center gap-2">
        <Snowflake className="w-4 h-4 text-gray-500" />
        Air Conditioning
      </div>
    </div>

    <p className="text-gray-600 text-sm mt-4 line-clamp-2">
      {room.description}
    </p>
  </div>

  {/* Bottom Section */}
  <div className="mt-6 flex items-center justify-between">
    {room.isAvailable ? (
      <span className="text-green-600 text-sm font-medium">
        ● Available
      </span>
    ) : (
      <span className="text-red-600 text-sm font-medium">
        ● Fully Booked
      </span>
    )}

    <Link href={`/rooms/${room.id}`}>
      <button className="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition">
        View Details
      </button>
    </Link>
  </div>
</div>
    </motion.div>
  );
}