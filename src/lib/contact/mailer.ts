import "server-only";
import { z } from "zod";
import type { ContactValues } from "./schema";

// Delivery settings come from the environment (see .env.example). Nothing here is ever sent to the browser.
const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_TO_EMAIL: z.email(),
  CONTACT_FROM_EMAIL: z.string().min(3),
});

export class MailerNotConfiguredError extends Error {
  constructor() {
    super("Contact form email delivery is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    this.name = "MailerNotConfiguredError";
  }
}

function readEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new MailerNotConfiguredError();
  }
  return parsed.data;
}

// Collapses line breaks so user input can't add lines to the subject.
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function buildText(values: ContactValues): string {
  return [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `ZIP code: ${values.zip}`,
    `Service: ${values.service}`,
    "",
    "Message:",
    values.message || "(no message)",
  ].join("\n");
}

/**
 * Sends the enquiry to the office inbox as plain text (no HTML, so user input can't inject markup).
 * Uses the Resend HTTP API directly: https://resend.com/docs/api-reference/emails/send-email
 */
export async function sendContactEmail(values: ContactValues): Promise<void> {
  const env = readEnv();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: values.email,
      subject: singleLine(`Quote request: ${values.service} – ${values.name} (${values.zip})`),
      text: buildText(values),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    // Log the status only; the response body can echo the customer's details.
    throw new Error(`Resend responded with ${response.status}`);
  }
}
