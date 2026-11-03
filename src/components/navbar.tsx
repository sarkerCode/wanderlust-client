"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, Menu, X } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      <div className="mx-auto grid h-16 w-full max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6 lg:h-20 lg:px-10">
        <nav aria-label="Main" className="col-start-1 hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              render={<Link href={link.href} />}
              nativeButton={false}
              variant="ghost"
              size="sm"
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "h-auto rounded-md px-3 py-1.5 text-[13px] font-medium hover:bg-brand/10 hover:text-brand lg:text-sm",
                link.active ? "bg-brand/10 text-brand" : "text-neutral-700",
              )}
            >
              {link.label}
            </Button>
          ))}
        </nav>

        <Link
          href="/"
          aria-label="Wanderlust home"
          className="col-start-2 justify-self-center"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlust"
            width={162}
            height={24}
            priority
            className="h-6 w-auto lg:h-8"
          />
        </Link>

        <div className="col-start-3 flex items-center justify-end justify-self-end gap-5">
          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="#profile"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-neutral-700 transition-colors hover:text-brand lg:text-sm"
            >
              <CircleUserRound className="size-4" aria-hidden="true" />
              Profile
            </Link>
            {accountLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-neutral-700 transition-colors hover:text-brand lg:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-black/5 px-4 pb-4 md:hidden"
        >
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={link.active ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm font-medium",
                    link.active ? "bg-brand/10 text-brand" : "text-neutral-700",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col border-t border-black/5 pt-3">
            <Link
              href="#profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-neutral-700"
            >
              <CircleUserRound className="size-4" aria-hidden="true" />
              Profile
            </Link>
            {accountLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-neutral-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
