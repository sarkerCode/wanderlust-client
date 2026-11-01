"use client";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="mt-4 flex max-w-xs items-stretch overflow-hidden rounded-md border border-white/15 bg-white/[0.04] focus-within:border-white/35"
    >
      <Input
        type="email"
        required
        placeholder="Enter email"
        aria-label="Email address"
        className="h-10 flex-1 rounded-none border-0 bg-transparent px-3 text-sm text-white placeholder:text-white/40 shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon-lg"
        aria-label="Subscribe to newsletter"
        className="w-10 shrink-0 rounded-none border-l border-white/10 text-white/60 hover:text-white"
      >
        <ArrowUpRight aria-hidden="true" />
      </Button>
    </form>
  );
}
