"use client";

import { useState, useTransition, type ReactNode } from "react";
import { useForm, type DefaultValues, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Reveal from "../Reveal";
import { submitContact } from "@/lib/contact/actions";
import {
  contactSchema,
  serviceOptions,
  type ContactFieldErrors,
  type ContactInput,
  type ContactValues,
} from "@/lib/contact/schema";

type Props = {
  id?: string;
  title: string;
  intro?: string;
  consent: string;
  submit: string;
  success: { title: string; text: string };
};

const field =
  "h-13 w-full rounded-xl border border-line bg-paper px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-muted/70 hover:border-ink/30 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-danger";

// "service" and "consent" start empty, so the select shows its prompt and the box is unchecked.
const nextSteps = ["We call to book a time that suits you", "We measure and inspect on site", "You get an itemized written quote"];

const defaultValues: DefaultValues<ContactInput> = {
  name: "",
  email: "",
  phone: "",
  zip: "",
  message: "",
  company: "",
};

function FieldMessage({ id, error }: { id: string; error?: FieldError }) {
  if (!error?.message) {
    return null;
  }
  return (
    <p id={id} className="mt-2 text-[14px] text-danger">
      {error.message}
    </p>
  );
}

function Field({ label, error, errorId, children }: { label: string; error?: FieldError; errorId: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-bold text-ink">{label}</span>
      {children}
      <FieldMessage id={errorId} error={error} />
    </label>
  );
}

// Free-quote / contact form. Validates in the browser with the shared zod schema, then calls the
// submitContact Server Action, which validates again and emails the office.
export default function ContactForm({ id = "quote", title, intro, consent, submit, success }: Props) {
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = (values: ContactValues) => {
    setFormError(null);
    startTransition(async () => {
      const result = await submitContact(values);
      if (result.status === "success") {
        setSent(true);
        return;
      }
      if (result.status === "error") {
        setFormError(result.message);
        const fieldErrors: ContactFieldErrors = result.fieldErrors ?? {};
        for (const [name, messages] of Object.entries(fieldErrors)) {
          const message = messages?.[0];
          if (message) {
            setError(name as keyof ContactValues, { type: "server", message });
          }
        }
      }
    });
  };

  const describedBy = (name: keyof ContactValues) => (errors[name] ? `${id}-${name}-error` : undefined);

  return (
    <section id={id} className="scroll-mt-24 py-4">
      <div className="inset-panel bg-cream">
        <Reveal className="container-page grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow text-accent-ink">Free estimate</p>
            <h2 className="display-2 mt-4 text-brand">{sent ? success.title : title}</h2>
            {!sent && intro && <p className="lead mt-5 max-w-[440px] text-muted">{intro}</p>}
            <ol className="mt-8 space-y-4">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-4 text-[16px] text-ink">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-display text-[16px] text-accent-ink">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8 lg:p-10">
        {sent ? (
          <p role="status" className="lead text-ink">
            {success.text}
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Name (required)" error={errors.name} errorId={`${id}-name-error`}>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Name"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={describedBy("name")}
                    className={field}
                    {...register("name")}
                  />
                </Field>
                <Field label="Email (required)" error={errors.email} errorId={`${id}-email-error`}>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={describedBy("email")}
                    className={field}
                    {...register("email")}
                  />
                </Field>
                <Field label="Phone (required)" error={errors.phone} errorId={`${id}-phone-error`}>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone"
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={describedBy("phone")}
                    className={field}
                    {...register("phone")}
                  />
                </Field>
                <Field label="ZIP code (required)" error={errors.zip} errorId={`${id}-zip-error`}>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="ZIP code"
                    aria-invalid={errors.zip ? true : undefined}
                    aria-describedby={describedBy("zip")}
                    className={field}
                    {...register("zip")}
                  />
                </Field>
              </div>

              <Field label="What do you need help with? (required)" error={errors.service} errorId={`${id}-service-error`}>
                <select
                  defaultValue=""
                  aria-invalid={errors.service ? true : undefined}
                  aria-describedby={describedBy("service")}
                  className={field}
                  {...register("service")}
                >
                  <option value="" disabled>
                    What do you need help with?
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Tell us about your project (optional)" error={errors.message} errorId={`${id}-message-error`}>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project (optional)"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={describedBy("message")}
                  className={`${field} h-auto py-3`}
                  {...register("message")}
                />
              </Field>

              {/* Honeypot: hidden from people and screen readers. Bots that fill it in are ignored. */}
              <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
                <label>
                  Company
                  <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
                </label>
              </div>

              <div>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={describedBy("consent")}
                    className="mt-[2px] h-5 w-5 shrink-0 accent-brand"
                    {...register("consent")}
                  />
                  <span className="text-[13px] leading-[19px] text-muted">{consent}</span>
                </label>
                <FieldMessage id={`${id}-consent-error`} error={errors.consent} />
              </div>

              {formError && (
                <p role="alert" className="text-[15px] text-danger">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="btn btn-accent w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                {pending ? "Sending…" : submit}
              </button>
            </form>
          </>
        )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
