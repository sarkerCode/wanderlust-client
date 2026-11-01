import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative isolate flex min-h-[520px] w-full items-center justify-center overflow-hidden sm:min-h-[560px] lg:min-h-[620px]">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/45"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-20 pt-24 text-center">
        <h2 className="text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl lg:text-[56px]">
          Ready To Start Your Journey?
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-5 sm:text-[17px]">
          Join thousands of travelers who have discovered the world with us.
        </p>

        <Button
          render={<Link href="#bookings" />}
          nativeButton={false}
          className="mt-9 h-14 rounded-[2px] bg-white px-8 text-xs font-semibold tracking-[0.14em] text-neutral-800 uppercase hover:bg-white"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
