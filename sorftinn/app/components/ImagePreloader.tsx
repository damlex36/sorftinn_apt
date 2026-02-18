"use client";

import { useEffect } from "react";

interface ImagePreloaderProps {
  images: string[];
}

export default function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    // Preload all images when component mounts
    images.forEach((src) => {
      if (!src) return;
      
      const img = new Image();
      img.src = src;
      
      img.onerror = () => {
        console.warn(`Failed to preload image: ${src}`);
      };
    });
  }, [images]);

  return null;
}