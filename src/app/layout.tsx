import type { Metadata } from "next";
import Script from "next/script";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TypeSimple — Report generator",
  description:
    "Design-first report generator. Pick a report → pick a layout → fill → export.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FXZ4J5L0W1"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FXZ4J5L0W1', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(900px_500px_at_90%_0%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(900px_500px_at_40%_110%,rgba(236,72,153,0.14),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,1),rgba(255,255,255,1))] text-zinc-950">
        {children}
      </body>
    </html>
  );
}
