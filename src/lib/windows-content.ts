// Copy and image paths for /services/windows. Photos are in /public/assets/photos (see public/assets/CREDITS.md).
import type { FaqGroup } from "@/components/services/Faq";
import type { Feature } from "@/components/services/FeatureIcons";
import { links } from "./links";
import { guarantee } from "./services-content";
import { site } from "./site";

export const windowsHero = {
  title: ["New windows,", "fitted right"],
  subtitle: ["Replacement windows measured for each opening,", "then installed and sealed by our own crew."],
  image: "/assets/photos/windows-hero.jpg",
  overlay: true,
};

export const windowsIntro = {
  eyebrow: "Window replacement",
  title: "Measured for your openings, sealed for your weather",
  text: "A good window is only as good as the way it’s installed. We measure every opening, help you choose the style, frame and glass that suit the room, and seal each unit so it opens easily and keeps the weather where it belongs.",
};

export const windowsFeatures: Feature[] = [
  {
    icon: "measure",
    title: "Custom-measured",
    text: "Each window is ordered to the size of its opening, so we don’t have to pack gaps with filler or trim the frame to make it fit.",
  },
  {
    icon: "style",
    title: "Styles for every room",
    text: "Double-hung, casement, slider, picture, bay and bow windows. We’ll suggest what works for how you use each room.",
  },
  {
    icon: "lowMaintenance",
    title: "Vinyl or fiberglass frames",
    text: "Vinyl is easy to care for and good value. Fiberglass is stiffer and moves less as temperatures change. We’ll walk you through both.",
  },
  {
    icon: "energy",
    title: "Insulated glass",
    text: "Double- or triple-pane glass with low-E coatings, including ENERGY STAR certified options for your climate.",
  },
  {
    icon: "comfort",
    title: "Fewer drafts",
    text: "We insulate and seal the gap between the window and the wall, which is where many drafts around old windows come from.",
  },
  {
    icon: "lock",
    title: "Locks that latch",
    text: "Sashes are checked for smooth travel and a firm lock before we move on to the next opening.",
  },
  {
    icon: "installers",
    title: "Insert or full-frame",
    text: "We’ll tell you whether your existing frames are sound enough for an insert, or whether a full-frame replacement is the better fix.",
  },
  {
    icon: "cleanup",
    title: "Clean as we go",
    text: "Drop cloths inside, debris hauled away, and a walk through the house with you before we call it done.",
  },
];

export const windowsGuarantee = guarantee("/assets/photos/windows-card.jpg");

export const windowsCta = {
  title: ["Drafty, foggy", "or stuck?"],
  text: "We’ll look at your windows, explain your options and send a written quote. No charge, no pressure.",
  label: "Get a free quote",
  href: links.quote,
  tone: "sky" as const,
};

export const windowsFaqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "How do I know it’s time to replace my windows?",
        a: "Common signs are drafts you can feel, fog or moisture trapped between the panes, soft or rotting frames, and sashes that stick or won’t lock. If only one or two windows have problems, we’ll say so and quote just those.",
      },
      {
        q: "What’s the difference between insert and full-frame replacement?",
        a: "An insert window fits inside your existing frame, so the interior trim and siding stay in place. A full-frame replacement removes the old window down to the rough opening, which lets us inspect and repair rot and air leaks behind it. Inserts are faster and cost less when the old frames are solid.",
      },
      {
        q: "Should I choose vinyl or fiberglass frames?",
        a: "Vinyl is the most common choice because it’s affordable and needs very little upkeep. Fiberglass is stronger and expands less with temperature changes, which can help with large windows and dark colors. It usually costs more.",
      },
      {
        q: "Do I need double-pane or triple-pane glass?",
        a: "Double-pane glass with a low-E coating is a solid choice for most homes. Triple-pane adds another layer of insulation and can be worth it in colder climates or on rooms that face busy streets. We’ll price both so you can compare.",
      },
      {
        q: "What does ENERGY STAR certified mean for windows?",
        a: "ENERGY STAR is a program run by the U.S. Environmental Protection Agency. Certified windows meet efficiency criteria set for different climate regions of the country, so look for products certified for the region where you live.",
      },
    ],
  },
  {
    tab: "Process",
    items: [
      {
        q: "What happens at the estimate?",
        a: [
          "We look at each window, measure the openings, talk through styles and glass, and point out any rot or water damage we find. You’ll get a written quote afterward. ",
          { label: "See how our process works", href: links.process },
          ".",
        ],
      },
      {
        q: "How long until my windows are installed?",
        a: "Replacement windows are made to order, so there’s a wait between signing and installation that depends on the product and the time of year. Your written quote includes an expected install window, and we’ll confirm the date once the windows arrive.",
      },
      {
        q: "Can you replace windows in the winter?",
        a: "Yes. We work one opening at a time, so each one is open to the outside for as short a time as possible, and we close up the house at the end of each day.",
      },
      {
        q: "Do I need to be home on installation day?",
        a: "Someone over 18 should be home at the start of the day to let the crew in and confirm the plan, and again at the end for the walk-through. You don’t need to stay in one place in between.",
      },
      {
        q: "What should I do to get ready?",
        a: "Take down blinds, curtains and anything on the sills, and clear a path about three feet wide to each window. If that’s hard for you, tell your crew lead and we’ll help.",
      },
    ],
  },
  {
    tab: "Cost & Warranty",
    items: [
      {
        q: "What affects the cost of replacement windows?",
        a: "The number and size of windows, the style, the frame material, the glass package, and whether you need insert or full-frame replacement. Repairs to rotted framing are priced separately, and we’ll show you the damage before doing that work.",
      },
      {
        q: "Do I have to replace every window at once?",
        a: "No. Many homeowners start with the windows in the worst shape or the rooms they use most. We’ll note which windows can wait so you can plan the rest later.",
      },
      {
        q: "Will new windows lower my energy bills?",
        a: "They can, especially if your current windows are single-pane or leak air. How much you save depends on your old windows, your climate and how you heat and cool the house, so we don’t promise a specific number.",
      },
      {
        q: "What warranty comes with my windows?",
        a: [
          "Your windows carry the manufacturer’s product warranty, and our installation is covered by our written workmanship warranty. ",
          { label: "How our warranty works", href: links.warranty },
          `. Questions about a window we installed? Call us at ${site.phone.display}.`,
        ],
      },
    ],
  },
];
