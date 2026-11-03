# Image assets

Images come from the reference pages saved with "Save page as" (C:\Users\imran\Downloads\*Power Home Remodeling*).
File names were matched to the live page DOM, so each image sits where it does on powerhrg.com.
These images, logos and badges belong to their owners - keep this project local, for study only.

## Still missing

Save each file from the live page (right-click -> Save image as, or DevTools -> Network -> Img), rename it
to the "Save as" name and drop it into this folder. Until then the slot shows a plain colour block.

| Save as (in public/assets) | File name on powerhrg.com | Page / section |
|---|---|---|
| home/hero.png | homepage_hero_desktop.png | Home hero (desktop). Mobile image is used as fallback until then |
| people/about.jpg | Rectangle-130.jpg | Home - "Power is our people" About card |
| carousel/windows.jpg | Window-01.jpg | Services carousel (home + /services) |
| carousel/roofing.jpg | ROOFING.jpg | Services carousel |
| carousel/siding.jpg | SIDING.jpg | Services carousel |
| carousel/doors.jpg | Door-01.jpg | Services carousel |
| carousel/accessories.jpg | ACCESSORIES.jpg | Services carousel |
| services-page/hero.png | 4096-2731-max-41-2.png | /services hero (desktop) |
| services-page/hero-mobile.jpg | all-services-m-1.jpg | /services hero (mobile) |
| services-page/same-address.png | 4096-2731-max-41-1.png | /services "Same address, whole new vibe" |
| services-page/before.png, after.png | Rectangle-115.png, Rectangle-130.png | /services "Our work shows" slider (check which one is the old house) |
| services-page/licenses.jpg | LICENSE-AND-INURANCE.jpg | /services "Reasons to relax" - Licenses |
| services-page/warranties.jpg | page-link-warranties.jpg | /services "Reasons to relax" - Warranties |
| services-page/project-pulse.jpg | (Vimeo video, no image file) | "Track your project" phone - optional still image |
| windows/hero.png | WINDOWS.png | /services/windows hero (desktop). Mobile image is the fallback |
| siding/before.png | Rectangle-137.png | /services/siding before/after slider |
| doors/before.png | Rectangle-131.png | /services/doors before/after slider |

## In place

