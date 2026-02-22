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

          {/* HERO TEXT + SEARCH FORM */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-3xl mb-10"
            >
              {slide.subtitle}
            </motion.p>

            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSearch}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl max-w-4xl w-full border border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="checkIn" className="text-sm mb-1 text-white/80">
                    Check-in
                  </label>
                  <input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400 transition"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="checkOut" className="text-sm mb-1 text-white/80">
                    Check-out
                  </label>
                  <input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400 transition"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md ${
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
                  className="mt-4 text-red-400 text-center font-medium"
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/logo.jpg" alt="Logo" width={44} height={44} className="rounded-full" />
            </motion.div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`text-2xl font-bold ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Sorftinn Apartment
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
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
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
              className="fixed top-0 right-0 bottom-0 w-80 z-50 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl border-l border-white/10"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image 
                      src="/logo.jpg" 
                      alt="Logo" 
                      width={50} 
                      height={50} 
                      className="rounded-full ring-2 ring-amber-500/50"
                    />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Sorftinn</h2>
                    <p className="text-xs text-amber-400">Luxury Apartments</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links with container variants */}
              <motion.nav 
                className="p-6 space-y-2"
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
                        className="group relative flex items-center gap-4 px-6 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="text-amber-400"
                        >
                          <Icon size={22} />
                        </motion.div>
                        <span className="text-lg font-medium">{link.label}</span>
                        
                        {/* Animated underline */}
                        <motion.div
                          className="absolute bottom-2 left-16 right-6 h-0.5 bg-amber-400"
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
                className="absolute bottom-8 left-6 right-6"
              >
                <Link
                  href="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <LogIn size={20} />
                  Sign In to Account
                </Link>
                
                {/* Decorative elements */}
                <div className="flex justify-center gap-2 mt-4">
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