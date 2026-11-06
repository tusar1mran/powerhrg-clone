"use client";

import { CheckIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ServiceName } from "@/lib/links";
import { walkaroundChrome } from "@/lib/walkaround-content";
import { cn } from "@/lib/utils";
import { useWalkaroundActions, useWalkaroundState } from "../WalkaroundProvider";

/** Adds a service to the quote selection or takes it out again. The HTML twin of "Pick for quote". */
export function QuoteToggle({ service }: { service: ServiceName }) {
  const { selected } = useWalkaroundState();
  const { toggleService } = useWalkaroundActions();
  const inQuote = selected.includes(service);

  return (
    <Button
      type="button"
      variant={inQuote ? "default" : "outline"}
      aria-pressed={inQuote}
      onClick={() => toggleService(service)}
      className={cn("h-11 rounded-full px-5 text-[14px] font-semibold", !inQuote && "border-white/20 bg-white/5")}
    >
      {inQuote ? <CheckIcon data-icon="inline-start" /> : <PlusIcon data-icon="inline-start" />}
      {inQuote ? walkaroundChrome.inQuote : walkaroundChrome.addToQuote}
      <span className="sr-only">: {service}</span>
    </Button>
  );
}