| Folder | Contents | Source file names |
|---|---|---|
| logo/ | power-white.svg, power-navy.svg (header), power-lime.svg (footer), pledge1.svg | inline SVGs saved as "default (20/21/…).svg" |
| social/ | youtube, linkedin, instagram, tiktok, facebook (.svg) | footer social icons |
| icons/ | feature icons (ENERGY.svg, SECURE.svg … REFLECTIVE.png) | same names on the reference |
| awards/ | angi.png, bbb.png, google.svg, bobvila.png, energy.svg | SSA-2025_800px.png, webnus-bbb-share-p.png, Google.svg, 2025-bob-vila-editors-choice-award2.png, Energy-Savings.svg |
| footer/ | angi, bbb, bobvila, best-place-to-work, top-100 (.jpg) | angi-super-service-2025, bbb-a-plus-rating, bobvila_logo, glassdoor-best-places-to-work, fortune-100 |
| shared/ | guarantee.jpg, pulse-bg.png, pulse-logo.png | Rectangle-109.jpg, Screenshot-2023-06-07-at-8.59-1-1.png, pulse-logo.png |
| home/ | hero-mobile.jpg | homepage_hero_mobile.jpg |
| people/ | careers.jpg | Rectangle-5.jpg |
| carousel/ | insulation.jpg | INSULATION.jpg |
| services-page/partners/ | gaf, pella, promaterials, provia, westlake, certainteed (.svg) | partner_*.svg, patern_pella.svg, Certainteed_logo_Pantone.svg |
| windows/ | hero-mobile.png, before.jpg, after.jpg | WINDOWS-M-2.png, Window-Before.jpg, Window-After.jpg |
| roofing/ | hero.png, hero-mobile.png, gaf-logo.png, gaf-premium-badge.svg, before.png, after.png, swatches/*.png | ROOFING-D-1, ROOFING-M, gaf-logo-svg, Premium-System-Professional-1, Rectangle-135/136, Shingles_* |
| siding/ | hero.jpg, hero-mobile.jpg, after.png | siding-D, siding-M, Rectangle-138 |
| doors/ | hero.png, after.png | DOORS-D.png, Rectangle-132.png |
| insulation/ | hero.jpg, hero-mobile.jpg, gallery/1-7.jpg | insulation-D/M; gallery in DOM order: TPA_…9254, 9258, 9259, INSULATION, CHI_…024, 049, 057 |
| accessories/ | hero.jpg, hero-mobile.jpg, window/1-4, door/1-8, siding/1-6, roofing/1-4 | Accessories-D/M; galleries in DOM order (see src/lib/accessories-content.ts) |

## /about, /about/community, /about/belonging, /about/news

All in place from the "Save page as" zips. Each path in src/lib/about-content.ts, community-content.ts,
belonging-content.ts and news-content.ts has the original file name in a comment next to it.

- Still missing: community/video-poster.jpg - the reference plays a Vimeo video there (optional still image).
- Extra from the zips: community/pledge1-band.svg (white Pledge 1% mark) and community/open-file-icon.png.


## /careers, /careers/innovations, /careers/partner-with-power, /careers/openings

Careers, Innovations and Partner images are in place from the "Save page as" zips
(careers/, innovations/, partner/ - accolade logos keep their original file names).
Mapped from the live DOM: careers/technology.png = Screenshot-2023-06-07-at-8.59-15.png,
careers/development.png = DPCA_PHL_36-74271_072-1.png, innovations/nitro.jpg = nitro-create.jpg,
innovations/nitro-bg.png = NITRO-BG-03.png, innovations/tim.jpg = 4096-2731-max-scaled.jpg,
partner/icons: great-pay = Group-31494.png, reliable-work = Group-3.png, vital-support = Group-1-2.png.

Still missing:

| Save as (in public/assets) | File name on powerhrg.com |
|---|---|
| openings/hero.jpg | openings-hero-img-scaled.jpg |
| openings/hero-mobile.jpg | openings-hero-img-mobile-1.jpg |
| innovations/video-poster.jpg | (Vimeo video - optional still) |
| partner/video-poster.jpg | (Vimeo video - optional still) |

## /support, /support/tax-credits, /support/warranties, /support/bill-of-rights, /support/project-pulse

All in place from the "Save page as" folders in C:\Users\imran\Downloads\Support (support/).
support/home: licenses.jpg = page-link-licenses.jpg, tax-credits.png = Rectangle-1101.png, warranties.jpg = Rectangle-109.jpg.
support/tax-credits: hero.png = Rectangle-110.png, hero-mobile.jpg = TAX-CREDITS-IMG-768x1174.jpg.
support/bill-of-rights: hero.png = Rectangle-3.png, licenses.png = Rectangle-93.png, warranties.jpg = page-link-warranties.jpg,
numbers/1-10.svg = Group-608 … Group-617.svg, slides/1-10.svg = BOR-1 … BOR-10 (slider numerals).
support/project-pulse: hero.png = Hero_Desktop-1.png, hero-mobile.png = Hero_Mobile.png, view-projects.png = View-Projects-3.png,
track-appointments.png = track-appointments-phone-mockup-e1773927209819.png, manage-documents.png = Manage-Documents_3.png,
good-housekeeping.jpg = 7c2b1f837470ae397a6e1bb6034e10bdf2491495-1.jpg, ruby-central.jpg = Rectangle-5.jpg.
support/warranties: hero.png = Rectangle-109.png, open-file-icon.png = open_file_icon.png.

Still missing:

| Save as (in public/assets) | File name on powerhrg.com |
|---|---|
| support/bill-of-rights/video-poster.jpg | (Vimeo 1024746868 - optional still) |
| support/project-pulse/video-poster.jpg | (Vimeo 944556647 - optional still) |
| support/locations/map.png | (interactive US map plugin - a screenshot of the map) |
| support/our-process/free-estimate.jpg | free-estimate.jpg (CSS background, not in the save) |
| support/our-process/consult.png | consult.png (CSS background, not in the save) |
| support/our-process/production.jpg | production.jpg (CSS background, not in the save) |
| support/our-process/install.jpg | install.jpg (CSS background, not in the save) |
| support/sash/number-bg.png | number_bg.png (step number background, theme image) |
| support/sash/video-poster.jpg | (Vimeo 896334981 - optional still) |

## /support/locations, /support/our-process, /support/licenses-and-insurance, /sash-replacement-how-to

support/locations: offices/<city>.jpg|jpeg from the office photos (default.jpeg = EXP25_JAX_OfficePhotography_5052, used by cities
without their own photo), services.png = Rectangle-93.png, warranties.jpg = page-link-warranties.jpg, icons/phone|fax|map.svg (inline SVGs).
support/our-process: hero.jpg = our_process_hero.jpg, phone.png, project-pulse-logo.svg = PROJECT-PULSE.svg,
icons/light-check|dark-check|step-2|step-3|step-4.svg.
support/licenses: hero.jpg = LICENSE-AND-INURANCE-HERO-scaled.jpg, hero-mobile.jpg = LICENSE-AND-INSURANCE-HERO-M-768x975.jpg,
certificate.png = Rectangle-110.png.
support/sash: hero.png = SASH_D-2.png, hero-mobile.png = WINDOWS-M-2-768x1173.png, step-1…6.jpg = STEP-1.jpg, STEP-2…6-scaled.jpg.
