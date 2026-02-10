"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Link from "next/link";

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
  { href: "#", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#rooms", label: "Rooms" },
  { href: "#contact", label: "Contact" },
];

/* =======================
   COMPONENT
======================= */
export default function HeroWithNavbar() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

    // No alert needed anymore — navigation happens via <Link>
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

  const isFormValid = checkIn && checkOut && new Date(checkOut) > new Date(checkIn);

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

          {/* HERO TEXT + SEARCH */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {slide.title}
            </h1>
            <p className="text-xl md:text-3xl mb-10">
              {slide.subtitle}
            </p>

            <form
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
                    className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-amber-400"
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
                    className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-amber-400"
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
                <p className="mt-4 text-red-400 text-center font-medium">{error}</p>
              )}
            </form>
          </div>
        </div>
      ))}

      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Logo" width={44} height={44} />
            <span
              className={`text-2xl font-bold ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Sorftinn Apartment
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-medium transition ${
                  scrolled
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-400"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ${
              scrolled ? "text-gray-900" : "text-white"
            } focus:outline-none`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMenuOpen(false)}>
          <div 
            className="w-72 bg-white h-full p-8" 
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium text-gray-800 hover:text-amber-600 transition"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}