export type HeaderVariant = "classic" | "topbar" | "centered";
export type HeroVariant = "overlay" | "split" | "centered" | "editorial" | "card" | "fullsplit";
export type ServicesVariant = "bento" | "cards" | "list" | "scroller" | "tiles";
export type ProcessVariant = "split" | "timeline" | "cards";
export type TrustVariant = "cards" | "list" | "strip";
export type PromiseVariant = "grid" | "list";
export type CardsVariant = "cards" | "overlay";
export type CtaVariant = "panel" | "band" | "split" | "minimal";
export type FaqVariant = "split" | "stacked";
export type FooterVariant = "columns" | "wordmark";

export type LayoutSections = {
  header: HeaderVariant;
  hero: HeroVariant;
  services: ServicesVariant;
  process: ProcessVariant;
  trust: TrustVariant;
  promise: PromiseVariant;
  cards: CardsVariant;
  cta: CtaVariant;
  faq: FaqVariant;
  footer: FooterVariant;
};

export type LayoutTokens = {
  corners: "round" | "soft" | "sharp" | "xl";
  type: "serif" | "editorial" | "sans" | "grotesk" | "condensed" | "light" | "caps" | "tech";
  panels: "inset" | "bleed";
  eyebrow: "line" | "pill" | "dot" | "plain";
};

export type LayoutPreset = {
  id: string;
  name: string;
  description: string;
  tokens: LayoutTokens;
  sections: LayoutSections;
};

export const layoutStorageKey = "sc-layout";

