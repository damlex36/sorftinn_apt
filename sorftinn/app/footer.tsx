"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="footer border-t border-gray-800 bg-gray-950">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-3 sm:mb-4">
              Stay <span className="text-amber-400">Connected</span>
            </h3>
            <p className="font-body text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4">
              Subscribe to receive exclusive offers and updates from Sorftinn Hotel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto px-4 sm:px-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border-gray-800 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all h-12 sm:h-auto"
              />
              <Button className="bg-amber-600 hover:bg-amber-700 text-white h-12 sm:h-auto px-8 hover:scale-105 transition-transform duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - 2 columns on mobile, 4 on desktop */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Brand - spans both columns on mobile, first column on desktop */}
          <div className="col-span-2 lg:col-span-1 text-center sm:text-left mb-4 sm:mb-0">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                  Sorftinn
                </span>
                <span className="text-amber-400 text-[10px] sm:text-xs font-body tracking-[0.3em] uppercase">
                  Hotel
                </span>
              </div>
              <p className="font-body text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 max-w-[250px] mx-auto sm:mx-0">
                Experience timeless elegance in the heart of the city.
              </p>
              <div className="flex gap-2 justify-center sm:justify-start">
                {[
                  { Icon: Instagram, href: "#", label: "Instagram" },
                  { Icon: Facebook, href: "#", label: "Facebook" },
                  { Icon: Twitter, href: "#", label: "Twitter" }
                ].map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-800 rounded-sm hover:border-amber-400 hover:bg-amber-400/10 hover:text-amber-400 transition-all duration-300"
                  >
                    <Icon size={16} className="sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links - Column 1 */}
          <div className="text-left">
            <h4 className="font-display text-base sm:text-lg lg:text-xl text-white mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {["About Us", "Rooms", "Dining", "Wellness", "Events", "Gallery"].map(
                (link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="font-body text-xs sm:text-sm text-gray-400 hover:text-amber-400 transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      <ChevronRight size={12} className="sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact - Column 2 */}
          <div className="text-left">
            <h4 className="font-display text-base sm:text-lg lg:text-xl text-white mb-3 sm:mb-4">Contact</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="sm:w-5 sm:h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="font-body text-xs sm:text-sm text-gray-400">
                  123 Luxury Ave<br />
                  New York, NY
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="font-body text-xs sm:text-sm text-gray-400 hover:text-amber-400"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <a
                  href="mailto:info@sorftinn.com"
                  className="font-body text-xs sm:text-sm text-gray-400 hover:text-amber-400"
                >
                  info@sorftinn.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours - New row on mobile, column 3 on desktop */}
          <div className="col-span-2 lg:col-span-1 text-left mt-4 lg:mt-0">
            <h4 className="font-display text-base sm:text-lg lg:text-xl text-white mb-3 sm:mb-4">Hours</h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "Front Desk", hours: "24/7" },
                { label: "Restaurant", hours: "6am-11pm" },
                { label: "Spa", hours: "7am-10pm" },
                { label: "Rooftop Bar", hours: "5pm-2am" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-body text-xs sm:text-sm text-white">{item.label}</p>
                  <p className="font-body text-xs sm:text-sm text-gray-400">{item.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="font-body text-xs text-gray-500 order-2 md:order-1">
              © 2026 Sorftinn Hotel. All rights reserved. <br className="block sm:hidden" />
              <span className="text-amber-400/70">© 2026 Damola</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 order-1 md:order-2">
              {["Privacy", "Terms", "Accessibility"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-body text-xs text-gray-500 hover:text-amber-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}