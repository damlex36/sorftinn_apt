"use client";

import Image from "next/image";
import {
  Wifi,
  ThermometerSun,
  Wine,
  CarFront,
  Dumbbell,
  Accessibility,
  MapPin,
  GalleryHorizontalEnd,
} from "lucide-react";

const features = [
  { Icon: Wifi, label: "High-Speed WiFi" },
  { Icon: ThermometerSun, label: "Climate Control" },
  { Icon: Wine, label: "Rooftop Bar" },
  { Icon: CarFront, label: "Valet Parking" },
  { Icon: Dumbbell, label: "Fitness Center" },
  { Icon: Accessibility, label: "Full Accessibility" },
];

export default function WhyChooseSorfinn() {
  return (
    <section id="features" className=" Why-choose min-h-screen  flex items-center ">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-30 items-center">

        {/* ================= LEFT IMAGE CARD ================= */}
        <div className="choose-img relative  overflow-hidden shadow-2xl h-140">
          <Image
            src="/carousel/caro4.png"
            alt="Luxury hotel lounge"
            width={900}
            height={600}
            className="object-cover w-full h-full"
            priority
          />

          {/* Since Badge */}
          <div className="absolute bottom-6 left-6 bg-black/80 px-5 py-2 rounded-md text-amber-400 font-semibold tracking-wide">
            Since 1892
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="space-y-8">
          {/* Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Comfort or Celebration,
              <br />
              <span className="span">we’ve got you covered.</span>
            </h2>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Discover unparalleled luxury in the vibrant city center. Sorfinn Hotel
              combines world-class service with sophisticated comfort, offering everything
              you need for an unforgettable stay.
            </p>
          </div>

          {/* Booking Info Row */}
          <div className="flex flex-wrap items-center gap-8 border-t border-white/10 pt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">→</span>
              <span>Check-in: <strong className="text-white">15:00</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-amber-400">←</span>
              <span>Check-out: <strong className="text-white">11:00</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <GalleryHorizontalEnd className="w-4 h-4 text-amber-400" />
              <span>Gallery View</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Location View</span>
            </div>
          </div>

          {/* Why Choose */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Why Choose Sorfinn</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {features.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center bg-black/60 border border-white/10 rounded-xl p-6 hover:border-amber-400/40 transition"
                >
                  <Icon className="w-6 h-6 text-amber-400 mb-3" strokeWidth={1.8} />
                  <p className="text-xs text-gray-200 text-center">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
