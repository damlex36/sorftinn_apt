"use client";

import RoomCard from "./roomCard";
import ImagePreloader from "../components/ImagePreloader";
import { useEffect, useState } from "react";

// Types
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

// Helper to get full Cloudinary URL with error handling
const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      new URL(url);
      return url;
    } catch {
      console.warn('Invalid URL format:', url);
      return '/fallback-room.jpg';
    }
  }
  
  if (url.includes('cloudinary') || url.includes('image/upload')) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'devo42kc9';
    return `https://res.cloudinary.com/${cloudName}/${url}`;
  }
  
  if (url.startsWith('/')) {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
    return `${apiBase}${url}`;
  }
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'devo42kc9';
  return `https://res.cloudinary.com/${cloudName}/${url}`;
};

// Transform Django data
const transformRoomData = (djangoRoom: DjangoRoom) => {
  const processedImages = djangoRoom.images
    ?.map(img => getFullImageUrl(img.image))
    .filter(Boolean) || [];
  
  if (processedImages.length === 0) {
    processedImages.push('/fallback-room.jpg');
  }
  
  return {
    id: Number(djangoRoom.id),
    name: djangoRoom.room_name,
    price: typeof djangoRoom.price_per_night === 'string' 
      ? parseFloat(djangoRoom.price_per_night) 
      : djangoRoom.price_per_night,
    description: `${djangoRoom.room_type} room - Room #${djangoRoom.room_number}`,
    images: processedImages,
    maxOccupancy: djangoRoom.capacity,
    isAvailable: djangoRoom.is_available ?? true
  };
};

export default function RoomsPage({
  searchParams,
}: {
  searchParams?: Promise<{ checkIn?: string; checkOut?: string }>
}) {
  const [rooms, setRooms] = useState<DjangoRoom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let checkIn = '2026-02-10';
        let checkOut = '2026-02-12';
        
        if (searchParams) {
          try {
            const resolvedParams = await searchParams;
            checkIn = resolvedParams?.checkIn || checkIn;
            checkOut = resolvedParams?.checkOut || checkOut;
          } catch (error) {
            console.warn('Error reading searchParams:', error);
          }
        }
        
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

        const queryParams = new URLSearchParams({
          check_in: checkIn,
          check_out: checkOut,
        });

        const response = await fetch(`${apiBase}/api/rooms/available/?${queryParams.toString()}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setRooms(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        console.error('Failed to fetch rooms:', err);
        setError('Unable to load rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
  }, [searchParams]);

  const transformedRooms = rooms
    .map(transformRoomData)
    .sort((a, b) => {
      if (a.isAvailable && !b.isAvailable) return -1;
      if (!a.isAvailable && b.isAvailable) return 1;
      return 0;
    });
  
  const allImages = transformedRooms.flatMap(room => room.images);

  if (loading) {
    return (
      <section id="rooms" className="bg-gray-950 text-white min-h-screen py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-widest uppercase mb-3 sm:mb-4">
              Rooms & Suites
            </h1>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4">
              Loading amazing rooms for you...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rooms" className="bg-gray-950 text-white min-h-screen py-12 sm:py-20">
      <ImagePreloader images={allImages} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-widest uppercase mb-3 sm:mb-4">
            Rooms & Suites
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4">
            Discover refined comfort and timeless elegance in our carefully curated collection of rooms and suites.
          </p>
        </div>

        {error && (
          <div className="text-center text-red-400 py-10 text-xl font-medium">
            {error}
          </div>
        )}

        {transformedRooms.length === 0 && !error ? (
          <div className="text-center text-gray-400 py-20 text-xl">
            No rooms found.
          </div>
        ) : (
          <>
            {/* Mobile: Horizontal Scroll Carousel */}
            <div className="block sm:hidden">
              <div className="flex overflow-x-auto gap-4 pb-6 px-4 -mx-4 snap-x snap-mandatory scrollbar-hide">
                {transformedRooms.map((room) => (
                  <div 
                    key={room.id} 
                    className="flex-none w-[85%] snap-center first:ml-0 last:mr-4"
                  >
                    <RoomCard room={room} />
                  </div>
                ))}
              </div>
              
              {/* Scroll indicator dots */}
              <div className="flex justify-center gap-2 mt-2 sm:hidden">
                {transformedRooms.map((_, i) => (
                  <div 
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === 0 ? 'w-4 bg-amber-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              {/* Hint text */}
              <p className="text-center text-xs text-gray-500 mt-2 sm:hidden">
                ← Swipe to see more rooms →
              </p>
            </div>

            {/* Tablet/Desktop: Grid Layout */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
              {transformedRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </>
        )}
        
        {/* Availability Summary */}
        {transformedRooms.length > 0 && (
          <div className="mt-8 sm:mt-12 text-center text-gray-400 border-t border-gray-800 pt-6 sm:pt-8">
            <p className="text-sm sm:text-base">
              <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full mr-1 sm:mr-2"></span>
              {transformedRooms.filter(r => r.isAvailable).length} rooms available
              <span className="mx-2 sm:mx-4">•</span>
              <span className="text-xs sm:text-sm text-gray-500">
                Swipe to browse all rooms
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Add custom scrollbar hiding styles with regular CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}