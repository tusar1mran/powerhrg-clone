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
  "h-16 w-full border-0 border-b-4 border-sky bg-white px-3 text-[20px] leading-7 text-navy outline-none placeholder:text-navy/60 focus:border-navy aria-[invalid=true]:border-[#b42318]";

// "service" and "consent" start empty, so the select shows its prompt and the box is unchecked.
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
    <p id={id} className="mt-2 text-[14px] text-[#b42318]">
      {error.message}
    </p>
  );
}

function Field({ label, error, errorId, children }: { label: string; error?: FieldError; errorId: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
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
    <section id={id} className="scroll-mt-24 bg-sky-soft px-6 py-6 text-navy lg:bg-white lg:py-24">
      <Reveal className="mx-auto max-w-[1150px] md:bg-sky-soft lg:px-20 lg:py-10">
        <h2 className="mb-4 text-center text-[22px] leading-[1.3] font-light tracking-[2px] uppercase lg:text-[30px] lg:tracking-[3px] xl:text-[47px] xl:tracking-[5px]">
          {sent ? success.title : title}
        </h2>
        {sent ? (
          <p role="status" className="pb-10 text-center text-[16px] xl:text-[20px]">
            {success.text}
          </p>
        ) : (
          <>
            {intro && <p className="mx-auto mb-8 max-w-[640px] text-center text-[16px] leading-[1.45] xl:text-[18px]">{intro}</p>}
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
                    className="mt-[2px] h-5 w-5 shrink-0 rounded-sm border-4 border-sky accent-navy"
                    {...register("consent")}
                  />
                  <span className="text-[13px] leading-[19px]">{consent}</span>
                </label>
                <FieldMessage id={`${id}-consent-error`} error={errors.consent} />
              </div>

              {formError && (
                <p role="alert" className="text-[15px] text-[#b42318]">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="bg-lime px-4 py-3 text-[14px] leading-5 font-bold tracking-[0.3em] text-navy uppercase transition-colors hover:bg-navy hover:text-lime disabled:cursor-wait disabled:opacity-60 lg:px-8 lg:py-6"
              >
                {pending ? "Sending…" : submit}
              </button>
            </form>
          </>
        )}
      </Reveal>
    </section>
  );
}
