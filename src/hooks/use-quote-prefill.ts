// Reads the quote builder's `service` values from the current URL (see src/lib/quote/href.ts).
// Uses useSearchParams, so the component calling it must sit inside a <Suspense> boundary to keep
// the rest of the page prerendered.
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { QUOTE_SERVICE_PARAM } from "@/lib/quote/href";
import { parseQuotePrefill, type QuotePrefill } from "@/lib/quote/prefill";

export function useQuotePrefill(): QuotePrefill | null {
  const searchParams = useSearchParams();
  // A stable string key, so the parse only reruns when the service values actually change.
  const key = searchParams.getAll(QUOTE_SERVICE_PARAM).join("\n");

  return useMemo(() => (key ? parseQuotePrefill(key.split("\n")) : null), [key]);
}
