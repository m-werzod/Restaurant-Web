"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarouselShort from "./CarouselShort";
import CarouselTall from "./CarouselTall";
import { Meal1, Meal2, Meal3 } from "../assets/images";
import type { StaticImageData } from "next/image";

type CardDef = { type: "short" | "tall"; image: StaticImageData };

const cards: CardDef[] = [
  { type: "short", image: Meal1 },
  { type: "tall",  image: Meal2 },
  { type: "tall",  image: Meal3 },
  { type: "short", image: Meal1 },
  { type: "short", image: Meal2 },
  { type: "tall",  image: Meal3 },
  { type: "tall",  image: Meal1 },
  { type: "short", image: Meal2 },
];

export default function CarouselDemo() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3 md:gap-5 pt-20">
          {cards.map((card, i) => {
            const dist = Math.abs(i - selectedIndex);
            const scale = dist === 0 ? "scale-100" : dist === 1 ? "scale-95" : "scale-90";
            const opacity = dist === 0 ? "opacity-100" : dist === 1 ? "opacity-80" : "opacity-60";

            return (
              <div
                key={i}
                className={`shrink-0 w-[80vw] sm:w-60 md:w-auto transition-all duration-300 ease-in-out ${scale} ${opacity}`}
              >
                {card.type === "tall" ? (
                  <CarouselTall localImage={card.image} />
                ) : (
                  <CarouselShort localImage={card.image} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Prev button */}
      <button
        onClick={scrollPrev}
        disabled={!canPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white/90 transition disabled:opacity-30 cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next button */}
      <button
        onClick={scrollNext}
        disabled={!canNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white/90 transition disabled:opacity-30 cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
