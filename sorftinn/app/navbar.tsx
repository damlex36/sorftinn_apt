/**
 * SorftInn Hotel App
 * © 2026 Damola
 * Licensed under MIT
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Home, Sparkles, BedDouble, Phone, LogIn } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

/* =======================
   DATA
======================= */
const slides = [
  {
    url: "/carousel/caro7.jpg",
    title: "Welcome to Paradise",
    subtitle: "Experience Luxury at GreyFindor Hotel",
  },
  {
    url: "/carousel/caro9.jpg",
    title: "Oceanfront Serenity",
    subtitle: "Unwind in Pure Elegance",
  },
  {
    url: "/carousel/caro6.jpg",
    title: "Timeless Elegance",
    subtitle: "Sophisticated Interiors Await",
  },
];

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "#features", label: "Features", icon: Sparkles },
  { href: "#rooms", label: "Rooms", icon: BedDouble },
  { href: "#contact", label: "Contact", icon: Phone },
];

export default function HeroWithNavbar() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out date must be after check-in date");
      return;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const isFormValid = checkIn && checkOut && new Date(checkOut) > new Date(checkIn);

  const menuVariants: Variants = {
    closed: { x: "100%" },
    open: { x: 0 }
  };

  const overlayVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/20 z-10" />
          <Image
            src={slide.url}
            alt={slide.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-4 drop-shadow-lg"
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl md:text-3xl mb-6 sm:mb-10 drop-shadow-md"
            >
              {slide.subtitle}
            </motion.p>

            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSearch}
              id="booking"
              className="w-full max-w-xs sm:max-w-md md:max-w-4xl bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl mx-4"
            >
              <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-6">
                <div className="flex flex-col w-full">
                  <label htmlFor="checkIn" className="text-xs sm:text-sm mb-1 text-blue-800 font-medium text-left">
                    Check-in
                  </label>
                  <input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm sm:text-base focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="checkOut" className="text-xs sm:text-sm mb-1 text-blue-800 font-medium text-left">
                    Check-out
                  </label>
                  <input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm sm:text-base focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                </div>

                <div className="flex items-end w-full">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 shadow-md text-sm sm:text-base ${
                      isFormValid
                        ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isFormValid ? (
                      <Link
                        href={`/Bookings?checkIn=${checkIn}&checkOut=${checkOut}`}
                        prefetch={false}
                        className="block w-full h-full"
                      >
                        Check Availability
                      </Link>
                    ) : (
                      "Check Availability"
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 sm:mt-4 text-red-500 text-center font-medium text-sm"
                >
                  {error}
                </motion.p>
              )}
            </motion.form>
          </div>
        </div>
      ))}

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Desktop Logo - FIXED with fill method */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }} 
              transition={{ duration: 0.5 }}
              className="relative w-9 h-9 sm:w-11 sm:h-11"
            >
              <Image 
                src="/logo.png" 
                alt="Logo" 
                fill
                sizes="44px"
                className="rounded-full object-cover"
              />
            </motion.div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`text-lg sm:text-xl md:text-2xl font-bold ${
                scrolled ? "text-blue-900" : "text-white"
              }`}
            >
              GreyFindor Hotel
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setActiveLink(link.label)}
                      className={`flex items-center gap-1 font-medium transition ${
                        scrolled
                          ? "text-blue-700 hover:text-orange-500"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                    {activeLink === link.label && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                          scrolled ? "bg-orange-500" : "bg-white"
                        }`}
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </nav>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/auth"
                className={`flex items-center gap-2 font-medium px-6 py-2.5 rounded-lg transition ${
                  scrolled
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                }`}
              >
                <LogIn size={18} />
                Sign In
              </Link>
            </motion.div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ${
              scrolled ? "text-blue-900" : "text-white"
            } focus:outline-none relative z-50`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setMenuOpen(false)}
            />
            
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-64 sm:w-80 z-50 bg-white shadow-2xl"
            >
              {/* Mobile Menu Logo - FIXED with fill method */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image 
                      src="/logo.jpg" 
                      alt="Logo" 
                      fill
                      sizes="40px"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-blue-900">Sorftinn</h2>
                    <p className="text-xs text-orange-500">Luxury Hotel</p>
                  </div>
                </div>
              </div>

              <nav className="p-6 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveLink(link.label);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-700 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300"
                    >
                      <Icon size={18} className="text-orange-500" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="absolute bottom-6 left-6 right-6">
                <Link
                  href="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}