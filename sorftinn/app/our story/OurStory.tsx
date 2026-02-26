/**
 * SorftInn Hotel App
 * © 2026 Damola
 * Licensed under MIT
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Award, Users, Clock } from "lucide-react";

export default function OurStory() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: Calendar, value: "130+", label: "Years of Excellence", color: "text-orange-500" },
    { icon: Award, value: "200", label: "Luxury Suites", color: "text-blue-600" },
    { icon: Users, value: "98%", label: "Guest Satisfaction", color: "text-orange-500" },
    { icon: Clock, value: "24/7", label: "Concierge Service", color: "text-blue-600" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Image with overlay */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
            ref={ref}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/carousel/story.jpg"
                alt="Hotel lobby historic elegance"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-orange-500/20 mix-blend-overlay" />
              
              {/* Date badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border-l-4 border-orange-500">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-blue-600 font-medium">Established</p>
                    <p className="text-xl font-bold text-blue-900">Since 1892</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Story Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Section Label */}
            <motion.div variants={fadeInUp} className="inline-block">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-sm font-medium tracking-wider text-blue-700 uppercase">
                  Our Story
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-blue-900">A Legacy of</span>
              <br />
              <span className="text-orange-500">Excellence</span>
            </motion.h2>

            {/* Description */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Nestled in the heart of the city, GreyFindor Hotel has been a beacon of 
                <span className="text-blue-700 font-semibold"> refined hospitality since 1892</span>. 
                Our commitment to impeccable service and timeless elegance has made us the 
                preferred destination for discerning travelers seeking an extraordinary experience.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every detail, from our thoughtfully curated interiors to our personalized 
                concierge service, reflects our dedication to creating 
                <span className="text-orange-500 font-semibold"> unforgettable moments</span> for our guests.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 gap-6 pt-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${index % 2 === 0 ? 'from-orange-50 to-orange-100' : 'from-blue-50 to-blue-100'}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Signature / Quote */}
            <motion.div 
              variants={fadeInUp}
              className="pt-6 border-t border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div>
                  <p className="text-gray-600 italic text-sm">`Where every stay becomes a memory`</p>
                  <p className="text-blue-900 font-semibold text-sm mt-1">— The GreyFindor Family</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}