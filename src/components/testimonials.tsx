"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "“The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.”",
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person2.png",
  },
  {
    quote:
      "“Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable.” Highly Recommend",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
];

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setCanPrev(scroller.scrollLeft > 4);
    setCanNext(scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const scroller = scrollerRef.current;
    scroller?.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      scroller?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-slot=card]");
    const amount = card
      ? card.offsetWidth + 16
      : scroller.clientWidth;
    scroller.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="w-full bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-tight">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-[15px]">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="hidden gap-3 sm:flex">
            <Button
              variant="outline"
              size="icon-lg"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-label="Previous testimonials"
              className="rounded-full border-neutral-300 text-neutral-500 hover:text-foreground disabled:opacity-40"
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-label="Next testimonials"
              className="rounded-full border-neutral-300 text-neutral-500 hover:text-foreground disabled:opacity-40"
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] sm:mt-10 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="w-[85%] shrink-0 snap-start overflow-hidden rounded-md bg-white shadow-none ring-black/[0.08] [--card-spacing:--spacing(6)] sm:w-[calc(50%-8px)]"
            >
              <div className="grid flex-1 sm:grid-cols-[1fr_auto]">
                <CardContent className="flex flex-col justify-between gap-8">
                  <p className="text-lg font-medium leading-snug text-foreground sm:text-xl">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      — {testimonial.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground/80">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>

                <div className="relative h-44 w-full sm:h-full sm:w-56">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 224px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
