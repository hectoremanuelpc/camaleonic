import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Camaleonic - Dashboard de Redes Sociales",
  description: "Controla todas tus redes sociales desde un solo lugar. Analiza, programa y optimiza tu presencia digital con herramientas avanzadas.",
  keywords: ["redes sociales", "dashboard", "analytics", "instagram", "facebook", "twitter", "linkedin"],
  authors: [{ name: "Camaleonic" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
