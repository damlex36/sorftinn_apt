"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Home,
} from "lucide-react";

export default function BookingSuccess() {
  const [bookingRef] = useState(() => {
    return `SFT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  });

  // Optional: fallback UI while generating (almost never visible)
  if (!bookingRef) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading confirmation...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-azure/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg animate-fade-up">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-azure/20 rounded-full blur-xl scale-150 animate-pulse" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-azure to-teal flex items-center justify-center">
              <CheckCircle
                className="w-12 h-12 text-background"
                strokeWidth={2.5}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <p className="text-azure text-sm tracking-[0.3em] uppercase mb-3 animate-fade-up delay-100">
            Reservation Confirmed
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 animate-fade-up delay-200">
            Thank You!
          </h1>
          <p className="text-muted-foreground leading-relaxed animate-fade-up delay-300">
            Your booking has been successfully confirmed. A confirmation email
            with all the details has been sent to your inbox.
          </p>
        </div>

        {/* Booking Reference Card */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl mb-6 animate-fade-up delay-400">
          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Booking Reference
              </p>
              <p className="text-2xl text-azure tracking-wider font-mono">
                {bookingRef}
              </p>
            </div>

            <div className="h-px bg-border mb-6" />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-azure mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">Sorftinn Hotel</p>
                  <p className="text-xs text-muted-foreground">
                    123 Luxury Avenue, Downtown
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-azure mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">
                    Check-in from 3:00 PM
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Check-out by 11:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-azure mt-0.5 shrink-0" />
                <p className="text-sm text-foreground">+1 (234) 567-890</p>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-azure mt-0.5 shrink-0" />
                <p className="text-sm text-foreground">
                  reservations@sorftinn.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-500">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-medium px-6 py-3 transition"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/rooms"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-medium px-6 py-3 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Browse More Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}