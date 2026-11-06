import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, Instrument_Serif, Manrope, Oswald, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { themeScript } from "@/lib/themes";
import { layoutScript } from "@/lib/layouts";
import DesignDock from "@/components/DesignDock";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  preload: false,
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  preload: false,
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  preload: false,
});

const fontVars = [manrope, fraunces, instrument, bricolage, oswald, space].map((f) => f.variable).join(" ");

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
    images: [{ url: "/assets/photos/home-hero.jpg", width: 2400, height: 1600, alt: "Modern home exterior at dusk" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#1f3a30",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVars} antialiased`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript() + layoutScript() }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. dark-mode tools) add attributes to <body> */}
      <body suppressHydrationWarning>
        {children}
        <DesignDock />
      </body>
    </html>
  );
}
