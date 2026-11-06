// Turns the services chosen elsewhere on the site (e.g. the homepage selection tray) into
// starting values for the quote form. Pure, so the form component only has to apply the result.
import type { ServiceName } from "../links";
import type { ContactValues } from "./schema";

export type QuotePrefill = {
  service: ContactValues["service"];
  /** Text to place in the message box, or null to leave it alone. */
  message: string | null;
};

/**
 * One service selects that service. Several select "More than one" and list them in the message,
 * because the form's `service` field holds a single value.
 */
export function quotePrefill(services: readonly ServiceName[], notePrefix: string): QuotePrefill | null {
  if (services.length === 0) {
    return null;
  }

  if (services.length === 1) {
    return { service: services[0], message: null };
  }

  return {
    service: "More than one",
    message: `${notePrefix} ${services.join(", ")}.`,
  };
}
