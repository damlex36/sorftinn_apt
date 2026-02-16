"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="footer border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Stay Connected
            </h3>
            <p className="font-body text-muted-foreground mb-8">
              Subscribe to receive exclusive offers and updates from Sorftinn Hotel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-gold focus:border-gold transition-all"
              />
              <Button className="hover:scale-105 transition-transform duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-display text-2xl font-semibold text-foreground">
                Sorftinn
              </span>
              <span className="text-gold text-xs font-body tracking-[0.3em] uppercase">
                Hotel
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              Experience timeless elegance and unparalleled hospitality in the heart of the city.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-sm hover:border-gold hover:bg-gold/10 hover:text-gold transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Rooms & Suites", "Dining", "Wellness", "Events", "Gallery"].map(
                (link) => (
                  <li key={link}>
                    <a className="font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-muted-foreground">
                  123 Luxury Avenue<br />
                  Downtown District<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <a
                  href="mailto:info@sorftinn.com"
                  className="font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-300"
                >
                  info@sorftinn.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-6">Hours</h4>
            <ul className="space-y-3">
              {[
                { label: "Front Desk", hours: "24 Hours" },
                { label: "Restaurant", hours: "6:00 AM - 11:00 PM" },
                { label: "Spa & Wellness", hours: "7:00 AM - 10:00 PM" },
                { label: "Rooftop Bar", hours: "5:00 PM - 2:00 AM" },
              ].map((item) => (
                <li key={item.label}>
                  <span className="font-body text-sm text-foreground">{item.label}</span>
                  <p className="font-body text-sm text-muted-foreground">{item.hours}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-muted-foreground">
              © 2024 Sorftinn Hotel. All rights reserved. <br />
              © 2026 Damola — Original Author
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Accessibility"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-body text-xs text-muted-foreground hover:text-gold transition-colors duration-300"
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
