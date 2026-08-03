import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "@/components/providers/MotionProvider";
import { SITE_CONFIG } from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourname.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "full-stack developer",
    ".NET developer",
    "C# developer",
    "Flutter developer",
    "React developer",
    "Next.js",
    "VueJS developer",
    "Nuxt developer",
    "TypeScript",
    "web developer",
    "software engineer",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-paper-100 text-ink-800 antialiased">
        {/* ── Content-visibility failsafe ──────────────────────────────────
            Framer Motion server-renders its `initial` state, so ~60 elements
            ship with inline `opacity:0` and only become visible once the JS
            has loaded, hydrated and run. If any of that fails the visitor
            gets a header, a footer, and nothing in between.

            Two nets, covering the two distinct failure modes:
              1. Scripting disabled entirely — <noscript> applies.
              2. Scripting on but the bundle never runs (chunk 404s, blocked
                 by an extension, throws on an old browser). The inline script
                 below still executes, and reveals everything if the app has
                 not marked itself hydrated within 2.5s.
            On a healthy load neither net fires and the animations play. */}
        <noscript>
          <style>
            {
              '[style*="opacity:0"]{opacity:1!important;transform:none!important}'
            }
          </style>
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "setTimeout(function(){" +
              "if(document.documentElement.dataset.hydrated)return;" +
              "var s=document.createElement('style');" +
              "s.textContent='[style*=\"opacity:0\"]{opacity:1!important;transform:none!important}';" +
              "document.head.appendChild(s);" +
              "},2500);",
          }}
        />

        {/* Skip-to-content link for keyboard & screen-reader users */}
        <a
          href="#main-content"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-ink-950 focus:px-4 focus:py-3 focus:text-paper-50 focus:shadow-lg focus:ring-2 focus:ring-sky-200"
        >
          Skip to main content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
