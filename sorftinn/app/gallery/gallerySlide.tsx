
"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Images now live in public/carousel/
const galleryImages = [
  { src: "/carousel/caro1.png", title: "Presidential Suite", category: "Suites" },
  { src: "/carousel/caro2.png", title: "Grand Lobby", category: "Public Spaces" },
  { src: "/carousel/caro3.png", title: "Deluxe Room", category: "Rooms" },
  { src: "/carousel/caro4.png", title: "Classic Room", category: "Rooms" },
  { src: "/carousel/caro5.jpg", title: "Penthouse View", category: "Suites" },
];

export function GallerySlides() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  return (
    <section className=" gallery py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <p className="font-body  text-sm tracking-[0.3em] uppercase mb-4">
              Visual Journey
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              Gallery
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <span className="font-body text-muted-foreground text-sm">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(galleryImages.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                className="h-12 w-12 rounded-full border-gold/30 hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5 text-gold" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                className="h-12 w-12 rounded-full border-gold/30 hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <ArrowRight className="h-5 w-5 text-gold" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4 md:-ml-6">
          {galleryImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:pl-6 basis-[85%] md:basis-[45%] lg:basis-[35%]"
            >
              <div
                className="group relative  h-100 rounded-sm overflow-hidden cursor-pointer"
                onMouseEnter={() => setCurrent(index)}
              >
                {/* Next.js Image from public folder */}
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 35vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="font-body text-gold text-xs tracking-[0.2em] uppercase mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {image.category}
                  </span>
                  <h3 className="font-display text-2xl text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {image.title}
                  </h3>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Border Effect */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-500 rounded-sm" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 lg:px-12 mt-8">
        <div className="h-1px bg-border relative">
          <div
            className="absolute top-0 left-0 h-full bg-gold transition-all duration-500 ease-out"
            style={{ width: `${((current + 1) / galleryImages.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
