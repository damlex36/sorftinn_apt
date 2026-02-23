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
      whileHover={{ y: -6 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-[620px] flex flex-col"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={room.images[index]}
          alt={room.name}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 380px" 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-orange-500 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-orange-500 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Price */}
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow border border-orange-500">
          <span className="font-bold text-orange-500">
            ₦{room.price.toLocaleString()}
          </span>
        </div>

        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow flex items-center gap-1">
          <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
          <span className="text-xs font-medium">4.9</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
          {room.name}
        </h3>

        <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
          <Users className="w-4 h-4 text-orange-500" />
          {room.maxOccupancy} guests
          <Home className="w-4 h-4 text-orange-500 ml-4" />
          Room
        </div>

        <p className="text-gray-600 text-sm flex-1 mb-4">
          {room.description}
        </p>

        <Link href={`/rooms/${room.id}`}>
          <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md">
            View Details & Book
          </button>
        </Link>
      </div>
    </motion.div>
  );
}