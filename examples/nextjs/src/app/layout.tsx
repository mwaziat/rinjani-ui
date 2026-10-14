import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RinjaniLocaleProvider } from "rinjani-ui";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rinjani UI — Lightweight React UI",
    template: "%s · Rinjani UI",
  },
  description: "A lightweight React and Tailwind CSS component library for fast, expressive interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <RinjaniLocaleProvider locale="en">
          {children}
        </RinjaniLocaleProvider>
      </body>
    </html>
  );
}
