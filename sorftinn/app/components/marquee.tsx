"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  text?: string;
  speed?: number;
  direction?: "left" | "right";
  variant?: "simple" | "gradient" | "luxury";
  pauseOnHover?: boolean;
}

const defaultText =
  "GREYFINDOR LUXURY HOTEL • EXPERIENCE ELEGANCE • BOOK YOUR STAY • ";

export function Marquee({
  text = defaultText,
  speed = 40,
  direction = "left",
  variant = "luxury",
  pauseOnHover = true,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  const variantStyles = {
    simple: "text-gray-700",
    gradient:
      "bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent",
    luxury:
      "text-gray-800 tracking-[0.25em] font-semibold",
  };

  return (
    <div className="relative overflow-hidden bg-white py-6">
      {/* subtle luxury glow */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-orange-100 via-transparent to-orange-100" />

      <div
        ref={containerRef}
        className="flex whitespace-nowrap"
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
      >
        <motion.div
          animate={{
            x: direction === "left" ? [-width, 0] : [0, -width],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ animationPlayState: paused ? "paused" : "running" }}
          className="flex items-center gap-16"
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className={`whitespace-nowrap ${variantStyles[variant]}`}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.4rem)",
              }}
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}