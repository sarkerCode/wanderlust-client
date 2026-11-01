import Image from "next/image";
import Link from "next/link";

import { NewsletterForm } from "@/components/newsletter-form";

const footerColumns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "#destinations" },
      { label: "My Bookings", href: "#bookings" },
      { label: "My Profile", href: "#profile" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#help-center" },
      { label: "Terms Of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-9.874L0 2.25h6.75l4.715 6.226L18.244 2.25Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "X (Twitter)", Icon: XLogo, href: "#x" },
  { label: "LinkedIn", Icon: LinkedInLogo, href: "#linkedin" },
  { label: "Instagram", Icon: InstagramLogo, href: "#instagram" },
];

const linkClasses =
  "text-[15px] text-white/85 transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#121212] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <Image
          src="/images/Wanderlast-1.png"
          alt="Wanderlast"
          width={542}
          height={80}
          className="h-16 w-auto sm:h-20"
        />
        <p className="mt-3 text-sm text-white/70 sm:text-[15px]">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <h3 className="text-[13px] font-medium uppercase tracking-wide text-white/70">
              Newsletter
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/55">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <NewsletterForm />
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[13px] font-medium uppercase tracking-wide text-white/70">
                {column.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClasses}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[13px] font-medium uppercase tracking-wide text-white/70">
              Contact Us
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <a href="tel:+17869011622" className={linkClasses}>
                  786 901 1622
                </a>
              </li>
              <li>
                <a href="mailto:info@wanderland.com" className={linkClasses}>
                  info@wanderland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-xs text-white/50">
            © 2025 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/80 transition-colors hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
