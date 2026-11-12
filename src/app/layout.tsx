import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import "@fontsource-variable/figtree";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/space-mono/400.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rishi — Developer, thinker, builder.",
  description: "Rishi is a developer and AI enthusiast based in India, building things at the intersection of AI, technology and creativity. Explore selected projects and experiments.",
  applicationName: "Rishi’s Portfolio",
  keywords: ["Rishi", "developer", "AI", "portfolio", "Flutter", "Next.js", "India"],
  authors: [{ name: "Rishi" }],
  openGraph: { title: "Rishi — Developer, thinker, builder.", description: "Thoughtful code. Curious mind. Building at the intersection of AI, technology and creativity.", type: "website", locale: "en_IN", siteName: "Rishi’s Portfolio" },
  twitter: { card: "summary_large_image", title: "Rishi — Developer, thinker, builder.", description: "Building things at the intersection of AI, technology and creativity." },
};
export const viewport: Viewport = { themeColor: "#0c0c0d", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
