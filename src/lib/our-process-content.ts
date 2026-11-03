export const ourProcessHero = {
  title: ["Your Vision.", "Our Process."],
  subtitle: [
    "For over 30 years, POWER has been committed to building trust throughout the renovation process. From “one day” to “day one,” this roadmap details every step of our partnership.",
  ],
  image: "/assets/support/our-process/hero.jpg",
};

export const processLabels = ["Schedule", "Consultation", "Production", "Installation"];

export const processSteps = [
  {
    title: ["Schedule Your", "Free Estimate"],
    points: [
      [{ label: "Booking a free estimate with POWER", href: "#" }, " is transparent and easy."],
      "Schedule an appointment online, or, if you prefer, via phone call with one of our Scheduling Agents.",
      "Already have an appointment? Great! We’ll call you day-of and confirm everything is good-to-go.",
    ],
    image: "/assets/support/our-process/free-estimate.jpg",
    imageAlt: "Schedule your free estimate",
  },
  {
    title: ["Consult With", "Our Experts"],
    points: [
      "Our Remodeling Consultants will conduct a thorough inspection of your entire home.",
      "Then comes the fun part: a full review of styles, colors, and options.",
      "We’ll leave you with a free estimate, valid for up to one year.",
    ],
    image: "/assets/support/our-process/consult.png",
    imageAlt: "Consult with our experts",
  },
  {
    title: ["Production"],
    points: [
      "Once a project has been agreed to, we’ll work with you to set up an install date.",
      "We’ll then confirm all measurements, project details, and order products.",
      [
        "You can stay up-to-date with the entire process via our exclusive project management app ",
        { label: "Project Pulse", href: "/support/project-pulse" },
        ".",
      ],
    ],
    image: "/assets/support/our-process/production.jpg",
    imageAlt: "Production",
  },
  {
    title: ["Installation", "and Beyond"],
    points: [
      "Our top-rated installers will conduct your remodel and transform your home to look exactly how you envisioned it.",
      "Once complete, you’ll receive a lifetime labor warranty and a manufacturers warranty for all services and products.",
      [
        "Remember, POWER works for you—if there are any questions regarding your project, our ",
        { label: "Customer Support", href: "/support" },
        " representatives are ready and waiting to answer your call.",
      ],
    ],
    image: "/assets/support/our-process/install.jpg",
    imageAlt: "Installation and beyond",
  },
];

export const processPulse = {
  background: "/assets/shared/pulse-bg.png",
  logo: "/assets/support/our-process/project-pulse-logo.svg",
  title: "Track Your Project",
  paragraphs: [
    [
      "Track and monitor every moment of your project in real time with our best-in-class secure project-tracking app: ",
      { label: "Project Pulse", href: "/support/project-pulse" },
      ".",
    ],
    "Schedule a follow up, view important updates, access documents, and e-sign papers, all in one place.",
  ],
  image: "/assets/support/our-process/phone.png",
  imageAlt: "Project Pulse project tracking app screen",
  bar: { label: "Already a POWER Customer? Access Project Pulse to track your project", href: "https://nitro.powerhrg.com/pulse/sign_in" },
};
