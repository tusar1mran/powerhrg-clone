import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import MobileActionBar from "@/components/site/MobileActionBar";
import SkipLink from "@/components/site/SkipLink";

// Body copy and UI labels. Variable font, so every weight comes from one file.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Headings on the legacy pages. The optical-size axis is loaded so large titles get the display cut.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

// Headings in the redesign (header, footer, home, roofing). A variable grotesque with an
// optical-size axis, so the very large hero type tightens up while small labels stay open.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/assets/photos/home-hero.jpg", width: 2400, height: 1600, alt: "Suburban home exterior" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#121b20",
};

// The header, footer and mobile Call / Quote bar are shared by every page, so they live here
// instead of being repeated in each page.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("antialiased", inter.variable, fraunces.variable, bricolage.variable, "font-sans")}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. dark-mode tools) add attributes to <body> */}
      <body suppressHydrationWarning>
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
