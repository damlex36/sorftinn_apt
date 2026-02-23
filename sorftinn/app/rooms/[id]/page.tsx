import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Home, Calendar, Info } from "lucide-react";
import { notFound } from "next/navigation";

// Types
type RoomImage = {
  id: number;
  image: string;
  caption: string;
};

type RoomComment = {
  id: number;
  comment: string;
  created_at: string;
  formatted_date: string;
};

type DjangoRoom = {
  id: number;
  room_name: string;
  room_number: string;
  room_type: string;
  capacity: number;
  price_per_night: number | string;
  images?: RoomImage[];
  comments?: RoomComment[];
  is_available?: boolean;
};

// Helper to get full Cloudinary URL
const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      new URL(url);
      return url;
    } catch {
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

export default async function RoomDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${apiBase}/api/rooms/${id}/`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch room: ${response.status}`);
    }

    const room: DjangoRoom = await response.json();
    
    // Process images
    const processedImages = room.images
      ?.map(img => getFullImageUrl(img.image))
      .filter(Boolean) || ['/fallback-room.jpg'];

    const price = typeof room.price_per_night === 'string' 
      ? parseFloat(room.price_per_night) 
      : room.price_per_night;

    return (
      <div className="bg-gray-950 text-white min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back button */}
          <Link href="/#rooms" className="inline-flex items-center gap-2 text-amber-400 mb-8 hover:underline group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Rooms
          </Link>

          {/* Room Images Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={processedImages[0]}
                alt={room.room_name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4 h-[200px] md:h-[500px]">
              {processedImages.slice(1, 5).map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden">
                  <Image
                    src={img}
                    alt={`${room.room_name} ${i + 2}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{room.room_name}</h1>
                <p className="text-amber-400 text-xl">₦{price.toLocaleString()} / night</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full">
                  <Home size={18} className="text-amber-400" />
                  <span>Room #{room.room_number}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full">
                  <Users size={18} className="text-amber-400" />
                  <span>Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                  <span className="capitalize">{room.room_type}</span>
                </div>
              </div>

              {/* About This Room - Now displays ONLY comments from backend */}
              <div className="prose prose-invert max-w-none">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="text-amber-400" size={20} />
                  <h2 className="text-2xl font-semibold">About this room</h2>
                </div>
                
                {/* Comments from backend - NO hardcoded text, NO "Additional Notes" subheading */}
                {room.comments && room.comments.length > 0 ? (
                  <div className="space-y-4">
                    {room.comments.map((comment) => (
                      <div 
                        key={comment.id} 
                        className="bg-gray-900/50 rounded-xl p-5 border border-gray-800 hover:border-amber-400/30 transition-all duration-300"
                      >
                        <p className="text-gray-300 leading-relaxed mb-2">
                          {comment.comment}
                        </p>
                        <p className="text-xs text-amber-400/70">
                          {comment.formatted_date}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No information available for this room.</p>
                )}
              </div>

              {/* Amenities */}
              <div className="border-t border-gray-800 pt-6">
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'Safe', 'Coffee Maker', 'Luxury Toiletries'].map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-400">
                      <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Book This Room</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Calendar size={20} className="text-amber-400" />
                    <span>Select dates to check availability</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-400">
                    <Users size={20} className="text-amber-400" />
                    <span>Up to {room.capacity} guests</span>
                  </div>
                </div>

                <Link href={`/Bookings/${room.id}`}>
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                    Check Availability
                  </button>
                </Link>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Free cancellation • No prepayment needed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading room:', error);
    notFound();
  }
}