import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { themeScript } from "@/lib/themes";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
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
    images: [{ url: "/assets/photos/home-hero.jpg", width: 2400, height: 1600, alt: "Modern home exterior at dusk" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#1f3a30",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. dark-mode tools) add attributes to <body> */}
      <body suppressHydrationWarning>
        {children}
        <ThemeSwitcher />
      </body>
    </html>
  );
}
