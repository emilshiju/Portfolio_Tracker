import "./globals.css";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";

const outfit = Outfit({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Portfolio Tracker",
  description:
    "A real-time web application to track and analyze stock portfolio performance ",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        {children}
      </body>
    </html>
  );
}
