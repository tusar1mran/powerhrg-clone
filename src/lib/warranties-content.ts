import type { FaqGroup } from "@/components/services/Faq";
import type { TextBlock } from "@/components/support/TextColumns";

const pdf = "https://www.powerhrg.com/wp-content/uploads";

export const warrantiesHero = {
  title: ["Some warranties", "are more powerful"],
  subtitle: [
    "You can download your manufacturer’s warranty and our limited lifetime labor warranty here. If you ever need to make a claim, contact us — we’re here to help.",
  ],
  image: "/assets/support/warranties/hero.png",
};

export const laborWarranty: TextBlock[][] = [
  [{ link: { label: "Limited Lifetime Labor Warranty PDF", href: `${pdf}/2024/04/Power-Labor-Warranty-24.pdf` }, file: true }],
  [],
];

export const manufacturerWarranties: TextBlock[][] = [
  [
    { h3: ["MANUFACTURER", "WARRANTIES"] },
    { link: { label: "Door Warranties PDF", href: `${pdf}/2023/09/Power_Door_Warranties_2023.pdf` }, file: true },
    { link: { label: "Roofing Warranties PDF", href: `${pdf}/2026/01/PowerRoofingWarranties-2025.pdf` }, file: true },
    { link: { label: "Window Warranties PDF", href: `${pdf}/2026/01/Power-Window-Warranties-2025-1.pdf` }, file: true },
    { link: { label: "Insulation Warranties PDF", href: `${pdf}/2023/09/Pro-Materials-Direct-MLI-Product-Warranty.pdf` }, file: true },
    { link: { label: "Skylight Warranties PDF", href: `${pdf}/2024/02/Skylight_Warranties.pdf` }, file: true },
  ],
  [
    { h3: ["SIDING"] },
    { link: { label: "ACCENT SHINGLES pdf", href: `${pdf}/2023/09/Accented-Shingle-2016.pdf` }, file: true },
    { link: { label: "TRADITIONAL 4.5″ pdf", href: `${pdf}/2023/09/Traditional_Warranty-2016.pdf` }, file: true },
    { link: { label: "SOLID CORE 6″ pdf", href: `${pdf}/2025/04/solidcore-2025.pdf` }, file: true },
    { link: { label: "STONE MANOR pdf", href: `${pdf}/2023/09/Stone-Manor-1.pdf` }, file: true },
  ],
];

export const warrantiesFaqs: FaqGroup[] = [
  {
    tab: "",
    items: [
      {
        q: "What does POWER’s warranty cover?",
        a: [
          "Power Home Remodeling includes a ",
          { label: "limited lifetime labor warranty", href: `${pdf}/2024/04/Power-Labor-Warranty-24.pdf` },
          " on all of its installations. That means if anything comes up as a result of the installation, POWER will work with you to get it resolved.",
        ],
        more: [
          "The products installed by POWER are manufactured and warrantied by leading external partners, with which POWER has longstanding relationships. POWER facilitates manufacturer’s warranty claims on behalf of our customers/homeowners.",
        ],
      },
      {
        q: "What’s the difference between product and labor warranties?",
        a: "A product warranty comes from the manufacturer and covers defects or issues with the actual materials (like the window glass, roofing shingles, or siding panels).",
        more: [
          "A labor warranty, on the other hand, comes directly from POWER. It covers the quality of our installation work — meaning if anything goes wrong because of how the product was installed, we’ll fix it at no cost to you, for as long as you own your home.",
        ],
      },
      {
        q: "Why does my GAF warranty say sample?",
        a: [
          "Your GAF Warranty says sample because on Project Pulse, all customers will have copies of all their warranties. For more information on your specific warranty, please use POWER’s ",
          { label: "Project Pulse", href: "/support/project-pulse" },
          " service, and it will provide you with all your necessary warranty information.",
        ],
      },
      {
        q: "How do I transfer a warranty to a new homeowner?",
        a: [
          "If you’re selling your home, provide your project number and documentation (which can be found on ",
          { label: "Project Pulse", href: "/support/project-pulse" },
          " or by calling Customer Support at 888-736-6335) to the new homeowner. The new owner should also contact Customer Support within 30 days of closing. Our team will walk them through the quick process.",
        ],
      },
    ],
  },
];
