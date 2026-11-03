import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Power Home Remodeling clone (study project)",
  description: "Local UI study of powerhrg.com - not for deployment.",
};

export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} antialiased`}>
      {/* suppressHydrationWarning: browser extensions (e.g. dark-mode tools) add attributes to <body> */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
