import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ToastProvider } from "@/components/providers/ToastProvider";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SneakerLab - Premium Sneaker Store",
  description: "Descubre las mejores zapatillas del mercado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-700`}>
        <Navbar />
        {children}
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
