// app/rooms/page.tsx
import RoomCard from "./roomCard"; // Import the carousel RoomCard

// Types that match your Django backend
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
};

// Transform Django data to match what RoomCard expects
const transformRoomData = (djangoRoom: DjangoRoom) => {
  return {
    id: Number(djangoRoom.id),
    name: djangoRoom.room_name,
    price: typeof djangoRoom.price_per_night === 'string' 
      ? parseFloat(djangoRoom.price_per_night) 
      : djangoRoom.price_per_night,
    description: `${djangoRoom.room_type} room - Room #${djangoRoom.room_number}`,
    images: djangoRoom.images?.map(img => img.image) || [],
    maxOccupancy: djangoRoom.capacity
  };
};

export default async function RoomsPage() {
  let rooms: DjangoRoom[] = [];
  let error: string | null = null;

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

    // Use GET with query parameters (NOT POST)
    const params = new URLSearchParams({
      check_in: '2026-02-10',
      check_out: '2026-02-12',
    });

    const response = await fetch(`${apiBase}/api/rooms/available/?${params.toString()}`, {
      method: 'GET', // Changed from POST to GET
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      // No body for GET requests
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    rooms = Array.isArray(data) ? data : [];
    
  } catch (err: unknown) {
    console.error('Failed to fetch available rooms:', err);
    error = 'Unable to load available rooms right now. Please try again later.';
  }

  // Transform rooms for the card component
  const transformedRooms = rooms.map(transformRoomData);

  return (
    <section id="rooms" className="bg-gray-950 text-white min-h-screen py-20">
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
            No rooms available for the selected dates.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}