"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Images now live in public/carousel/
const galleryImages = [
  { src: "/carousel/caro1.png", title: "Presidential Suite", category: "Suites", description: "Where luxury meets sophistication" },
  { src: "/carousel/caro2.png", title: "Grand Lobby", category: "Public Spaces", description: "An arrival experience like no other" },
  { src: "/carousel/caro3.png", title: "Deluxe Room", category: "Rooms", description: "Contemporary elegance redefined" },
  { src: "/carousel/caro4.png", title: "Classic Room", category: "Rooms", description: "Timeless comfort and style" },
  { src: "/carousel/caro5.jpg", title: "Penthouse View", category: "Suites", description: "Panoramic city views" },
];

export function GallerySlides() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();
  const scrollTo = (index: number) => api?.scrollTo(index);

  return (
    <section className="gallery py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden relative">
      {/* Decorative Elements - Updated to amber-400/5 */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-amber-400/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header - Updated text colors */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-amber-400 font-medium">
                Visual Journey
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">
              Capturing <span className="text-amber-400">Moments</span>
            </h2>
          </div>

          {/* Navigation Controls - Updated to amber-400 */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="font-display text-2xl text-amber-400 font-light">{String(current + 1).padStart(2, "0")}</span>
              <span className="font-body text-gray-400 text-xs ml-1">/ {String(galleryImages.length).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                className="h-10 w-10 rounded-full border-amber-400/20 hover:border-amber-400 bg-gray-800/80 backdrop-blur-sm hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 shadow-md"
              >
                <ArrowLeft className="h-4 w-4 text-amber-400 hover:text-gray-900" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                className="h-10 w-10 rounded-full border-amber-400/20 hover:border-amber-400 bg-gray-800/80 backdrop-blur-sm hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 shadow-md"
              >
                <ArrowRight className="h-4 w-4 text-amber-400 hover:text-gray-900" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <Carousel 
        setApi={setApi} 
        opts={{ 
          align: "center", 
          loop: true,
          skipSnaps: false,
          dragFree: false
        }} 
        className="w-full relative"
      >
        <CarouselContent className="-ml-3 md:-ml-4 lg:-ml-5">
          {galleryImages.map((image, index) => {
            const isActive = index === current;
            const isHovered = index === hoveredIndex;
            const isSelected = index === selectedIndex;
            
            return (
              <CarouselItem
                key={index}
                className={`pl-3 md:pl-4 lg:pl-5 basis-[85%] md:basis-[45%] lg:basis-[35%] transition-all duration-500 ${
                  isActive ? 'scale-105 z-10' : 'scale-95 opacity-70 hover:opacity-90'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(isSelected ? null : index)}
              >
                <div
                  className={`group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-700 bg-gray-800 ${
                    isSelected ? 'ring-4 ring-amber-400 shadow-2xl shadow-amber-400/20' : 'shadow-lg hover:shadow-xl hover:shadow-amber-400/10'
                  }`}
                >
                  {/* Image Container with Parallax */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className={`object-cover transition-all duration-1000 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      } ${isActive ? 'scale-105' : ''}`}
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 35vw"
                      priority={index === 0}
                    />
                  </div>

                  {/* Simplified Overlay - Updated gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end transform transition-all duration-500">
                    {/* Category Badge - Updated to amber-400 */}
                    <div className={`mb-2 transform transition-all duration-300 ${
                      isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}>
                      <span className="inline-block bg-amber-400 text-gray-900 text-[10px] font-bold px-2 py-1 rounded-full tracking-wider uppercase shadow-md">
                        {image.category}
                      </span>
                    </div>

                    {/* Title - Updated text color */}
                    <h3 className={`font-display text-lg md:text-xl text-white mb-1 transform transition-all duration-500 delay-75 ${
                      isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      {image.title}
                    </h3>

                    {/* Description */}
                    <p className={`font-body text-gray-300 text-xs max-w-xs mb-3 transform transition-all duration-500 delay-100 hidden md:block ${
                      isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      {image.description}
                    </p>

                    {/* Action Buttons - Updated to match sidebar */}
                    <div className={`flex gap-2 transform transition-all duration-500 delay-150 ${
                      isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      <button className="group/btn bg-amber-400 text-gray-900 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-amber-500 transition-all duration-300 shadow-md flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" />
                        View
                      </button>
                      <button className="bg-gray-700 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-600 transition-all duration-300 border border-gray-600">
                        Book
                      </button>
                    </div>
                  </div>

                  {/* Expand Icon - Updated to amber-400 */}
                  <div className={`absolute top-3 right-3 transition-all duration-500 ${
                    isHovered ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
                  }`}>
                    <div className="w-8 h-8 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center border border-gray-700 hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 group/expand">
                      <Maximize2 className="w-3 h-3 text-amber-400 group-hover/expand:text-gray-900" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Progress & Thumbnails - Updated colors */}
      <div className="container mx-auto px-6 lg:px-12 mt-6">
        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="h-[2px] bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${((current + 1) / galleryImages.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === current 
                  ? 'w-8 bg-amber-400' 
                  : 'w-1.5 bg-gray-700 hover:bg-amber-400/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}