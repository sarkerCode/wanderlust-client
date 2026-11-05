import { CircleCheck, Clock } from "lucide-react";
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<string, string> = {
  Confirmed:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400",
  Cancelled:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400",
};

export function normalizeStatus(status?: string): string {
  const normalized = status?.toLowerCase();
  if (normalized === "confirmed") return "Confirmed";
  if (normalized === "cancelled") return "Cancelled";
  return "Pending";
}

export function BookingStatusBadge({ status }: { status?: string }) {
  const label = normalizeStatus(status);
  const Icon = label === "Pending" ? Clock : CircleCheck;

  return (
    <Badge className={cn("rounded-full px-2.5", STATUS_STYLES[label])}>
      <Icon className="size-3" aria-hidden="true" />
      {label}
    </Badge>
  );
}
