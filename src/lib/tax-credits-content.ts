import type { TextBlock } from "@/components/support/TextColumns";

export const taxCreditsHero = {
  title: ["Residential energy", "tax credit", "requirements"],
  subtitle: ["The federal government offers tax credits to homeowners who choose to install energy-efficient products on their home."],
  image: "/assets/support/tax-credits/hero.png",
  mobileImage: "/assets/support/tax-credits/hero-mobile.jpg",
};

export const taxCreditsColumns: TextBlock[][] = [
  [
    { h3: ["Tips for Claiming 2025 Federal Residential Energy Tax Credit"] },
    {
      p: "If you installed our products in 2025, grab a calculator…and a little patience. We’ve gathered this information to help you understand the details you’ll need to provide the IRS to claim applicable federal energy tax credits.",
    },
    {
      p: "Our entry doors and attic insulation qualify for the 2025 Energy Efficient Home Improvement Tax Credit, as long as you meet certain IRS specifications. The 2025 credit equals 30% of the cost of eligible projects, with a maximum of $1,200. There is a limit of $250 per door (up to two doors).",
    },
    {
      p: "Our solar products qualify for the Residential Clean Energy Tax Credit, which may provide up to 30% off the total price of your solar energy system, if you meet all IRS guidelines",
    },
    { p: ["Please visit the ", { label: "IRS website", href: "https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit" }, " for more details."] },
  ],
  [
    { b: "Step 1: Find the total project purchase price" },
    {
      p: "If you installed our doors, attic insulation, and/or solar products only, retrieve your Custom Remodeling and Improvement Agreement, found on your Project Pulse dashboard. Then locate the project purchase price, found on the first page.",
    },
    { p: ["Can’t track down the document? No worries. Call ", { label: "Customer Support", href: "tel:888-736-6335" }, " and we’ll send you a copy."] },
    {
      p: [
        "If you installed any combination of the above products such as doors and solar, or if your project purchase price includes items that do not qualify for the credit, such as roofing or trim, call ",
        { label: "Customer Support", href: "tel:888-736-6335" },
        " to receive the information you need to proceed.",
      ],
    },
    { b: "Step 2: Fill out IRS Form 5695" },
    { p: "If you installed:" },
    {
      list: [
        "Our solar energy system: enter the qualified costs on line 1",
        "Our entry doors and/or attic insulation: enter the cost and calculated qualified in the appropriate lines, 18 for attic insulation, 19 for doors.",
      ],
    },
    { p: [{ label: "Download IRS Form 5695 here", href: "https://www.irs.gov/pub/irs-pdf/f5695.pdf" }] },
  ],
];

export const taxCreditsNotice = {
  title: "CONSULT WITH A TAX PROFESSIONAL",
  paragraphs: [
    "We strongly recommend reviewing Form 5695 with a tax professional to better understand how these credits may apply to your specific tax return.",
    "DISCLAIMER: THE ABOVE IS BEING PROVIDED FOR INFORMATIONAL PURPOSES ONLY. POWER HOME REMODELING GROUP MAKES NO WARRANTIES, REPRESENTATIONS, OR GUARANTEES REGARDING THE AVAILABILITY, APPLICABILITY, OR ELIGIBILITY OF TAX CREDITS RELATED TO THE INSTALLATION AND USE OF POWER’S PRODUCTS. POWER HOME REMODELING GROUP AND ITS REPRESENTATIVES ARE NOT TAX ADVISORS OR ATTORNEYS AND ARE NOT RESPONSIBLE FOR MAINTAINING YOUR ELIGIBILITY FOR ANY FEDERAL, STATE, OR LOCAL TAX CREDITS OR INCENTIVES. FEDERAL, STATE, AND LOCAL TAX CREDIT AND INCENTIVE RULES ARE COMPLEX – YOUR ABILITY TO APPLY ENERGY-EFFICIENCY TAX CREDITS DEPENDS ON YOUR PERSONAL TAX SITUATION. AS SUCH, YOU SHOULD CONSULT WITH YOUR OWN TAX ADVISOR OR ATTORNEY.",
  ],
};
