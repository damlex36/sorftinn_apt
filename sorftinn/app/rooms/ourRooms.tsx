// app/rooms/page.tsx
import Image from 'next/image';

// Django RoomModel + RoomImage shape (USED DIRECTLY)
type RoomImage = {
  id: number;
  image: string;
  caption: string;
};

type Room = {
  id: number | string;
  room_name: string;
  room_number: string;
  room_type: string;
  capacity: number;
  price_per_night: number | string;
  images?: RoomImage[];
};

function RoomCard({ room }: { room: Room }) {
  const {
    room_name,
    room_number,
    room_type,
    capacity,
    price_per_night,
    images,
  } = room;

  const displayPrice =
    typeof price_per_night === 'string'
      ? parseFloat(price_per_night)
      : price_per_night;

  const mainImage =
    images?.[0]?.image ||
    'https://images.unsplash.com/photo-1578683015146-b644c6a0ec6f?w=800';

  return (
    <div className="group bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={mainImage}
          alt={room_name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMjIiLz48L3N2Zz4="
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          {room_name}
        </h3>

        <p className="text-gray-400 text-sm mb-5 line-clamp-3 min-h-[4.5rem]">
          Room #{room_number} – {room_type}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">
              ₦{isNaN(displayPrice) ? '—' : displayPrice.toFixed(2)}
            </span>
            <span className="text-gray-500 text-sm"> / night</span>
          </div>

          <div className="flex items-center text-gray-400 text-sm">
            <span>↑ {capacity}</span>
            <span className="ml-1">guests</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function RoomsPage() {
  let rooms: Room[] = [];
  let error: string | null = null;

  try {
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

    const response = await fetch(`${apiBase}/api/rooms/available/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        check_in: '2026-02-10',
        check_out: '2026-02-12',
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // ✅ DIRECT USE — matches Django serializer fields
    rooms = Array.isArray(data) ? data : [];
  } catch (err: unknown) {
    console.error('Failed to fetch available rooms:', err);
    error = 'Unable to load available rooms right now. Please try again later.';
  }

  return (
    <section className="bg-gray-950 text-white min-h-screen py-20">
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

        {rooms.length === 0 && !error ? (
          <div className="text-center text-gray-400 py-20 text-xl">
            No rooms available for the selected dates.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
