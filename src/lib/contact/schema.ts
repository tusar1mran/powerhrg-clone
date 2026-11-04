// Contact / free-quote form schema. Shared by the client form (instant feedback) and the
// server action (the trust boundary), so both always apply the same rules.
import { z } from "zod";
import { serviceLinks } from "../links";

export const serviceOptions = [...serviceLinks.map((s) => s.name), "More than one", "Not sure yet", "Question about my project"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Please keep your name under 100 characters."),
  email: z.email("Please enter a valid email address.").trim().max(254, "Please enter a shorter email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+().\-\s]{7,20}$/, "Please enter a valid phone number."),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a 5-digit ZIP code."),
  service: z.enum(serviceOptions, "Please choose what you need help with."),
  message: z.string().trim().max(2000, "Please keep your message under 2,000 characters."),
  consent: z.literal(true, "Please agree so we can contact you about your request."),
  // Honeypot: hidden from people, often filled in by bots. Must stay empty.
  company: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactValues, string[]>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors };
