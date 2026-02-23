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
    url: "/carousel/caro1.png",
    title: "Welcome to Paradise",
    subtitle: "Experience Luxury at WhiteHaven Hotel",
  },
  {
    url: "/carousel/caro2.png",
    title: "Oceanfront Serenity",
    subtitle: "Unwind in Pure Elegance",
  },
  {
    url: "/carousel/caro3.png",
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

/* =======================
   COMPONENT
======================= */
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

  /* Auto slide */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Prevent body scroll when menu is open */
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

  // Animation variants with proper typing
  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 200,
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 200,
      }
    }
  };

  const overlayVariants: Variants = {
    closed: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const containerVariants: Variants = {
    closed: { 
      transition: { 
        staggerChildren: 0.05, 
        staggerDirection: -1 
      }
    },
    open: { 
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants: Variants = {
    closed: { 
      x: 20, 
      opacity: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 100 
      }
    },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring" as const, 
        stiffness: 100 
      }
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* ================= HERO SLIDES ================= */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={slide.url}
            alt={slide.title}
            fill
            className="object-cover animate-zoom-out"
            priority={index === 0}
          />

          {/* HERO TEXT + SEARCH FORM - FIXED FOR MOBILE */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-4 px-2"
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl md:text-3xl mb-6 sm:mb-10 px-2"
            >
              {slide.subtitle}
            </motion.p>

            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSearch}
              className="w-full max-w-xs sm:max-w-md md:max-w-4xl bg-black/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 mx-4"
            >
              <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-6">
                {/* Check-in Field */}
                <div className="flex flex-col w-full">
                  <label htmlFor="checkIn" className="text-xs sm:text-sm mb-1 text-white/80 text-left">
                    Check-in
                  </label>
                  <input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/30 rounded-lg text-white text-sm sm:text-base placeholder-white/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400 transition"
                  />
                </div>

                {/* Check-out Field */}
                <div className="flex flex-col w-full">
                  <label htmlFor="checkOut" className="text-xs sm:text-sm mb-1 text-white/80 text-left">
                    Check-out
                  </label>
                  <input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/30 rounded-lg text-white text-sm sm:text-base placeholder-white/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400 transition"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-end w-full">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 shadow-md text-sm sm:text-base ${
                      isFormValid
                        ? "bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white cursor-pointer"
                        : "bg-gray-600/50 text-gray-300 cursor-not-allowed"
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
                  className="mt-3 sm:mt-4 text-red-400 text-center font-medium text-sm"
                >
                  {error}
                </motion.p>
              )}
            </motion.form>
          </div>
        </div>
      ))}

      {/* ================= NAVBAR ================= */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/logo.jpg" alt="Logo" width={36} height={36} className="rounded-full sm:w-11 sm:h-11" />
            </motion.div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`text-lg sm:text-xl md:text-2xl font-bold ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              <span className="hidden xs:inline">Sorftinn</span>
              <span className="xs:hidden">Sorftinn Apartment</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation + Sign In */}
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
                          ? "text-gray-700 hover:text-amber-600"
                          : "text-white hover:text-amber-400"
                      }`}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                    {activeLink === link.label && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                          scrolled ? "bg-amber-600" : "bg-amber-400"
                        }`}
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Sign In Button (Desktop) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth"
                className={`flex items-center gap-2 font-medium px-6 py-2.5 rounded-lg transition ${
                  scrolled
                    ? "bg-amber-600 hover:bg-amber-700 text-white shadow-md"
                    : "bg-white/20 hover:bg-white/30 text-white border border-white/40"
                }`}
              >
                <LogIn size={18} />
                Sign In
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ${
              scrolled ? "text-gray-900" : "text-white"
            } focus:outline-none relative z-50`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ================= MOBILE MENU WITH FRAMER MOTION ================= */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-64 sm:w-80 z-50 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl border-l border-white/10"
            >
              {/* Header */}
              <div className="p-4 sm:p-8 border-b border-white/10">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image 
                      src="/logo.jpg" 
                      alt="Logo" 
                      width={40} 
                      height={40} 
                      className="rounded-full ring-2 ring-amber-500/50 sm:w-12 sm:h-12"
                    />
                  </motion.div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">Sorftinn</h2>
                    <p className="text-[10px] sm:text-xs text-amber-400">Luxury Apartments</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links with container variants */}
              <motion.nav 
                className="p-4 sm:p-6 space-y-2"
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.label}
                      variants={itemVariants}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setActiveLink(link.label);
                        }}
                        className="group relative flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="text-amber-400"
                        >
                          <Icon size={18} className="sm:w-5 sm:h-5" />
                        </motion.div>
                        <span className="text-base sm:text-lg font-medium">{link.label}</span>
                        
                        {/* Animated underline */}
                        <motion.div
                          className="absolute bottom-2 left-14 sm:left-16 right-4 sm:right-6 h-0.5 bg-amber-400"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Sign In Button */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-4 sm:bottom-8 left-4 sm:left-6 right-4 sm:right-6"
              >
                <Link
                  href="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 sm:gap-3 w-full py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  <LogIn size={16} className="sm:w-5 sm:h-5" />
                  Sign In
                </Link>
                
                {/* Decorative elements */}
                <div className="flex justify-center gap-2 mt-3 sm:mt-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-1 h-1 bg-amber-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="w-1 h-1 bg-amber-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    className="w-1 h-1 bg-amber-400 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}