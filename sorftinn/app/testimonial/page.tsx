"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amaka Okafor",
    role: "Business Executive",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "From the moment I arrived, the service was impeccable. The room design, comfort, and attention to detail exceeded every expectation.",
  },
  {
    name: "David Mensah",
    role: "International Traveler",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "An extraordinary experience. The infinity pool view and concierge service made my stay unforgettable. True luxury in every sense.",
  },
  {
    name: "Zainab Abdullahi",
    role: "Vacation Guest",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    text: "The ambiance, dining, and spa services were world-class. I felt pampered every single day. I can't wait to return.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 mb-40 bg-white overflow-hidden">
      
      {/* Subtle luxury glow */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-orange-100 via-transparent to-orange-100" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="uppercase tracking-widest text-orange-500 text-sm mb-3">
            Guest Experiences
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 mt-4">
            Discover why travelers around the world choose us for comfort,
            elegance, and unforgettable stays.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((guest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(guest.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-orange-500 fill-orange-500"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 leading-relaxed mb-6">
                “{guest.text}”
              </p>

              {/* Guest Info with Image */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-orange-200 shadow-md">
                  <Image
                    src={guest.image}
                    alt={guest.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {guest.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {guest.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
}