"use client";

import { Utensils, Waves, Dumbbell, Car, Wifi, Clock } from "lucide-react";

const amenities = [
  {
    icon: Utensils,
    title: "Fine Dining",
    description:
      "Three acclaimed restaurants offering world-class cuisine from renowned chefs.",
  },
  {
    icon: Waves,
    title: "Infinity Pool",
    description:
      "Rooftop pool with breathtaking views and private cabanas for ultimate relaxation.",
  },
  {
    icon: Dumbbell,
    title: "Wellness Spa",
    description:
      "Full-service spa and fitness center with personal training available.",
  },
  {
    icon: Car,
    title: "Valet Service",
    description:
      "Complimentary valet parking and luxury car service upon request.",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description:
      "Seamless connectivity throughout the hotel for work and leisure.",
  },
  {
    icon: Clock,
    title: "24/7 Concierge",
    description:
      "Dedicated team to assist with reservations, tours, and special requests.",
  },
];

export function Amenities() {
  return (
    <section id="" className="amenities py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Services
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
            Hotel Amenities
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Discover a world of refined experiences designed to elevate every moment of your stay.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto text-gray-400">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <div
                key={amenity.title}
                className="grids-crd group relative p-8 border border-border rounded-2xl bg-card/50 backdrop-blur-md hover:shadow-xl hover:scale-105 hover:border-gold transition-transform duration-500 overflow-hidden"
              >
                {/* Gradient overlay shimmer */}
                <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-gold/5 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                {/* Icon */}
                <div className="icons bg-black text-amber-400 w-14 h-14 flex items-center justify-center border border-gold/30 rounded-lg mb-6 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500">
                  <Icon className="w-7 h-7 text-gold group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                  {amenity.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {amenity.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
