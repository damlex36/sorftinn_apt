import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Home, Calendar, Wifi, Wind, Tv, Coffee, Utensils, Shield, Droplet, Star, MapPin, Clock, Phone, Mail, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

// Types
type RoomImage = { id: number; image: string; caption: string; };
type RoomComment = { id: number; comment: string; created_at: string; formatted_date: string; };
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

// getFullImageUrl unchanged
const getFullImageUrl = (url: string): string => {
  if (!url) return '/fallback-room.jpg';
  if (url.startsWith('http')) {
    try { new URL(url); return url; } catch { return '/fallback-room.jpg'; }
  }
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'devo42kc9';
  if (url.includes('cloudinary') || url.includes('image/upload')) {
    return `https://res.cloudinary.com/${cloudName}/${url}`;
  }
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
  return url.startsWith('/') ? `${apiBase}${url}` : `https://res.cloudinary.com/${cloudName}/${url}`;
};

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${apiBase}/api/rooms/${id}/`, { cache: 'no-store' });

    if (!response.ok) {
      if (response.status === 404) notFound();
      throw new Error(`Failed to fetch room: ${response.status}`);
    }

    const room: DjangoRoom = await response.json();
    const processedImages = room.images?.map(img => getFullImageUrl(img.image)).filter(Boolean) || ['/fallback-room.jpg'];
    const price = typeof room.price_per_night === 'string' ? parseFloat(room.price_per_night) : room.price_per_night;

    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 font-sans antialiased transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Back Link */}
          <Link
            href="/#rooms"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-10 group transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to all rooms
          </Link>

          {/* Hero Section with Image and Title */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-orange-500/10 dark:from-blue-500/5 dark:to-orange-500/5 rounded-3xl -m-4" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Luxury Collection</span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                  {room.room_name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                  Experience unparalleled luxury in our meticulously designed space.
                </p>
              </div>
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Starting from</p>
                  <p className="text-5xl font-bold text-orange-600 dark:text-orange-400">
                    ₦{price.toLocaleString()}
                    <span className="text-xl font-normal text-gray-500 dark:text-gray-500 align-middle ml-2">/ night</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-[16/9] lg:aspect-[5/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800">
                  <Image
                    src={processedImages[0]}
                    alt={room.room_name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {processedImages.length > 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {processedImages.slice(1, 5).map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group ring-1 ring-gray-200 dark:ring-gray-800"
                      >
                        <Image
                          src={img}
                          alt={`${room.room_name} view ${i + 2}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Room Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <Home className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Room Number</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">#{room.room_number}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Up to {room.capacity} guests</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <div className="w-5 h-5 bg-orange-500 rounded-full mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Room Type</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{room.room_type}</p>
                </div>
              </div>

              {/* Description / Comments */}
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-6">
                  About this room
                </h2>

                {room.comments && room.comments.length > 0 ? (
                  <div className="space-y-6 not-prose">
                    {room.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-7 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
                      >
                        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-4 text-[15.5px]">
                          {comment.comment}
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {comment.formatted_date}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic text-lg">
                    Experience luxury and comfort in our beautifully appointed {room.room_type} room.
                    Perfect for {room.capacity === 1 ? 'solo travelers' : 
                    room.capacity === 2 ? 'couples' : 
                    'families and groups'}.
                  </p>
                )}
              </div>

              {/* Amenities */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-8">
                  Premium Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[
                    { icon: Wifi, label: "High-Speed WiFi", color: "blue" },
                    { icon: Wind, label: "Climate Control", color: "blue" },
                    { icon: Tv, label: "65\" Smart TV", color: "blue" },
                    { icon: Coffee, label: "Nespresso Machine", color: "blue" },
                    { icon: Utensils, label: "Mini Bar", color: "orange" },
                    { icon: Shield, label: "Electronic Safe", color: "blue" },
                    { icon: Droplet, label: "Rain Shower", color: "blue" },
                    { icon: Users, label: "24/7 Concierge", color: "orange" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-800 dark:text-gray-300 group hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                      <item.icon size={20} className={`text-${item.color}-600 dark:text-${item.color}-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">Free cancellation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">No prepayment needed</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">Best price guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">Secure booking</span>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-8 lg:sticky lg:top-8">
                <h3 className="text-3xl font-serif font-semibold text-gray-900 dark:text-white mb-8">
                  Reserve Your Stay
                </h3>

                <div className="space-y-8 mb-10">
                  <div className="flex items-start gap-5 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <Calendar size={24} className="text-orange-600 dark:text-orange-400 mt-1" />
                    <div>
                      <p className="font-semibold text-lg text-gray-900 dark:text-white">Choose your dates</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">Check availability & rates</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <Users size={24} className="text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <p className="font-semibold text-lg text-gray-900 dark:text-white">Up to {room.capacity} guests</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">Maximum occupancy</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total for your stay</p>
                    <p className="text-5xl font-bold text-orange-600 dark:text-orange-400">
                      ₦{price.toLocaleString()}
                      <span className="text-xl font-normal text-gray-600 dark:text-gray-500 align-middle ml-3">/ night</span>
                    </p>
                  </div>
                </div>

                <Link href={`/Bookings/${room.id}`}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white py-5 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-200/50 dark:shadow-blue-900/30">
                    Check Availability
                  </button>
                </Link>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Prime city center location</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span>24/7 guest support</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Secure & encrypted booking</span>
                </div>
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