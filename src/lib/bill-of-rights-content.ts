import type { ImageCard } from "@/components/ImageCardPair";
import type { TextBlock } from "@/components/support/TextColumns";
import { fullRights } from "./support-content";

export const billOfRightsHero = {
  title: ["Customer bill", "of rights"],
  subtitle: ["Owning a home is a critical part of the American Dream. So we believe every homeowner is entitled to the following inalienable rights."],
  image: "/assets/support/bill-of-rights/hero.png",
};

export const billOfRightsIntro: TextBlock[][] = [
  [
    { h3: ["“Homeowner” is a hard-earned title."], lead: true },
    {
      p: "One that deserves respect and professionalism. We believe that the investment you make in your home should be evident to anyone walking down the street. At POWER, renovating your most valued asset is more than a project. It’s a privilege. We don’t cut corners on quality or service because we’re as proud of our work as you are of your home.",
    },
    { p: "And as a proud homeowner, we believe you’re entitled to the following inalienable rights:" },
  ],
  [{ video: { title: "Customer Bill of Rights", poster: "/assets/support/bill-of-rights/video-poster.jpg", aspect: "aspect-[100/49]" } }],
];

export const billOfRightsList = fullRights.map((r, i) => ({
  ...r,
  text: r.text.replace(" — ", " – "),
  icon: `/assets/support/bill-of-rights/numbers/${i + 1}.svg`,
}));

export const billOfRightsCards: ImageCard[] = [
  {
    title: "Licenses",
    image: "/assets/support/bill-of-rights/licenses.png",
    text: "When you choose POWER, you choose peace of mind. Each of our installers undergo rigorous training and meet legal standards in all our locations.",
    cta: "View Licenses & Insurance",
    href: "/support/licenses-and-insurance",
  },
  {
    title: "Warranties",
    image: "/assets/support/bill-of-rights/warranties.jpg",
    text: "We only partner with the best manufacturers. So we stand behind our products and services with the best warranties in the industry.",
    cta: "View Warranties",
    href: "/support/warranties",
  },
];
