import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import MobileActionBar from "@/components/site/MobileActionBar";

// Body copy and UI labels. Variable font, so every weight comes from one file.
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

// Headings. A single regular weight with an italic for emphasis, used at display sizes only.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Drawing annotations: part numbers, layer labels and sheet notes.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
};

// The header, footer and mobile call/quote bar are shared by every page, so they live here
// instead of in each page.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("antialiased", instrumentSans.variable, instrumentSerif.variable, plexMono.variable)}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. dark-mode tools) add attributes to <body> */}
      <body suppressHydrationWarning className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
