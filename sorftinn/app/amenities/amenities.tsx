"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import {
  Utensils,
  Waves,
  Dumbbell,
  Car,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const amenities = [
  {
    icon: Utensils,
    title: "Fine Dining",
    description:
      "Three acclaimed restaurants offering world-class cuisine from renowned chefs.",
    highlight: "Michelin-starred",
    image: "/carousel/dinner.jpg",
  },
  {
    icon: Waves,
    title: "Infinity Pool",
    description:
      "Rooftop pool with breathtaking views and private cabanas for ultimate relaxation.",
    highlight: "Heated",
    image: "/carousel/swim.jpg",
  },
  {
    icon: Dumbbell,
    title: "Wellness Spa",
    description:
      "Full-service spa and fitness center with personal training available.",
    highlight: "Award-winning",
    image: "/carousel/yoga.jpg",
  },
  {
    icon: Car,
    title: "Valet Service",
    description:
      "Complimentary valet parking and luxury car service upon request.",
    highlight: "24/7",
    image: "/carousel/tenise.jpg",
  },
];

export function Amenities() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  return (
    <section
      id="amenities"
      ref={ref}
      className="py-20 md:py-28 bg-white overflow-hidden relative"
    >
      {/* soft background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium tracking-wider text-orange-600 uppercase">
              Premium Amenities
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Experience <span className="text-orange-500">Unrivaled</span> Luxury
          </h2>

          <p className="text-lg text-gray-600">
            Every detail meticulously curated to elevate your stay into an unforgettable journey.
          </p>
        </motion.div>

        {/* 2-column luxury grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* cinematic image */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={amenity.image}
                    alt={amenity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-5 left-5 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <span className="absolute top-5 right-5 text-xs font-semibold px-3 py-1.5 bg-white/90 backdrop-blur text-orange-600 rounded-full border border-orange-200">
                    {amenity.highlight}
                  </span>
                </div>

                {/* content */}
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {amenity.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-5">
                    {amenity.description}
                  </p>

                  <div className="flex items-center gap-2 text-orange-500 font-semibold">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
         
        </motion.div>
      </div>
    </section>
  );
}