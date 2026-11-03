"use client";

import { useState, type FormEvent } from "react";
import Reveal from "../Reveal";

type Props = { title: string; reasons: string[]; consent: string; submit: string };

const field =
  "h-16 w-full border-0 border-b-4 border-sky bg-white px-3 text-[20px] leading-7 text-navy outline-none placeholder:text-navy/60 focus:border-navy";

export default function ContactForm({ title, reasons, consent, submit }: Props) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="form" className="bg-sky-soft px-6 py-6 text-navy lg:bg-white lg:py-24">
      <Reveal className="mx-auto max-w-[1150px] md:bg-sky-soft lg:px-20 lg:py-10">
        <h2 className="mb-8 text-center text-[22px] leading-[1.3] font-light tracking-[2px] uppercase lg:text-[30px] lg:tracking-[3px] xl:text-[47px] xl:tracking-[5px]">
          {title}
        </h2>
        {sent ? (
          <p className="pb-10 text-center text-[16px] xl:text-[20px]">Thanks for reaching out. This study clone does not send messages.</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <label className="block">
              <span className="sr-only">Name (Required)</span>
              <input type="text" name="name" required placeholder="Name" className={field} />
            </label>
            <label className="block">
              <span className="sr-only">Email (Required)</span>
              <input type="email" name="email" required placeholder="Email" className={field} />
            </label>
            <label className="block">
              <span className="sr-only">Phone (Required)</span>
              <input type="tel" name="phone" required placeholder="Phone" className={field} />
            </label>
            <label className="block">
              <span className="sr-only">Reason for Inquiry (Required)</span>
              <select name="reason" required defaultValue="" className={field}>
                <option value="" disabled>
                  Reason for Inquiry
                </option>
                {reasons.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="sr-only">Message (Required)</span>
              <textarea name="message" required placeholder="Message" rows={6} className={`${field} h-auto py-3`} />
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" name="consent" className="mt-[2px] h-5 w-5 shrink-0 rounded-sm border-4 border-sky accent-navy" />
              <span className="text-[12px] leading-[18px]">{consent}</span>
            </label>
            <button
              type="submit"
              className="bg-lime px-4 py-3 text-[14px] leading-5 font-bold tracking-[0.3em] text-navy uppercase transition-colors hover:bg-navy hover:text-lime lg:px-8 lg:py-6"
            >
              {submit}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
