// app/Bookings/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ImageCarousel from './imageCarousel'; // adjust path if needed

// Type for images (matches your ImageCarousel component)
type RoomImage = string | { url: string; alt?: string };

// Shape of room from your Django API (adjust field names if different)
type ApiRoom = {
  id: number;
  room_name: string;
  room_number?: string;
  room_type?: string;
  capacity: number;
  price_per_night: number | string;
  description?: string | null;
  images: Array<{ id: number; image: string; caption?: string }> | string[];
};

// UI-friendly Room type
interface Room {
  id: number;
  name: string;
  price: number;
  description: string | null;
  images: string[];           // flattened to string[]
  maxOccupancy: number;
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ checkIn?: string; checkOut?: string }>;
}) {
  const params = await searchParams;

  const checkInStr = params.checkIn;
  const checkOutStr = params.checkOut;

  let checkIn: Date | null = null;
  let checkOut: Date | null = null;

  if (checkInStr && checkOutStr) {
    checkIn = new Date(checkInStr);
    checkOut = new Date(checkOutStr);
  }

  // Invalid or missing dates
  if (!checkIn || !checkOut || isNaN(checkIn.getTime()) || isNaN(checkOut.getTime()) || checkOut <= checkIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Invalid or missing dates</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Please go back and select valid check-in and check-out dates.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    );
  }

  // Calculate nights
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

  // Format dates nicely
  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  let availableRooms: Room[] = [];
  let error: string | null = null;

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

    const response = await fetch(`${apiBase}/api/rooms/available/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // always fresh availability
      body: JSON.stringify({
        check_in: checkInStr,
        check_out: checkOutStr,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch available rooms: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Handle array or { results: [...] } pattern (common in DRF pagination)
    const rawRooms: ApiRoom[] = Array.isArray(data) ? data : data.results || data.data || [];

    // Map to UI-friendly Room type
    availableRooms = rawRooms.map((r: ApiRoom) => ({
      id: r.id,
      name: r.room_name,
      price: typeof r.price_per_night === 'string' ? parseFloat(r.price_per_night) : r.price_per_night,
      description: r.description || null,
      images: Array.isArray(r.images)
        ? r.images.map(img =>
            typeof img === 'string' ? img : img.image || ''
          ).filter(Boolean)
        : [],
      maxOccupancy: r.capacity,
    }));

  } catch (err: unknown) {
    console.error('Failed to fetch available rooms:', err);
    error = 'Unable to load available rooms right now. Please try again later.';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-700 hover:text-black transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="text-xl font-semibold text-gray-900">Sorftinn Apartment</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Available Rooms
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            For your stay from <strong>{formatDate(checkIn)}</strong> to{' '}
            <strong>{formatDate(checkOut)}</strong> ({nights} night{nights !== 1 ? 's' : ''})
          </p>
        </div>

        {error ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition"
            >
              <ArrowLeft size={20} />
              Change Dates
            </Link>
          </div>
        ) : availableRooms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No rooms available for these dates
            </h2>
            <p className="text-gray-500 mb-6">
              Try adjusting your dates or check back later.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition"
            >
              <ArrowLeft size={20} />
              Change Dates
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {availableRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-amber-200 transition-all duration-300 flex flex-col"
              >
                {/* Carousel – now using real images */}
                <ImageCarousel images={room.images} />

                <div className="p-6 flex flex-col grow">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-emerald-600">
                        ₦{Math.round(room.price).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 block">per night</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">
                      Max guests: {room.maxOccupancy}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>

                  {room.description && (
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {room.description}
                    </p>
                  )}

                  <div className="mt-auto">
                    <Link
                      href={`/Bookings/${room.id}?checkIn=${checkInStr}&checkOut=${checkOutStr}`}
                      className="block w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-medium text-center transition-colors"
                    >
                      Select & Book Room
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}