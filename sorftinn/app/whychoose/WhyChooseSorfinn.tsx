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
    <section id="features" className="py-14 md:py-18 bg-transparent text-white relative">
      {/* Subtle background gradient matching sidebar */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-950/30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-14 items-center">

          {/* LEFT IMAGE CARD - Moderate height */}
          <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[460px] ring-1 ring-amber-400/10 hover:ring-amber-400/30 transition-all duration-500">
            <Image
              src="/carousel/caro4.png"
              alt="Luxury hotel lounge"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-amber-400 text-xs font-medium tracking-wide border border-amber-400/20">
              Since 1892
            </div>
          </div>

          {/* RIGHT CONTENT - Balanced spacing */}
          <div className="space-y-6 md:space-y-7 mt-7 lg:mt-0">

            <div className="space-y-3 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                Comfort or Celebration,
                <br className="hidden sm:block" />
                <span className="text-amber-400">we ve got you covered.</span>
              </h2>

              <p className="text-base text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover unparalleled luxury in the vibrant city center. Sorfinn Hotel
                combines world-class service with sophisticated comfort.
              </p>
            </div>

            {/* Booking info row - Moderate spacing */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6 text-sm text-gray-400 pt-3 border-t border-amber-400/10">
              <div className="flex items-center gap-2 group hover:bg-amber-400/5 px-2 py-1 rounded-full transition-all duration-300">
                <span className="text-amber-400 group-hover:scale-110 transition-transform">→</span>
                <span>Check-in: <strong className="text-white text-sm">15:00</strong></span>
              </div>
              <div className="flex items-center gap-2 group hover:bg-amber-400/5 px-2 py-1 rounded-full transition-all duration-300">
                <span className="text-amber-400 group-hover:scale-110 transition-transform">←</span>
                <span>Check-out: <strong className="text-white text-sm">11:00</strong></span>
              </div>
              <div className="flex items-center gap-2 group hover:bg-amber-400/5 px-2 py-1 rounded-full transition-all duration-300">
                <GalleryHorizontalEnd className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Gallery View</span>
              </div>
              <div className="flex items-center gap-2 group hover:bg-amber-400/5 px-2 py-1 rounded-full transition-all duration-300">
                <MapPin className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Location View</span>
              </div>
            </div>

            {/* Features - Moderate grid */}
            <div className="pt-2">
              <h3 className="text-xl font-semibold mb-5 text-center lg:text-left text-white">
                Why Choose <span className="text-amber-400">Sorfinn</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {features.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-amber-400/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-amber-400/5 transition-all duration-300 group"
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 mb-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" strokeWidth={1.6} />
                    <p className="text-xs sm:text-sm text-gray-300 text-center group-hover:text-white transition-colors duration-300">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}