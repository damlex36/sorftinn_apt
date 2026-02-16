// app/Bookings/[roomId]/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ImageCarousel from '../imageCarousel';           
import BookingForm from './BookingForm';      

type SearchParams = {
  checkIn?: string;
  checkOut?: string;
};

type PageParams = {
  roomId: string;
};

type ApiRoomImage = {
  id: number;
  image: string;
  caption?: string;
};

type ApiRoom = {
  id: number;
  room_name: string;
  price_per_night: number | string;
  capacity: number;
  description?: string | null;
  images: ApiRoomImage[];
};

// Helper to get full Cloudinary URL
const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  
  try {
    // If it's already a complete URL, validate and return it
    if (url.startsWith('http://') || url.startsWith('https://')) {
      new URL(url); // Validate URL
      return url;
    }
    
    // If it's a Cloudinary URL without protocol
    if (url.includes('cloudinary') || url.includes('image/upload')) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'devo42kc9';
      const fullUrl = `https://res.cloudinary.com/${cloudName}/${url}`;
      new URL(fullUrl); // Validate URL
      return fullUrl;
    }
    
    // If it starts with a slash, it's a relative path to your backend
    if (url.startsWith('/')) {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
      const fullUrl = `${apiBase}${url}`;
      new URL(fullUrl); // Validate URL
      return fullUrl;
    }
    
    // Default case - assume it's a Cloudinary path
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'devo42kc9';
    const fullUrl = `https://res.cloudinary.com/${cloudName}/${url}`;
    new URL(fullUrl); // Validate URL
    return fullUrl;
  } catch {
    console.error('Invalid URL:', url);
    return ''; // Return empty string for invalid URLs
  }
};

export default async function RoomBookingPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  // Await params & search params
  const { roomId } = await params;
  const { checkIn, checkOut } = await searchParams;

  const checkInStr  = checkIn;
  const checkOutStr = checkOut;

  // ── Missing dates validation ──
  if (!checkInStr || !checkOutStr) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Missing Check-in / Check-out Dates</h1>
          <p className="text-gray-600 mb-6">
            Please go back and select your stay dates.
          </p>
          <Link
            href="/Bookings"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition"
          >
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  // ── Parse and validate dates ──
  const checkInDate  = new Date(checkInStr);
  const checkOutDate = new Date(checkOutStr);

  if (
    isNaN(checkInDate.getTime()) ||
    isNaN(checkOutDate.getTime()) ||
    checkOutDate <= checkInDate
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Invalid Date Range</h1>
          <p className="text-gray-600 mb-6">
            Check-out must be after check-in. Please select valid dates.
          </p>
          <Link
            href="/Bookings"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition"
          >
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  // ── Fetch room from Django API ──
  let room: ApiRoom | null = null;

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${apiBase}/api/rooms/${roomId}/`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Room fetch failed: ${res.status}`);
    }

    room = (await res.json()) as ApiRoom;
  } catch (error) {
    console.error('Failed to fetch room:', error);
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Room Not Found</h1>
          <p className="text-gray-600 mb-6">
            The selected room could not be found.
          </p>
          <Link
            href="/Bookings"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition"
          >
            Back to Available Rooms
          </Link>
        </div>
      </div>
    );
  }

  // ── Calculate stay duration & total price ──
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const pricePerNight =
    typeof room.price_per_night === 'string'
      ? parseFloat(room.price_per_night)
      : room.price_per_night;

  const totalPrice = nights * pricePerNight;

  // ── Format dates for display ──
  const checkInFormatted  = checkInDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const checkOutFormatted = checkOutDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Process images to get full URLs
  const processedImages = room.images
    .map(img => getFullImageUrl(img.image))
    .filter(Boolean); // Remove any empty strings

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/Bookings"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Rooms</span>
          </Link>
          <div className="text-xl font-semibold">Sorftinn Apartment</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Left Column - Room Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{room.room_name}</h1>
              <p className="text-xl text-emerald-600 font-semibold">
                ₦{pricePerNight.toLocaleString()} <span className="text-base font-normal text-gray-600">per night</span>
              </p>
            </div>

            {/* Carousel - with processed images */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageCarousel images={processedImages} />
            </div>

            {/* Stay summary */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Your Stay</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Check-in:</strong> {checkInFormatted} (from 3:00 PM)
                </p>
                <p>
                  <strong>Check-out:</strong> {checkOutFormatted} (by 11:00 AM)
                </p>
                <p className="font-medium">
                  Duration: {nights} night{nights !== 1 ? 's' : ''}
                </p>
                <div className="pt-4 border-t">
                  <p className="text-2xl font-bold">
                    Total: ₦{totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {room.description || 'Comfortable and modern room with all necessary amenities for a pleasant stay.'}
              </p>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white p-8 rounded-2xl shadow-xl border">
              <h2 className="text-2xl font-bold mb-6">Your Details</h2>

              <BookingForm
                roomId={roomId}
                checkInStr={checkInStr}
                checkOutStr={checkOutStr}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}