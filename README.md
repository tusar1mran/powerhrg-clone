# Shah & Crew website

Marketing site for Shah & Crew, an exterior home renovation company (windows, roofing, siding, doors, insulation and accessories).

Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, zod and React Hook Form.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |

## Where things live

| Path | Contents |
|---|---|
| `src/lib/site.ts` | Business details: name, phone, email, address, hours, license, insurance, service area, social links |
| `src/lib/links.ts` | Internal routes and section anchors |
| `src/lib/*-content.ts` | Page copy (one file per page) |
| `src/lib/contact/` | Quote form schema (zod), Server Action and email delivery |
| `src/components/` | Presentational components |
| `public/assets/` | Logo and photos (see `public/assets/README.md` and `CREDITS.md`) |
| `design/` | Logo build script and logo concepts |

## Quote form

The form on `/support#quote` is validated in the browser and again in a Server Action, then emailed as plain text
through the [Resend](https://resend.com) API. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`
(see `.env.example`). Without them, the form shows an error asking the visitor to call or email instead.

Spam protection is a hidden honeypot field. If spam becomes a problem, add rate limiting at the hosting layer
or a CAPTCHA such as Cloudflare Turnstile.

## Before launch

- [ ] Replace every value marked `PLACEHOLDER` in `src/lib/site.ts` (phone, email, address, hours, license, insurance, service area, legal name).
- [ ] Add the state license lookup URL (`site.license.lookupUrl`) so homeowners can verify the license.
- [ ] Set the environment variables from `.env.example` in production, and send a test quote request.
- [ ] Have an attorney review `src/lib/legal-content.ts` (Terms of Service and Privacy Notice).
- [ ] Confirm the commitments in the copy match how the business runs: written workmanship warranty, final payment after the walk-through, reply within one business day, permits pulled, own crew (no subcontractors).
- [ ] Replace stock photos with your own project photos as they become available.
