import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Sneaker Lab",
  description: "Explore sneakers with Sneaker Lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
