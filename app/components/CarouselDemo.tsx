"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import CarouselShort from "./CarouselShort";
import CarouselTall from "./CarouselTall";

export default function CarouselDemo() {
  return (
    <Carousel
      opts={{
        align: "center",
        containScroll: "trimSnaps",
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, i) => (
          <CarouselItem
            key={i}
            className="basis-full md:basis-full lg:basis-full"
          >
            <div className="flex gap-5">
              <CarouselShort />
              <CarouselTall />
                    <CarouselTall />
                    <CarouselShort/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