export const layouts: LayoutPreset[] = [
  {
    id: "soft-panels",
    name: "Soft Panels",
    description: "Current default: rounded panels, serif headings, bento services",
    tokens: { corners: "round", type: "serif", panels: "inset", eyebrow: "line" },
    sections: { header: "classic", hero: "overlay", services: "bento", process: "split", trust: "cards", promise: "grid", cards: "cards", cta: "panel", faq: "split", footer: "columns" },
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Magazine headline above a wide photo, numbered service list",
    tokens: { corners: "sharp", type: "editorial", panels: "bleed", eyebrow: "plain" },
    sections: { header: "centered", hero: "editorial", services: "list", process: "timeline", trust: "list", promise: "list", cards: "overlay", cta: "minimal", faq: "stacked", footer: "wordmark" },
  },
  {
    id: "bold-modern",
    name: "Bold Modern",
    description: "Heavy grotesk type, centred full-bleed hero, accent CTA band",
    tokens: { corners: "soft", type: "grotesk", panels: "bleed", eyebrow: "pill" },
    sections: { header: "classic", hero: "centered", services: "cards", process: "cards", trust: "cards", promise: "grid", cards: "cards", cta: "band", faq: "split", footer: "columns" },
  },
  {
    id: "classic-contractor",
    name: "Classic Contractor",
    description: "Contact bar, quote card in the hero, icon service tiles",
    tokens: { corners: "soft", type: "sans", panels: "inset", eyebrow: "pill" },
    sections: { header: "topbar", hero: "card", services: "tiles", process: "timeline", trust: "strip", promise: "grid", cards: "cards", cta: "panel", faq: "split", footer: "columns" },
  },
  {
    id: "minimal-architectural",
    name: "Minimal Architectural",
    description: "Light type, lots of space, side-scrolling services",
    tokens: { corners: "sharp", type: "light", panels: "bleed", eyebrow: "plain" },
    sections: { header: "centered", hero: "split", services: "scroller", process: "timeline", trust: "list", promise: "list", cards: "cards", cta: "minimal", faq: "stacked", footer: "wordmark" },
  },
  {
    id: "split-screen",
    name: "Split Screen",
    description: "Half photo, half copy, from the hero down",
    tokens: { corners: "sharp", type: "serif", panels: "bleed", eyebrow: "line" },
    sections: { header: "classic", hero: "fullsplit", services: "list", process: "split", trust: "list", promise: "grid", cards: "overlay", cta: "split", faq: "split", footer: "columns" },
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Condensed uppercase type, hard edges, job-site energy",
    tokens: { corners: "sharp", type: "condensed", panels: "bleed", eyebrow: "pill" },
    sections: { header: "topbar", hero: "centered", services: "cards", process: "cards", trust: "strip", promise: "grid", cards: "overlay", cta: "band", faq: "stacked", footer: "columns" },
  },
  {
    id: "friendly",
    name: "Friendly Rounded",
    description: "Extra-round cards and buttons, split hero, warm and approachable",
    tokens: { corners: "xl", type: "grotesk", panels: "inset", eyebrow: "dot" },
    sections: { header: "classic", hero: "split", services: "cards", process: "cards", trust: "cards", promise: "grid", cards: "cards", cta: "panel", faq: "split", footer: "columns" },
  },
  {
    id: "magazine",
    name: "Magazine",
    description: "Editorial serif with a bento grid and timeline",
    tokens: { corners: "soft", type: "editorial", panels: "inset", eyebrow: "line" },
    sections: { header: "centered", hero: "editorial", services: "bento", process: "timeline", trust: "list", promise: "list", cards: "overlay", cta: "minimal", faq: "stacked", footer: "wordmark" },
  },
  {
    id: "luxury",
    name: "Luxury",
    description: "Wide-tracked uppercase serif, centred hero, quiet details",
    tokens: { corners: "sharp", type: "caps", panels: "bleed", eyebrow: "plain" },
    sections: { header: "centered", hero: "centered", services: "scroller", process: "split", trust: "list", promise: "list", cards: "overlay", cta: "minimal", faq: "stacked", footer: "wordmark" },
  },
  {
    id: "tech",
    name: "Tech Clean",
    description: "Space Grotesk, quote card hero, icon tiles",
    tokens: { corners: "soft", type: "tech", panels: "inset", eyebrow: "pill" },
    sections: { header: "classic", hero: "card", services: "tiles", process: "cards", trust: "cards", promise: "grid", cards: "cards", cta: "band", faq: "split", footer: "columns" },
  },
  {
    id: "compact-pro",
    name: "Compact Pro",
    description: "Dense and practical: contact bar, split hero, tiles and timeline",
    tokens: { corners: "soft", type: "sans", panels: "bleed", eyebrow: "dot" },
    sections: { header: "topbar", hero: "split", services: "tiles", process: "timeline", trust: "cards", promise: "list", cards: "cards", cta: "panel", faq: "stacked", footer: "columns" },
  },
  {
    id: "gallery",
    name: "Gallery",
    description: "Photo-led: full split hero, scrolling services, image CTA",
    tokens: { corners: "round", type: "serif", panels: "inset", eyebrow: "dot" },
    sections: { header: "classic", hero: "fullsplit", services: "scroller", process: "cards", trust: "strip", promise: "grid", cards: "overlay", cta: "split", faq: "split", footer: "wordmark" },
  },
  {
    id: "blueprint",
    name: "Blueprint",
    description: "Condensed type, editorial hero, numbered lists and timeline",
    tokens: { corners: "sharp", type: "condensed", panels: "bleed", eyebrow: "plain" },
    sections: { header: "centered", hero: "editorial", services: "list", process: "timeline", trust: "strip", promise: "list", cards: "cards", cta: "band", faq: "stacked", footer: "columns" },
  },
  {
    id: "studio",
    name: "Studio",
    description: "Light sans headings with rounded panels and bento grid",
    tokens: { corners: "round", type: "light", panels: "inset", eyebrow: "pill" },
    sections: { header: "classic", hero: "overlay", services: "bento", process: "cards", trust: "cards", promise: "list", cards: "overlay", cta: "split", faq: "stacked", footer: "wordmark" },
  },
  {
    id: "heritage",
    name: "Heritage",
    description: "Classic serif, contact bar, quote card and service list",
    tokens: { corners: "soft", type: "serif", panels: "bleed", eyebrow: "line" },
    sections: { header: "topbar", hero: "card", services: "list", process: "split", trust: "strip", promise: "grid", cards: "cards", cta: "split", faq: "split", footer: "columns" },
  },
];

export const defaultLayout = layouts[0];

export function layoutScript() {
  const map = Object.fromEntries(layouts.map((l) => [l.id, l.tokens]));
  return `try{var m=${JSON.stringify(map)};var id=localStorage.getItem(${JSON.stringify(layoutStorageKey)});var t=m[id];if(t){var h=document.documentElement;h.setAttribute("data-layout",id);for(var k in t)h.setAttribute("data-"+k,t[k]);if(id!==${JSON.stringify(defaultLayout.id)}){h.setAttribute("data-layout-pending","");setTimeout(function(){h.removeAttribute("data-layout-pending")},2500);}}}catch(e){}`;
}

export function applyLayoutTokens(preset: LayoutPreset) {
  const h = document.documentElement;
  h.setAttribute("data-layout", preset.id);
  for (const [k, v] of Object.entries(preset.tokens)) h.setAttribute(`data-${k}`, v);
}
