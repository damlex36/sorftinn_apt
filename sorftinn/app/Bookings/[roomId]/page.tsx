// app/Bookings/[roomId]/page.tsx

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ImageCarousel from '../imageCarousel';

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

export default async function RoomBookingPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const roomId = resolvedParams.roomId;
  const checkInStr = resolvedSearchParams.checkIn;
  const checkOutStr = resolvedSearchParams.checkOut;

  // Validate dates
  if (!checkInStr || !checkOutStr) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Missing dates</h1>
          <Link href="/" className="text-amber-600 hover:underline">
            Go back and select dates
          </Link>
        </div>
      </div>
    );
  }

  const checkIn = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);

  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime()) || checkOut <= checkIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Invalid dates</h1>
          <Link href="/" className="text-amber-600 hover:underline">
            Go back and select dates
          </Link>
        </div>
      </div>
    );
  }

  // Fetch room from Django
  let room: ApiRoom | null = null;

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

    const res = await fetch(`${apiBase}/api/rooms/${roomId}/`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch room: ${res.status}`);
    }

    room = (await res.json()) as ApiRoom;
  } catch (error) {
    console.error('Failed to fetch room:', error);
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Room not found</h1>
          <Link href="/Bookings" className="text-amber-600 hover:underline">
            Back to available rooms
          </Link>
        </div>
      </div>
    );
  }

  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  const price =
    typeof room.price_per_night === 'string'
      ? parseFloat(room.price_per_night)
      : room.price_per_night;

  const totalPrice = nights * price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/Bookings"
            className="flex items-center gap-2 text-gray-700 hover:text-black"
          >
            <ArrowLeft size={20} />
            <span>Back to Rooms</span>
          </Link>
          <div className="text-xl font-semibold">Sorftinn Apartment</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Room Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{room.room_name}</h1>

            <div className="mb-6">
              <ImageCarousel images={room.images.map((img) => img.image)} />
            </div>

            <div className="space-y-4">
              <p className="text-2xl font-bold text-emerald-600">
                ₦{price.toLocaleString()}{' '}
                <span className="text-base font-normal text-gray-600">
                  per night
                </span>
              </p>

              <p className="text-lg">
                <strong>Your stay:</strong>{' '}
                {checkIn.toLocaleDateString()} to{' '}
                {checkOut.toLocaleDateString()} ({nights} night
                {nights !== 1 ? 's' : ''})
              </p>

              <p className="text-2xl font-bold">
                Total: ₦{totalPrice.toLocaleString()}
              </p>

              <p className="text-gray-600">
                {room.description || 'Comfortable and modern room with all amenities.'}
              </p>
            </div>
          </div>

          {/* Booking Form (POSTS DIRECTLY TO DJANGO) */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Your Details</h2>

            <form
              action="http://127.0.0.1:8000/api/bookings/create/"
              method="POST"
              className="space-y-6"
            >
              {/* Hidden fields required by Django */}
              <input type="hidden" name="room" value={roomId} />
              <input type="hidden" name="check_in" value={checkInStr} />
              <input type="hidden" name="check_out" value={checkOutStr} />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Eniola Adebayo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="eniola@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="+2348012345678"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
