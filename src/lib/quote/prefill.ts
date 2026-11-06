// Reads the quote builder's `service` URL values back into the contact form. URL values are
// untrusted: they are only ever matched against the known service options, never echoed as-is.
import type { ServiceName } from "../links";
import { serviceOptions, type ServiceOption } from "../contact/schema";
import { isServiceName, sortServices } from "./href";

/** Ignore anything beyond this many values, so a crafted URL can't make us do unbounded work. */
const MAX_PARAM_VALUES = 12;
/** The longest option label is well under this; longer values can't match and are skipped early. */
const MAX_VALUE_LENGTH = 40;

// Case-insensitive lookup from URL value to the canonical option label.
const optionsByKey: ReadonlyMap<string, ServiceOption> = new Map(
  serviceOptions.map((option) => [option.toLowerCase(), option]),
);

export type QuotePrefill = {
  /** Value for the form's single "What do you need help with?" select. */
  service: ServiceOption;
  /** The individual services behind "More than one", listed in the message field. */
  services: ServiceName[];
};

/**
 * Turns raw `service` URL values into a form pre-fill. Accepts repeated params and comma-separated
 * values. Unknown values are dropped; returns null when nothing valid is left.
 */
export function parseQuotePrefill(rawValues: readonly string[]): QuotePrefill | null {
  const options: ServiceOption[] = [];

  for (const raw of rawValues.slice(0, MAX_PARAM_VALUES)) {
    for (const part of raw.split(",").slice(0, MAX_PARAM_VALUES)) {
      const key = part.trim().toLowerCase();
      if (key.length === 0 || key.length > MAX_VALUE_LENGTH) {
        continue;
      }
      const option = optionsByKey.get(key);
      if (option && !options.includes(option)) {
        options.push(option);
      }
    }
  }

  if (options.length === 0) {
    return null;
  }

  const services = sortServices(options.filter(isServiceName));

  if (services.length > 1) {
    return { service: "More than one", services };
  }
  if (services.length === 1) {
    return { service: services[0], services };
  }
  // Only non-service options such as "Not sure yet": use the first one.
  return { service: options[0], services: [] };
}
