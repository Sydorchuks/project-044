import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

const raceSport = localFont({
  src: "../assets/fonts/race-sport-regular.woff2",
  variable: "--font-race-sport",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReserveNow",
  description: "ReserveNow admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${montserrat.variable} ${roboto.variable} ${raceSport.variable} h-full antialiased`}
    >
      <body className="bg-secondary text-foreground min-h-full font-sans">
        {children}
      </body>
    </html>
  );
}
