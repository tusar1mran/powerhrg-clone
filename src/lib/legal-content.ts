// LEGAL REVIEW REQUIRED before launch: these Terms of Service and this Privacy Notice are a starting template
// and must be reviewed and approved by a qualified attorney licensed in the state where Shah & Crew operates.
// Update "Last updated" whenever the published text changes.
// Copy for /terms-of-service and /privacy-notice. Business details come from site.ts so they stay in one place.
import type { LegalBlock } from "@/components/legal/LegalDocument";
import { links } from "./links";
import { site } from "./site";

const lastUpdated: LegalBlock = { p: "Last updated: November 4, 2026" };

// Name, mailing address (hidden when site.address is empty), email and phone.
const contactBlocks: LegalBlock[] = [
  { p: [site.legalName, ...site.address].join("\n") },
  {
    p: [
      "Email: ",
      { label: site.email, href: `mailto:${site.email}` },
    ],
  },
  {
    p: [
      "Phone: ",
      { label: site.phone.display, href: site.phone.href },
    ],
  },
];

export const termsTitle = "Terms of Service";

export const termsBlocks: LegalBlock[] = [
  lastUpdated,
  {
    p: `These Terms of Service (“Terms”) apply to your use of this website, which is operated by ${site.legalName} (“${site.name},” “we,” “us” or “our”). By using the website, you agree to these Terms. If you don’t agree, please don’t use the website.`,
  },
  { h: "Using this website" },
  {
    p: "You may use this website to learn about our services and to contact us about your home. You agree to use it only for lawful purposes and in line with these Terms. You must be at least 18 years old to request a quote or submit our contact form.",
  },
  { h: "Information only, not professional advice" },
  {
    p: "The content on this website is general information about home exterior products and services. It isn’t engineering, architectural, legal, tax or financial advice, and it doesn’t account for the specific condition of your home. Product availability, options and descriptions may change without notice.",
  },
  { h: "Quotes, estimates and contracts" },
  {
    p: "Information you see on this website, and any estimate or quote we give you, is not a contract and doesn’t commit you or us to any work. Work begins only after you and we sign a written agreement. That signed agreement governs the project, including its scope, price, payment schedule, warranties and your right to cancel. If anything on this website conflicts with your signed agreement, the agreement controls.",
  },
  { h: "Communications consent" },
  {
    p: "When you submit our contact form and check the consent box, you agree that we may contact you by phone, text message or email about your request, using the contact details you provided. Message and data rates may apply, and message frequency varies with your request. Your consent isn’t a condition of buying anything from us.",
  },
  {
    list: [
      "To stop text messages, reply STOP to any text from us.",
      "To stop emails, use the unsubscribe link in the email or contact us.",
      "To stop calls, tell the person calling or contact us using the details below.",
    ],
  },
  {
    p: [
      "How we handle the information you send us is described in our ",
      { label: "Privacy Notice", href: links.privacy },
      ".",
    ],
  },
  { h: "Our content" },
  {
    p: `The text, photos, graphics, logos and design of this website belong to ${site.legalName} or the people who licensed them to us, and they are protected by copyright, trademark and other laws. You may view and print pages for your own personal, non-commercial use. You may not copy, republish, sell or create works based on our content without our written permission.`,
  },
  { h: "Prohibited use" },
  { p: "When using this website, you agree not to:" },
  {
    list: [
      "submit false information or information about another person without their permission;",
      "send spam, unsolicited advertising or harmful code;",
      "try to gain unauthorized access to the website, our systems or other people’s data;",
      "interfere with how the website works, including by overloading it or bypassing security measures;",
      "scrape, copy or collect content or data from the website by automated means without our written permission; or",
      "use the website in any way that breaks the law or infringes anyone’s rights.",
    ],
  },
  { h: "Links to other websites" },
  {
    p: "This website may link to websites we don’t control, such as manufacturer pages or state license lookup tools. We provide those links for convenience. We aren’t responsible for their content, accuracy or privacy practices, and a link doesn’t mean we endorse the site.",
  },
  { h: "Disclaimers" },
  {
    p: "We work to keep this website accurate and available, but we provide it “as is” and “as available.” To the extent the law allows, we disclaim all warranties about the website, express or implied, including warranties of merchantability, fitness for a particular purpose and non-infringement. We don’t promise that the website will be uninterrupted, error-free or free of harmful components. This section is about the website only. Warranties for work on your home are set out in your signed agreement and the product manufacturers’ warranties.",
  },
  { h: "Limitation of liability" },
  {
    p: `To the extent the law allows, ${site.legalName} will not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of, or inability to use, this website. Our total liability for any claim related to the website will not exceed one hundred US dollars ($100). Some states don’t allow certain limitations, so some of these may not apply to you. This section doesn’t limit our obligations under a signed agreement for work on your home.`,
  },
  { h: "Governing law" },
  {
    p: `These Terms are governed by the laws of the state where ${site.legalName} has its principal place of business, without regard to conflict-of-law rules. Any dispute about this website will be handled in the state or federal courts located in that state, unless the law requires otherwise.`,
  },
  { h: "Changes to these Terms" },
  {
    p: "We may update these Terms from time to time. When we do, we’ll change the “Last updated” date at the top of this page. Using the website after a change means you accept the updated Terms.",
  },
  { h: "Contact us" },
  { p: "Questions about these Terms? Reach us at:" },
  ...contactBlocks,
];

