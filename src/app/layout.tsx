import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

// Body copy, headings and UI labels. Variable font with the width axis loaded, so the condensed
// heading cut and every weight come from one file.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Annotations: sheet numbers, callout labels, captions and title block labels.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable} antialiased`}>
      {/* suppressHydrationWarning: browser extensions (e.g. dark-mode tools) add attributes to <body> */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
