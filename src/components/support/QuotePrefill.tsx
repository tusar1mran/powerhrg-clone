"use client";

import { useEffect } from "react";
import { useQuotePrefill } from "@/hooks/use-quote-prefill";
import type { QuotePrefill as QuotePrefillValue } from "@/lib/quote/prefill";

type Props = {
  /** Applies a validated pre-fill to the form. Must be stable (wrap it in useCallback). */
  onPrefill: (prefill: QuotePrefillValue) => void;
};

/**
 * Renders nothing. Hands the services picked on the homepage house (carried in the URL) to the
 * quote form whenever they change. Render it inside <Suspense> so the form itself stays in the
 * prerendered HTML; only this reader waits for the URL.
 */
export default function QuotePrefill({ onPrefill }: Props) {
  const prefill = useQuotePrefill();

  // Syncing from an external source (the URL) into form state that react-hook-form owns.
  useEffect(() => {
    if (prefill) {
      onPrefill(prefill);
    }
  }, [prefill, onPrefill]);

  return null;
}