export const privacyTitle = "Privacy Notice";

export const privacyBlocks: LegalBlock[] = [
  lastUpdated,
  {
    p: `This Privacy Notice explains what personal information ${site.legalName} (“${site.name},” “we,” “us” or “our”) collects through this website and when you contact us, how we use and share it, and the choices you have.`,
  },
  { h: "Information we collect" },
  {
    p: [
      { strong: "Information you give us. " },
      "When you use our contact form, we collect your name, email address, phone number, ZIP code, the service you’re interested in, and your message. If you call, email or meet with us, we may also collect your address, details about your home and project, and any photos or documents you share.",
    ],
  },
  {
    p: [
      { strong: "Information collected automatically. " },
      "Like most websites, our servers keep logs that record technical details such as your IP address, browser type, device type, the pages you request, the referring page, and the date and time of each request.",
    ],
  },
  { h: "How we use information" },
  { p: "We use the information we collect to:" },
  {
    list: [
      "respond to your questions and requests;",
      "schedule estimates and appointments;",
      "prepare quotes and agreements;",
      "perform, support and warranty the work you hire us to do;",
      "keep the website secure, prevent misuse and fix problems; and",
      "meet our legal, tax, accounting and regulatory obligations.",
    ],
  },
  { h: "How we share information" },
  {
    p: "We share personal information only as described here:",
  },
  {
    list: [
      "With service providers that help us run our business and this website, such as website hosting and email delivery. They may use the information only to provide services to us.",
      "When required by law, such as in response to a subpoena or court order, or when we believe disclosure is needed to protect the rights, property or safety of our customers, our team or others.",
      "As part of a merger, sale or transfer of our business, in which case the information would remain subject to this notice.",
    ],
  },
  {
    p: "We do not sell your personal information, and we do not share it for cross-context behavioral advertising. We do not share mobile phone numbers or text messaging consent with third parties for their own marketing.",
  },
  { h: "Cookies" },
  {
    p: "This website uses only essential cookies, which are needed for the site to work and stay secure. We don’t currently use advertising or analytics cookies. If that changes, we’ll update this notice to describe what we use and the choices available to you.",
  },
  { h: "How long we keep information" },
  {
    p: "We keep personal information for as long as we need it for the purposes described above. If you contact us but don’t become a customer, we keep your request only as long as it’s useful for following up. If you hire us, we keep project records for the life of the project and its warranties, and as long as the law requires. When we no longer need information, we delete it or make it anonymous.",
  },
  { h: "How we protect information" },
  {
    p: "We use reasonable administrative, technical and physical safeguards to protect personal information, including encrypted connections to this website and limiting access to people who need it. No method of storing or sending information is completely secure, so we can’t guarantee absolute security.",
  },
  { h: "Your choices and rights" },
  {
    list: [
      "You can ask us to tell you what personal information we have about you, to correct it, or to delete it.",
      "You can opt out of text messages at any time by replying STOP, and out of emails by using the unsubscribe link or contacting us.",
      "Depending on the state you live in, privacy laws may give you additional rights, such as the right to receive a copy of your information or to appeal a decision we make about your request.",
    ],
  },
  {
    p: "To make a request, contact us using the details below. We may need to confirm your identity before we act on it, and we won’t treat you differently for exercising your rights. Some information may need to be kept to complete a project, honor a warranty or meet a legal obligation.",
  },
  { h: "Children" },
  {
    p: "This website is not directed to children under 13, and we don’t knowingly collect personal information from them. If you believe a child has given us personal information, contact us and we’ll delete it.",
  },
  { h: "Changes to this notice" },
  {
    p: "We may update this Privacy Notice from time to time. When we do, we’ll change the “Last updated” date at the top of this page. If we make significant changes, we’ll take reasonable steps to let you know.",
  },
  { h: "Contact us" },
  { p: "Questions or requests about your privacy? Reach us at:" },
  ...contactBlocks,
];
