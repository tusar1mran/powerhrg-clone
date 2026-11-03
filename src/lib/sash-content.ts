import type { FaqGroup } from "@/components/services/Faq";
import type { TextBlock } from "@/components/support/TextColumns";

export const sashHero = {
  title: ["How to install", "your replacement", "sash"],
  subtitle: ["Start brewing some coffee—You should be able to install your new sash before the pot is full."],
  image: "/assets/support/sash/hero.png",
  mobileImage: "/assets/support/sash/hero-mobile.png",
};

export const sashVideo = { title: "Replacement Sash", poster: "/assets/support/sash/video-poster.jpg" };

export const sashBullets: TextBlock[][] = [
  [{ h3: ["NOT A VIDEO PERSON?", "NO WORRIES-HERE ARE THE BULLET POINTS"] }],
  [
    { label: "GETTING STARTED:" },
    {
      list: [
        "Clear the area around the window, carefully unwrap the new sash, and keep it nearby for installation.",
        "Look out for model variations in the instructions.",
        "Grab small Phillips and flathead screwdrivers. These are the only tools you will need",
      ],
    },
    { label: "ORDER OF OPERATIONS:" },
    {
      list: [
        "If you are replacing the bottom sash only, you don’t need to remove the top sash, and vice versa.",
        "If you are replacing both, first remove the bottom sash. Next, remove the top sash. Then install in reverse—first the top, then the bottom.",
      ],
    },
  ],
];

const step = (n: number, title: string[], text: string, imageAlt: string) => ({
  badge: `0${n}`,
  title,
  paragraphs: [text],
  image: `/assets/support/sash/step-${n}.jpg`,
  imageAlt,
});

export const removeSteps = [
  step(
    1,
    ["Tilt the sash"],
    "Unlock the window. Lift or lower the sash 3-4 inches (about the width of your hand). Then, tilt the sash towards you and lower it against the sill.",
    "Tilt The Sash",
  ),
  step(
    2,
    ["Remove black clips"],
    "Grab the Phillips screwdriver, insert the head into the opening of the black clip (there should be one on either side), and scoop them out. Then, toss them in the garbage. (Don’t see the clips? Skip ahead—they are unessential to window operation.)",
    "Remove Back Clips",
  ),
  step(
    3,
    ["Remove the sash"],
    "Lift and hold the sash like a tray. Then, remove it by first lifting one side up and out, followed by the other. Once it’s out, you’re almost there! Now get ready to install your new sash!",
    "Remove the Sash",
  ),
];

export const installSteps = [
  step(
    4,
    ["Position the sash"],
    "Hold the sash with the interior lift rail facing the floor. The bottom sash has locks on the top. The top sash has the keeper portion of the lock on the bottom.",
    "Positition the Sash",
  ),
  step(
    5,
    ["Insert the sash into the frame"],
    "Place the metallic pins into the frame’s U-shaped clamps. If needed, use a flathead screwdriver to turn the clamp into an upright “U” position. Then, lower the sash all the way so it is resting against the bottom sash or sill. Pro tip: Now’s a great time to clean the window.",
    "Insert the Sash into the Frame",
  ),
  step(
    6,
    ["Lift the sash", "into its regular,", "operating", "position"],
    "Gently push the sash into the frame until you hear a click. Then, move the window up and down to ensure it is operational. Finally, lock your window and pat yourself on the back—you just installed a window sash!",
    "Lift the Sash into its Regular Operating Position",
  ),
];

export const sashFaqs: FaqGroup[] = [
  {
    tab: "",
    items: [
      { q: "WHAT IS A WINDOW SASH?", a: "It’s the movable part of the window that contains the glass." },
      { q: "WHAT IF MY WINDOW WON’T LOCK?", a: "When you lock the windows, be sure the top sash is pushed all the way up." },
      {
        q: "HOW CAN I TELL THE TOP FROM THE BOTTOM SASH?",
        a: "The bottom sash will have the locking mechanism, and the top will have the keeper (where the lock is inserted).",
      },
      {
        q: "HOW CAN I TELL THE INTERIOR SIDE OF THE SASH FROM THE EXTERIOR?",
        a: "The lift rail (a handle integrated into a window sash) will face the interior of the home.",
      },
      {
        q: "HOW DO I KNOW IF I’VE SUCCESSFULLY INSTALLED THE SASH?",
        a: "The sash should raise, lower, and lock with ease. When open, it should stay in position.",
      },
      {
        q: "HOW DO I DISCARD MY OLD SASH?",
        a: "In most cases, you can include them with your everyday garbage. If you are unsure, consult with your local trash removal company. To recycle the sash, we recommend contacting your local recycling center.",
      },
    ],
  },
];

export const sashHelp = {
  title: ["Here to help"],
  text: "In case you need support, our team is available to assist.\nCall us at 888.736.6335, select option 2, during standard business hours,\nand we will do everything we can to help.",
  label: "Get Support",
  href: "/support",
};
