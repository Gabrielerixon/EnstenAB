import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { ConditionalHeader } from "@/components/layout/ConditionalHeader";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Ensten AB - Control Your Solar-Powered Car",
  description: "Current One control unit designed for solar-powered vehicles competing in the Bridgestone World Solar Challenge 2025. Engineered for optimal performance and efficiency.",
  keywords: ["Ensten AB", "Current One", "solar racing", "control unit", "BWSC 2025", "Bridgestone World Solar Challenge", "solar car", "solar-powered vehicle"],
  authors: [{ name: "Ensten AB" }],
  openGraph: {
    title: "Ensten AB - Control Your Solar-Powered Car",
    description: "Current One control unit for solar racing championship performance",
    url: "https://ensten.org",
    siteName: "Ensten AB",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${orbitron.variable}`}>
      <body className={`${inter.className} relative bg-solar-carbon antialiased`}>
        {/* Dynamic Background Effects */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon" />
          
          {/* Animated tech grid */}
          <div className="absolute inset-0 tech-grid opacity-10" />
          
          {/* Energy particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-solar-electric rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          
          {/* Ambient glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-solar-electric/5 rounded-full blur-3xl animate-pulse" />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-solar-gold/5 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '1s' }} 
          />
        </div>
        
        {/* Main content container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <ConditionalHeader />
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <ConditionalFooter />
        </div>
      </body>
    </html>
  );
}