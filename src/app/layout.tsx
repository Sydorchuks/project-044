import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
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

export const metadata: Metadata = {
  title: "ReserveNow",
  description: "ReserveNow admin panel",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="uk"
      className={`${montserrat.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="bg-secondary text-foreground min-h-full font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
