"use client";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import CarouselHero from "./carouselHero";

export default function CarouselContainer() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <Carousel
      className="w-full"
      plugins={[plugin.current]}
      //onMouseEnter={plugin.current.stop}
      //onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <CarouselHero index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
