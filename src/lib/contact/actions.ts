"use server";

import { z } from "zod";
import { site } from "../site";
import { MailerNotConfiguredError, sendContactEmail } from "./mailer";
import { contactSchema, type ContactState } from "./schema";

/**
 * Server Action for the contact / free-quote form. It is a public endpoint (anyone can POST to it),
 * so the input is validated again here, whatever the browser already checked.
 */
export async function submitContact(input: unknown): Promise<ContactState> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  // Honeypot filled in: answer as if it worked so bots get no signal, but send nothing.
  if (parsed.data.company) {
    return { status: "success" };
  }

  try {
    await sendContactEmail(parsed.data);
    return { status: "success" };
  } catch (error) {
    // Never log the submitted values; they are personal information.
    const reason = error instanceof MailerNotConfiguredError ? error.message : "Contact email delivery failed.";
    console.error(`[contact] ${reason}`, error instanceof Error ? error.name : "");
    return {
      status: "error",
      message: `Sorry, we couldn’t send your message. Please call us at ${site.phone.display} or email ${site.email}.`,
    };
  }
}
