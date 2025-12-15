import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading"
})

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body"
})

export const metadata: Metadata = {
  title: "Wellness Studio",
  description: "FlowPass - a simple NFT membership pass for wellness studios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} min-h-screen`}
      >
       <Providers> {children}</Providers>
      </body>
    </html>
  );
}
