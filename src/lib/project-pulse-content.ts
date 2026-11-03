import type { FaqGroup } from "@/components/services/Faq";
import type { ImageCard } from "@/components/ImageCardPair";
import type { TextBlock } from "@/components/support/TextColumns";

const signIn = "https://nitro.powerhrg.com/pulse/sign_in";

export const pulseHero = {
  title: ["Project Pulse"],
  subtitle: ["Welcome to Project Pulse. Our exclusive and secure project-tracking web app that allows you to manage every aspect of your home renovation project."],
  image: "/assets/support/project-pulse/hero.png",
  mobileImage: "/assets/support/project-pulse/hero-mobile.png",
  button: { label: "access project pulse", href: signIn },
};

export const pulseIntro: TextBlock[][] = [
  [
    { h3: ["POWER IN THE PALM OF YOUR HAND"] },
    {
      p: "Project Pulse gives homeowners an easy way to manage their project details—from appointments and documents, to requests and updates—all in one place.",
    },
    { link: { label: "Learn More About Our Tech", href: "/careers/innovations" } },
  ],
  [{ video: { title: "Project Pulse", poster: "/assets/support/project-pulse/video-poster.jpg" } }],
];

export const pulseFeatures = {
  heading: "Project Pulse Features",
  items: [
    {
      title: "View Projects",
      text: "Gain access to Project Pulse the minute you sign off on your home renovation. Track your current project’s timeline and view relevant photos with easy, reliable access.",
      icon: "/assets/support/bill-of-rights/numbers/1.svg",
      image: "/assets/support/project-pulse/view-projects.png",
      imageAlt: "View Projects",
    },
    {
      title: "Track Appointments",
      text: "View the details of your upcoming appointments or speak with Customer Support via the “click to call” button.",
      icon: "/assets/support/bill-of-rights/numbers/2.svg",
      image: "/assets/support/project-pulse/track-appointments.png",
      imageAlt: "Track appointments screen in project pulse",
    },
    {
      title: "Organize Documents",
      text: "Access all project documents, update your method of payment, sign relevant paperwork, and fill out customer surveys.",
      icon: "/assets/support/bill-of-rights/numbers/3.svg",
      image: "/assets/support/project-pulse/manage-documents.png",
      imageAlt: "manage documents",
    },
  ],
};

export const pulseTestimonial = {
  quote: "I loved the app POWER provided to keep us updated and will use them again in the future!",
  name: "POWER CUSTOMER, 2025",
  caption: "Windows + Solar",
};

export const pulseFaqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "What is Project Pulse and how do I use it?",
        a: "Project Pulse is your personal project hub. It allows you to access and manage all of your appointments, paperwork, and other project details from your phone, tablet, or computer. You can:",
        list: [
          "Track your upcoming appointments",
          "Sign paperwork digitally",
          "View your signed project documents, all of your project photos, and financing information",
          "See real-time updates on your project",
        ],
        more: [
          [
            "You should have received the link during your consultation, but it’s okay if you can’t find it. You can always ",
            { label: "request another magic link", href: signIn },
            ".",
          ],
        ],
      },
      {
        q: "Does Project Pulse take up memory on my device?",
        a: "No. Project Pulse is a web app not downloaded directly, so it will not take up space on your device.",
      },
      {
        q: "What devices does Project Pulse work on?",
        a: "It works on both Apple and Android products, phones, tablets, and desktop computers. Basically, everything except your microwave.",
      },
      {
        q: "Does Project Pulse track multiple projects at once?",
        a: "Yes. All of your projects will be tracked via the same Project Pulse link.",
      },
      {
        q: "How do I upload photos to the app?",
        a: "You’ll receive a notification from Project Pulse prompting you to upload photos of your service request. You can then capture, review, and upload a live (or saved) photo or video from your library.",
      },
      {
        q: "How often is Project Pulse updated?",
        a: "Project Pulse is updated throughout your remodeling project as important milestones are completed, helping you stay informed from scheduling through installation. Notifications and available information may vary depending on your project’s progress.",
      },
    ],
  },
  {
    tab: "Privacy",
    items: [
      {
        q: "Is my information safe and secure?",
        a: "Yes. Your link is sent using a secure encrypted Internet connection so it cannot be accessed by any third party. However, if you share your link with someone else, they will be able to see your information.",
      },
      { q: "Can my significant other get access to Project Pulse too?", a: "Yes. Each homeowner may receive their own link." },
    ],
  },
  {
    tab: "Accessibility",
    items: [
      {
        q: "I’m having trouble accessing Project Pulse. Can you help?",
        a: [
          "You can access Project Pulse through a unique magic link sent to you via text or email. You should have received the link during your consultation, but it’s okay if you can’t find it. You can always ",
          { label: "request another magic link.", href: signIn },
        ],
      },
      { q: "Is Pulse accessible to homeowners with vision impairment?", a: "Yes. Pulse works with most screen reading apps." },
      {
        q: "Is there a Spanish language version? (Hay una version en español?)",
        a: "Yes. Click on your name under the menu and change the language to Spanish. (Haga clic en su nombre debajo del menú y cambie el idioma a español.)",
      },
    ],
  },
];

export const pulseCta = {
  title: ["Let’s Get Started"],
  text: "No pressure and no obligation. Just expert guidance tailored to your home.",
  label: "Get your free estimate",
  href: "#",
};

export const pulseNews: ImageCard[] = [
  {
    title: "Good Housekeeping",
    image: "/assets/support/project-pulse/good-housekeeping.jpg",
    text: "Good Housekeeping features Project Pulse in\n“5 Ways Technology Can Simplify Your Next\nHome Improvement Project”",
    cta: "Good Housekeeping Article",
    href: "https://www.goodhousekeeping.com/home/renovation/a69253794/tech-home-renovation-trends-2025/",
  },
  {
    title: "Ruby Central",
    image: "/assets/support/project-pulse/ruby-central.jpg",
    text: "A company spotlight on Ruby Central featuring POWER’s various in-house technologies: Project Pulse and Nitro",
    cta: "Ruby Central Article",
    href: "https://rubycentral.org/news/company-spotlight-power-home-remodeling-scales-a-1b-business-with-ruby-on-rails/",
  },
];
