import RoomCard from "./roomCard";
import ImagePreloader from "../components/ImagePreloader";

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
  
  // Validate existing URLs
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      new URL(url);
      return url;
    } catch {
      console.warn('Invalid URL format:', url);
      return '/fallback-room.jpg'; // Fallback image
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
  
  // If no images, add a fallback
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

// OPTION 2: Make searchParams optional
export default async function RoomsPage({
  searchParams,
}: {
  searchParams?: Promise<{ checkIn?: string; checkOut?: string }>
}) {
  // Default dates for homepage display
  let checkIn = '2026-02-10';
  let checkOut = '2026-02-12';
  
  // Only try to use searchParams if they're provided
  if (searchParams) {
    try {
      const resolvedParams = await searchParams;
      checkIn = resolvedParams?.checkIn || checkIn;
      checkOut = resolvedParams?.checkOut || checkOut;
    } catch (error) {
      console.warn('Error reading searchParams:', error);
    }
  }
  
  let rooms: DjangoRoom[] = [];
  let error: string | null = null;

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

    const queryParams = new URLSearchParams({
      check_in: checkIn,
      check_out: checkOut,
    });

    const response = await fetch(`${apiBase}/api/rooms/available/?${queryParams.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    rooms = Array.isArray(data) ? data : [];
    
  } catch (err: unknown) {
    console.error('Failed to fetch rooms:', err);
    error = 'Unable to load rooms. Please try again later.';
  }

  // Transform rooms and sort (available first)
  const transformedRooms = rooms
    .map(transformRoomData)
    .sort((a, b) => {
      if (a.isAvailable && !b.isAvailable) return -1;
      if (!a.isAvailable && b.isAvailable) return 1;
      return 0;
    });
  
  // Collect all images for preloading
  const allImages = transformedRooms.flatMap(room => room.images);

  return (
    <section id="rooms" className="bg-gray-950 text-white min-h-screen py-20">
      <ImagePreloader images={allImages} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase mb-4">
            Rooms & Suites
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {transformedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
        
        {/* Availability Summary */}
        {transformedRooms.length > 0 && (
          <div className="mt-12 text-center text-gray-400 border-t border-gray-800 pt-8">
            <p>
              <span className="inline-block w-3 h-3 bg-emerald-400 rounded-full mr-2"></span>
              {transformedRooms.filter(r => r.isAvailable).length} rooms available
              <span className="mx-4">•</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}