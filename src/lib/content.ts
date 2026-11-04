// All copy and image paths for the homepage live here so components stay presentational.
// Images go in /public/assets - see public/assets/README.md for the file list.

export type NavItem = { label: string; href: string; hidden?: boolean };
export type NavGroup = { label: string; items: NavItem[] };

// Top navigation. Each group opens a dropdown on click (not hover), as on the reference site.
// "Solar" is in the reference markup but hidden by location, so it is hidden here too.
export const navMenu: NavGroup[] = [
  {
    label: "Services",
    items: [
      { label: "All Services", href: "/services" },
      { label: "Windows", href: "/services/windows" },
      { label: "Roofing", href: "/services/roofing" },
      { label: "Siding", href: "/services/siding" },
      { label: "Doors", href: "/services/doors" },
      { label: "Insulation", href: "/services/insulation" },
      { label: "Solar", href: "/services/solar", hidden: true },
      { label: "Accessories", href: "/services/accessories" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "About Shah & Crew", href: "/about" },
      { label: "Community", href: "/about/community" },
      { label: "Belonging", href: "/about/belonging" },
      { label: "News", href: "/about/news" },
    ],
  },
  {
    label: "Careers",
    items: [
      { label: "Shah & Crew Careers", href: "/careers" },
      { label: "Openings", href: "/careers/openings" },
      { label: "Innovations", href: "/careers/innovations" },
      { label: "Partner With Us", href: "/careers/partner-with-power" },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "Get Support", href: "/support" },
      { label: "Locations", href: "/support/locations" },
      { label: "Track Your Project", href: "/support/project-pulse" },
      { label: "Our Process", href: "/support/our-process" },
      { label: "Bill of Rights", href: "/support/bill-of-rights" },
      { label: "Licenses and Insurance", href: "/support/licenses-and-insurance" },
      { label: "Warranties", href: "/support/warranties" },
      { label: "Tax Credits", href: "/support/tax-credits" },
      { label: "Window Sash", href: "/sash-replacement-how-to" },
    ],
  },
];

export const services = [
  { name: "Doors", image: "/assets/carousel/doors.jpg", text: "Open up to increased security, energy-efficiency, and diverse design options." },
  { name: "Insulation", image: "/assets/carousel/insulation.jpg", text: "Prevent extreme attic temperatures and protect the life of your home’s energy systems with blown-in insulation." },
  { name: "Accessories", image: "/assets/carousel/accessories.jpg", text: "Time to put the finishing touches on your project and make everything perfect." },
  { name: "Windows", image: "/assets/carousel/windows.jpg", text: "Energy-efficient, noise-reducing, extra secure, and statement-making." },
  { name: "Roofing", image: "/assets/carousel/roofing.jpg", text: "With our state-of-the-art shingles and lifetime labor warranty, you’re covered." },
  { name: "Siding", image: "/assets/carousel/siding.jpg", text: "Outfit your home with maximum protection, minimum maintenance, and the color it was destined for." },
];

export const processSteps = ["Schedule", "Consultation", "Production", "Installation"];

export const stats = [
  { value: 30, label: "Years of experience" },
  { value: 1000000, label: "Customers" },
  { value: 1000000, label: "Projects" },
];

export const rights = [
  { title: "Customer First", text: "We will treat you as a customer from the first moment we speak — whether you purchase our services or not." },
  { title: "Ownership", text: "You are in charge in your home. So we will only enter your home when invited and only stay as long as we are welcome." },
  { title: "Safety", text: "You deserve to feel safe. So we will only send people of honor and integrity to your home. They will act courteously and be professionally attired." },
  { title: "Allocation", text: "Your home is precious, so we will always allocate the time necessary to do things right. No corner cutting from our first meeting to the completion of your project." },
  { title: "Respect", text: "Because we respect all homeowners, we will never agree to a project without all owners and relevant parties present." },
  { title: "Punctual", text: "We will always treat your time with respect. You have the right to expect appointments and installations will be finished on time." },
  { title: "Fair", text: "Our pricing will always be “blind” — our price will never vary based on age, race, income, the value of your home, or any other social variables." },
  { title: "Privacy", text: "We will use best-practice data-security systems to protect the privacy of your personal information. And we will never sell your data to anyone." },
  { title: "Quality", text: "We will only bring properly trained experts to your home. We will carry all the necessary insurance and other business safeguards." },
  { title: "Lifetime Guarantee", text: "If there is a mistake, we will be there to make it right. Not just at the time of your project but for the life of your home." },
];

export const awards = [
  { image: "/assets/awards/angi.png", label: ["Winner of over", "1,000 Angi Super", "Service Awards"] },
  { image: "/assets/awards/bbb.png", label: ["Better Business Bureau", "A+ Rating"] },
  { image: "/assets/awards/google.svg", label: ["Over 50,000", "5-star reviews on", "Google"] },
  { image: "/assets/awards/bobvila.png", label: ["Best home renovation", "contractors –", "exteriors"] },
  { image: "/assets/awards/energy.svg", label: ["Industry leader in home", "energy savings"] },
];

export const people = [
  { title: "About", image: "/assets/people/about.jpg", text: "Our passion for improvement doesn’t stop at houses.", cta: "Learn about Power" },
  { title: "Careers", image: "/assets/people/careers.jpg", text: "When hustle meets purpose, beautiful things happen.", cta: "Careers at Power" },
];

export const news = [
  { date: "10 / 31 / 26", title: "What Is Low-E Glass?" },
  { date: "10 / 29 / 26", title: "Scary Good Renovations: Reimagining Hollywood’s Most Iconic Halloween Homes" },
  { date: "10 / 27 / 26", title: "Are Gutter Guards Worth It? 3 Things to Consider" },
];

export const footerColumns: { heading: string; links: NavItem[] }[] = [
  ...navMenu.filter((g) => g.label !== "Support").map((g) => ({ heading: g.label, links: g.items.map((i) => (i.hidden ? { label: i.label, href: "#" } : i)) })),
  {
    heading: "Support",
    links: [
      { label: "Get Support", href: "/support" },
      { label: "Locations", href: "/support/locations" },
      { label: "Track Your Project", href: "/support/project-pulse" },
      { label: "Our Process", href: "/support/our-process" },
      { label: "Bill of Rights", href: "/support/bill-of-rights" },
      { label: "Licenses and Insurance", href: "/support/licenses-and-insurance" },
      { label: "Warranties", href: "/support/warranties" },
      { label: "Tax Credits", href: "/support/tax-credits" },
      { label: "Window Sash", href: "/sash-replacement-how-to" },
    ],
  },
];

export const footerBadges = [
  { src: "/assets/footer/angi-super-service-2025.webp", alt: "Angi Super Service Award 2025", href: "https://www.angi.com/companylist/us/pa/chester/power-home-remodeling-reviews-123064.htm" },
  { src: "/assets/footer/bbb-a-plus-rating.webp", alt: "BBB A+ Rating", href: "https://www.bbb.org/us/pa/chester/profile/window-installation/power-home-remodeling-group-llc-0241-80011989" },
  { src: "/assets/footer/bobvila_logo.webp", alt: "Bob Vila Editors' Choice", href: "https://www.bobvila.com/articles/best-home-renovation-contractors/" },
  { src: "/assets/footer/glassdoor-best-places-to-work.webp", alt: "Glassdoor Best Places to Work", href: "https://www.glassdoor.com/Reviews/Power-Home-Remodeling-Reviews-E405781.htm" },
  { src: "/assets/footer/fortune-100.webp", alt: "Fortune 100", href: "https://www.greatplacetowork.com/certified-company/1221006" },
];
