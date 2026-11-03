import type { FaqGroup } from "@/components/services/Faq";

export const supportIntro = {
  title: "How can we help?",
  text: "Browse support topics, dive into FAQs, or contact us with any issue.",
};

export const supportFaqs: FaqGroup[] = [
  {
    tab: "General",
    items: [
      {
        q: "How do I know if POWER operates in my neighborhood?",
        a: [
          "Use our ",
          { label: "Locations", href: "/support/locations" },
          " map or enter your ZIP code above the toolbar to see if your home is in one of our service areas.",
        ],
      },
      {
        q: "Why do both homeowners need to be present when signing on to a project?",
        a: "Because your home is a shared investment, we want to make sure all decision-makers are present when finalizing a project. This ensures that both homeowners understand the scope of work, the design and product choices, the financial details, and the warranty coverage. Having everyone involved from the start helps avoid miscommunication and keeps the project moving smoothly.",
      },
      {
        q: "How does POWER protect my information?",
        a: [
          "We use industry-standard security protocols and never sell your information. For details on how data is handled, read our ",
          { label: "Privacy Policy", href: "/privacy-notice" },
          " or ",
          { label: "Customer Bill of Rights", href: "/support/bill-of-rights" },
          ".",
        ],
      },
      {
        q: "Where can I find your licenses and insurance information?",
        a: [
          "We’re proud to operate transparently. You can view all current state and local contractor licenses, as well as insurance details, under ",
          { label: "Licenses and Insurance", href: "/support/licenses-and-insurance" },
          ".",
        ],
      },
      {
        q: "How can I cancel my contract with POWER?",
        a: "You can cancel your contract with POWER – without penalty or obligation – within three business days of the transaction. Full cancellation policy details can be found in your Custom Remodeling and Improvement Agreement in the Project Pulse app.",
        more: ["If you have any questions or concerns, call customer support at (888) 736-6335 (dial 2)."],
      },
    ],
  },
  {
    tab: "Contact",
    items: [
      {
        q: "How can I contact POWER?",
        a: [
          "For appointments and project support, call 888-736-6335 (Dial 2). For scheduling, use 888-736-6335 (Dial 1). Media inquiries can be directed to ",
          { label: "mediarelations@powerhrg.com", href: "#" },
        ],
      },
      {
        q: "Where is POWER located?",
        a: "Power Home Remodeling’s corporate office in Chester, PA is located at:",
        more: [
          ["2501 Seaport Drive\nFourth Floor\nChester, PA 19013\n", { label: "Maps & Directions", href: "#" }],
          "Toll-free: 888-736-6335\nPhone: 610-874-5000\nFax: 610-874-5030",
          [
            "POWER also operates in the following ",
            { label: "locations", href: "/support/locations" },
            ": Philadelphia, Boston, New Jersey, Long Island, Connecticut, Maryland, Atlanta, Charlotte, Chicago, Austin, Dallas, Houston, Jacksonville, Tampa, Fort Lauderdale, Denver, Detroit, Nashville, Cincinnati, Columbus, Phoenix, Pittsburgh, Orlando, Las Vegas, Oklahoma City,San Antonio, and Raleigh-Durham.",
          ],
        ],
      },
      {
        q: "What should I do if I have questions during my project?",
        a: "Your project team is your primary point of contact throughout the remodeling process. They can provide project updates, answer questions, and help address any concerns before, during, and after installation.",
      },
    ],
  },
  {
    tab: "Scheduling",
    items: [
      {
        q: "How do I schedule a free in-home estimate with POWER?",
        a: [
          "Scheduling is simple. You can request a free in-home estimate online through our ",
          { label: "website", href: "#" },
          " or by calling our scheduling team at 888-736-6335 (dial 1). A POWER representative will work with you to find a convenient time for a Remodeling Consultant to meet you at your home to review options, answer questions, and provide a no-obligation estimate.",
        ],
      },
      {
        q: "How do I schedule a service appointment with POWER?",
        a: "To schedule a service appointment, call our Customer Service and Support line at 888-736-6335 (Dial 2). A member of our Service team will assist you with setting up a convenient time, reviewing warranty coverage, and ensuring your project needs are taken care of quickly.",
      },
      {
        q: "How do I cancel an appointment with POWER?",
        a: "To cancel or reschedule your appointment for a free estimate, call our scheduling department at 888-736-6335 (dial 1). To cancel or reschedule your installation or service appointment, call our customer support line at 888-736-6335 (dial 2).",
      },
      {
        q: "What happens after I sign my contract?",
        a: "Once your contract is signed, POWER begins preparing your project for installation. Your team coordinates scheduling, orders your custom products, and manages the next steps leading up to installation. Throughout the process, you’ll receive updates and can track your project’s progress through Project Pulse.",
      },
    ],
  },
  {
    tab: "Financing & Warranties",
    items: [
      {
        q: "Where can I find information on warranties?",
        a: ["You can view full details on product and labor coverage on our ", { label: "Warranties page", href: "/support/warranties" }, "."],
      },
      {
        q: "Can I finance my project with POWER?",
        a: "Yes, POWER offers paperless financing that is approved in the home. We have a variety of lending partners and many customers take advantage of our easy monthly installment options. For questions about financing and payment, call 888-736-6335 (Dial 1 when prompted).",
      },
      {
        q: "How do I receive tax credits?",
        a: [
          "Check the ",
          { label: "Tax Credits", href: "/support/tax-credits" },
          " page for the latest federal and local incentives — and talk with your tax advisor to maximize benefits.",
        ],
      },
    ],
  },
];

