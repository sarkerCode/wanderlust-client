import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";

export function Banner() {
  return (
    <section className="relative isolate flex min-h-[560px] w-full flex-col overflow-hidden lg:min-h-[620px]">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/50"
      />

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-16 sm:py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h1 className="text-[40px] font-light leading-[1.06] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl xl:text-[84px]">
            <span className="block">Discover Your</span>
            <span className="block">Next Adventure</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-[17px]">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button
              render={<Link href="#explore" />}
              nativeButton={false}
              className="h-11 w-full rounded-[2px] bg-brand px-8 text-[13px] font-semibold tracking-[0.14em] text-white uppercase hover:bg-brand-hover sm:w-auto"
            >
              Explore Now
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              render={<Link href="#destinations" />}
              nativeButton={false}
              className="h-11 w-full rounded-[2px] bg-white/20 px-8 text-[13px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm hover:bg-white/30 hover:text-white sm:w-auto"
            >
              View Destination
            </Button>
          </div>
        </div>
      </div>

      <SearchBar />
    </section>
  );
}
