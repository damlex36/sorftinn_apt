import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Utensils,
  Shield,
  Droplet,
} from "lucide-react";
import { notFound } from "next/navigation";

/* ---------- TYPES ---------- */

type RoomImage = { id: number; image: string; caption: string };
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

/* ---------- IMAGE HELPER ---------- */

const getFullImageUrl = (url: string): string => {
  if (!url) return "/fallback-room.jpg";

  if (url.startsWith("http")) return url;

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "devo42kc9";

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

  if (url.startsWith("/")) return `${apiBase}${url}`;

  return `https://res.cloudinary.com/${cloudName}/${url}`;
};

/* ---------- PAGE ---------- */

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

    const response = await fetch(`${apiBase}/api/rooms/${id}/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) notFound();
      throw new Error("Failed to fetch room");
    }

    const room: DjangoRoom = await response.json();

    const images =
      room.images?.map((img) => getFullImageUrl(img.image)) || [
        "/fallback-room.jpg",
      ];

    const price =
      typeof room.price_per_night === "string"
        ? parseFloat(room.price_per_night)
        : room.price_per_night;

    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* BACK */}
          <Link
            href="/#rooms"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-10"
          >
            <ArrowLeft size={18} />
            Back to rooms
          </Link>

          {/* HERO IMAGE */}
          <div className="relative h-[60vh] min-h-[420px] rounded-3xl overflow-hidden shadow-xl mb-16">
            <Image
              src={images[0]}
              alt={room.room_name}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute bottom-10 left-10 text-white max-w-xl">
              <p className="uppercase tracking-widest text-sm opacity-80 mb-3">
                Luxury Room
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                {room.room_name}
              </h1>

              <p className="text-lg opacity-90">
                Refined comfort designed for unforgettable stays.
              </p>
            </div>

            <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl shadow-xl">
              <p className="text-sm text-gray-500">From</p>
              <p className="text-3xl font-bold text-orange-600">
                ₦{price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">per night</p>
            </div>
          </div>

          {/* LAYOUT */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-2">
              {/* SUMMARY STRIP */}
              <div className="flex flex-wrap gap-10 border-y py-8 mb-14 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-semibold text-lg">
                    {room.capacity}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Room Type</p>
                  <p className="font-semibold text-lg capitalize">
                    {room.room_type}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Room No.</p>
                  <p className="font-semibold text-lg">
                    #{room.room_number}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p
                    className={`font-semibold text-lg ${
                      room.is_available
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {room.is_available
                      ? "Available"
                      : "Booked"}
                  </p>
                </div>
              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-4 mb-16">
                  {images.slice(1, 4).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt="room view"
                        fill
                        className="object-cover hover:scale-110 transition duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ABOUT */}
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">
                  About this room
                </h2>

                {room.comments?.length ? (
                  <div className="space-y-5 text-gray-700 leading-relaxed">
                    {room.comments.map((c) => (
                      <p key={c.id}>{c.comment}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    Enjoy a luxurious stay in our beautifully designed{" "}
                    {room.room_type} room. Perfect for{" "}
                    {room.capacity === 1
                      ? "solo travelers"
                      : room.capacity === 2
                      ? "couples"
                      : "families and groups"}{" "}
                    seeking comfort, tranquility, and modern elegance.
                  </p>
                )}
              </div>

              {/* AMENITIES */}
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-8">
                  Amenities
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6 text-gray-700">
                  <div className="flex items-center gap-3"><Wifi /> Free WiFi</div>
                  <div className="flex items-center gap-3"><Wind /> Air Conditioning</div>
                  <div className="flex items-center gap-3"><Tv /> Smart TV</div>
                  <div className="flex items-center gap-3"><Coffee /> Coffee Machine</div>
                  <div className="flex items-center gap-3"><Utensils /> Mini Bar</div>
                  <div className="flex items-center gap-3"><Droplet /> Rain Shower</div>
                  <div className="flex items-center gap-3"><Shield /> Safe</div>
                  <div className="flex items-center gap-3"><Users /> Concierge</div>
                </div>
              </div>
            </div>

            {/* BOOKING PANEL */}
            <div>
              <div className="bg-white border rounded-3xl shadow-xl p-8 sticky top-10">
                <p className="text-gray-500 text-sm mb-2">
                  Starting from
                </p>

                <p className="text-4xl font-bold text-orange-600 mb-6">
                  ₦{price.toLocaleString()}
                  <span className="text-base text-gray-500">
                    {" "}
                    / night
                  </span>
                </p>

               <Link href={`/#booking?room=${room.id}`}>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition">
                    Reserve Now
                  </button>
                </Link>

                <div className="mt-6 text-sm text-gray-500 space-y-2">
                  <p>✔ Free cancellation</p>
                  <p>✔ No prepayment needed</p>
                  <p>✔ Instant confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}