export const supportLinks = [
  {
    title: ["Licenses & Insurance"],
    paragraphs: [
      "As the nation’s largest full-service, exterior home remodeler, we don’t just offer services that meet your needs, we offer experiences that exceed your expectations.",
      "With our high-performance products, professional installation experts, and relentless commitment to customer service—the possibilities are yours to imagine.",
    ],
    image: "/assets/support/home/licenses.jpg",
    imageAlt: "power siding",
    cta: { label: "View Licenses & Insurance", href: "/support/licenses-and-insurance" },
    tone: "white" as const,
  },
  {
    title: ["Energy Tax Credits"],
    paragraphs: [
      "Taxpayers who upgrade their homes to make use of renewable energy and energy-efficient products may be eligible for tax credits to offset some of the costs.",
      "Use the link below to access resources that will assist you with understanding and claiming the tax credit.",
    ],
    image: "/assets/support/home/tax-credits.png",
    imageAlt: "POWER solar panels",
    cta: { label: "View Energy Tax Credits", href: "/support/tax-credits" },
    tone: "sky" as const,
  },
  {
    title: ["Warranties"],
    paragraphs: [
      "At Power Home Remodeling, we have chosen to partner with some of the most highly regarded manufacturers in the business.",
      "As a result, we confidently stand behind our products and services with warranties that are among the best in the industry.",
    ],
    image: "/assets/support/home/warranties.jpg",
    imageAlt: "Residential Home",
    cta: { label: "View Warranties", href: "/support/warranties" },
    tone: "white" as const,
  },
];

export const fullRights = [
  { title: "Customer First", text: "We will treat you as a customer from the first moment we speak — whether you purchase our services or not." },
  { title: "Ownership", text: "You are in charge in your home. So we will only enter your home when invited and only stay as long as we are welcome." },
  {
    title: "Safety",
    text: "You deserve to feel safe. So we will only send people of honor and integrity to your home. They will act courteously and be professionally attired. And they will treat you with the respect every homeowner deserves.",
  },
  {
    title: "Allocation",
    text: "Your home is precious, so we will always allocate the time necessary to do things right. No corner cutting from our first meeting to the completion of your project.",
  },
  {
    title: "Respect",
    text: "Because we respect all homeowners, we will never agree to a project without all owners and relevant parties present, so that you are all fully informed of our services and know what to expect.",
  },
  {
    title: "Punctual",
    text: "We will always treat your time with respect. You have the right to expect appointments and installations will be finished on time. If any issues or concerns arise, we will respond promptly. And that response will be from a fully trained POWER employee, not an overseas call center.",
  },
  {
    title: "Fair",
    text: "You deserve to know that your home-renovation partner will never exploit you. So our pricing will always be “blind” — our price will never vary based on age, race, income, the value of your home, or any other social variables.",
  },
  {
    title: "Privacy",
    text: "You deserve privacy for your personal information. So we will use best-practice data-security systems to protect the privacy of your personal information. And we will never sell your data to anyone.",
  },
  {
    title: "Quality",
    text: "Quality home renovations are complex. So we will only bring properly trained experts to your home. We will carry all the necessary insurance and other business safeguards. And we will make sure our work fully complies with all ordinances.",
  },
  {
    title: "Lifetime Guarantee",
    text: "You deserve to feel great about the investments you make in your home. If there is a mistake, we will be there to make it right. Not just at the time of your project but for the life of your home.",
  },
];

export const contactForm = {
  title: "Have more questions? email us",
  reasons: ["Customer Support", "Appointment Schedule / Reschedule", "Employment Opportunity", "Financing and Payment Questions", "Media Inquiries"],
  consent: "Keep me updated on my inquiry as well as news, open positions, expansion, products, and all things Power Home Remodeling via emails!",
  submit: "Send",
};

export const hereToHelp = {
  title: ["Here to help"],
  text: "POWER assistance, answers, and advice. Browse support topics, dive into our FAQs, and get tailored support for any issues.",
  label: "Get Support",
  href: "/support",
};
