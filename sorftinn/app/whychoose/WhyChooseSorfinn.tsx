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
    <section id="features" className="py-16 md:py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT IMAGE CARD - comes first on mobile */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[520px]">
            <Image
              src="/carousel/caro4.png"
              alt="Luxury hotel lounge"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-5 left-5 bg-black/75 px-4 py-1.5 rounded text-amber-400 font-medium text-sm tracking-wide">
              Since 1892
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-7 md:space-y-9 mt-10 lg:mt-0">

            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Comfort or Celebration,
                <br className="hidden sm:block" />
                <span className="text-amber-400">we’ve got you covered.</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover unparalleled luxury in the vibrant city center. Sorfinn Hotel
                combines world-class service with sophisticated comfort, offering everything
                you need for an unforgettable stay.
              </p>
            </div>

            {/* Booking info row */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 sm:gap-8 text-sm text-gray-400 pt-4 border-t border-white/10">
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

            {/* Features */}
            <div className="pt-2">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center lg:text-left">
                Why Choose Sorfinn
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {features.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center bg-black/60 border border-white/10 rounded-xl p-5 sm:p-6 hover:border-amber-500/50 transition-colors duration-300"
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 mb-3" strokeWidth={1.6} />
                    <p className="text-xs sm:text-sm text-gray-200 text-center">{label}</p>
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