"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "../components/marquee";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Images in public/carousel/
const galleryImages = [
  { src: "/carousel/caro1.png" },
  { src: "/carousel/caro2.png" },
  { src: "/carousel/caro3.png" },
  { src: "/carousel/caro4.png" },
  { src: "/carousel/caro5.jpg" },
];

export function GallerySlides() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();
  const scrollTo = (index: number) => api?.scrollTo(index);

  return (
    <>
    <div className="p-0">
      <Marquee/>
    </div>
    <section className="gallery py-16 lg:py-24 bg-white overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Navigation buttons */}
        <div className="absolute top-8 right-8 z-20 flex items-center gap-3 md:top-12 md:right-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
          >
            <ArrowRight className="h-5 w-5 text-gray-700" />
          </Button>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6 lg:-ml-8">
            {galleryImages.map((image, index) => {
              const isActive = index === current;

              return (
                <CarouselItem
                  key={index}
                  className={`pl-4 md:pl-6 lg:pl-8 basis-[90%] md:basis-[70%] lg:basis-[60%] transition-all duration-700 ${
                    isActive
                      ? "scale-105 z-10"
                      : "scale-90 opacity-70 hover:opacity-90"
                  }`}
                >
                  <div
                    className="
                      group relative 
                      aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/10]
                      rounded-3xl overflow-hidden shadow-2xl 
                      transition-all duration-700 bg-gray-50
                    "
                  >
                    <Image
                      src={image.src}
                      alt="Gallery image"
                      fill
                      className={`
                        object-cover transition-transform duration-1000 ease-out
                        ${isActive ? "scale-105" : "scale-100"}
                        group-hover:scale-110
                      `}
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 60vw"
                      priority={index < 2}
                      quality={90}
                    />

                    {/* subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-10 md:mt-12">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`
                h-2.5 rounded-full transition-all duration-500
                ${
                  index === current
                    ? "w-10 bg-gray-800"
                    : "w-2.5 bg-gray-300 hover:bg-gray-500"
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}