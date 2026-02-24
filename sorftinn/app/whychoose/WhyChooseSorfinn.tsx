"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Wifi,
  ThermometerSun,
  Wine,
  CarFront,
  Dumbbell,
  Accessibility,
  MapPin,
  Clock,
  CalendarCheck,
  Star,
} from "lucide-react";

const features = [
  { Icon: Wifi, label: "High-Speed WiFi", description: "Stay connected with gigabit internet" },
  { Icon: ThermometerSun, label: "Climate Control", description: "Perfect temperature, always" },
  { Icon: Wine, label: "Rooftop Bar", description: "Craft cocktails with a view" },
  { Icon: CarFront, label: "Valet Parking", description: "Hassle-free arrival & departure" },
  { Icon: Dumbbell, label: "Fitness Center", description: "State-of-the-art equipment" },
  { Icon: Accessibility, label: "Full Accessibility", description: "Inclusive design for all" },
];

const highlights = [
  { Icon: Star, value: "4.9", label: "Guest Rating", color: "text-orange-500" },
  { Icon: Clock, value: "24/7", label: "Concierge", color: "text-blue-600" },
  { Icon: CalendarCheck, value: "1892", label: "Established", color: "text-orange-500" },
];

export default function WhyChooseSorfinn() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
          ref={ref}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className="text-sm font-medium tracking-wider text-blue-700 uppercase">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Experience <span className="text-orange-500">Unparalleled</span> Luxury
          </h2>
          <p className="text-lg text-gray-600">
            Where every detail is crafted to perfection, ensuring your stay is nothing short of extraordinary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN - Image with Stats Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/carousel/ceo.png"
                alt="Luxury hotel experience"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900/90 to-transparent">
                <div className="grid grid-cols-3 gap-4">
                  {highlights.map((item, index) => {
                    const Icon = item.Icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="flex justify-center mb-1">
                          <Icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                        <p className="text-xs text-white/80">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="absolute -top-4 -right-4 bg-orange-500 text-white px-6 py-3 rounded-full shadow-xl"
            >
              <span className="font-bold text-lg">5★</span>
              <span className="text-xs ml-1 opacity-90">Luxury</span>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Feature Highlights */}
            <div className="space-y-6">
              <motion.h3 
                variants={fadeInUp}
                className="text-2xl md:text-3xl font-semibold text-blue-900"
              >
                Comfort or Celebration,
                <br />
                <span className="text-orange-500">we`ve got you covered.</span>
              </motion.h3>

              <motion.p 
                variants={fadeInUp}
                className="text-gray-600 text-lg leading-relaxed"
              >
                Discover unparalleled luxury in the vibrant city center. Sorftinn Hotel
                combines world-class service with sophisticated comfort, offering everything
                you need for an unforgettable stay.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {features.map((feature, index) => {
                const Icon = feature.Icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg">
                        <Icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">{feature.label}</h4>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Booking Info Bar */}
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-700">
                    Check-in: <strong className="text-blue-900">3:00 PM</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-700">
                    Check-out: <strong className="text-blue-900">11:00 AM</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-700">City Center Location</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <Link href={`/#booking?`}>
            <motion.div 
              variants={fadeInUp}
              className="pt-4"
            >
              <button className="group relative px-8 py-4 bg-blue-900 text-white rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Book Your Stay
                  <CalendarCheck className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </button>
            </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}