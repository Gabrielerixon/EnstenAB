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
  title: {
    default: "Ensten AB - Control Your Solar Racing Future",
    template: "%s | Ensten AB"
  },
  description: "Avancerade kontrollenheter och komponenter för solracingfordon. Vi ger team möjligheten att nå topprestanda i Bridgestone World Solar Challenge.",
  keywords: [
    // Svenska nyckelord (viktigt för svensk marknad)
    'solracing', 'kontrollenhet', 'solbil', 'BWSC', 'Bridgestone World Solar Challenge',
    'solenergi', 'racing', 'Jönköping', 'Sverige', 'kontrollsystem', 'Current One',
    // Engelska nyckelord
    'solar racing', 'control unit', 'solar car', 'solar panels', 'Ensten AB'
  ],
  authors: [{ name: "Ensten AB", url: "https://ensten.org" }],
  creator: "Ensten AB",
  publisher: "Ensten AB",
  
  // Open Graph (för Facebook, LinkedIn etc)
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    alternateLocale: 'en_US',
    url: 'https://ensten.org',
    siteName: 'Ensten AB',
    title: 'Ensten AB - Control Your Solar Racing Future',
    description: 'Avancerade kontrollenheter för solracingfordon. Topprestanda i BWSC.',
    images: [
      {
        url: '/opengraph-image', // Använder din automatiska OG-image
        width: 1200,
        height: 630,
        alt: 'Ensten AB - Solar Racing Control Systems',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@ensten_ab', // Om ni har Twitter
    creator: '@ensten_ab',
    title: 'Ensten AB - Solar Racing Control Systems',
    description: 'Avancerade kontrollenheter för solracingfordon',
    images: ['/opengraph-image'], // Använder samma som OG
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification (lägg till när ni har dessa)
  verification: {
    google: 'your-google-site-verification-code',
    // yandex: 'your-yandex-verification-code',
  },

  // Canonical URL
  metadataBase: new URL('https://ensten.org'),
  alternates: {
    canonical: '/',
    languages: {
      'sv-SE': '/sv',
      'en-US': '/en',
    },
  },

  // Ensten Favicon - Integrerat i metadata
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },

  // Additional meta tags
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'msapplication-TileColor': '#0A0A0A',
    'theme-color': '#0A0A0A',
  },

  // Web App Manifest
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${orbitron.variable}`}>
      <body className={`${inter.className} relative bg-solar-carbon antialiased`}>
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon" />
          
          {/* Animated tech grid */}
          <div className="absolute inset-0 tech-grid opacity-10" />
          
          {/* FIXED: Static energy particles - no animation, better performance */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => {
              // Generate consistent random positions using index as seed
              const x = ((i * 17) % 100); // Pseudo-random but consistent
              const y = ((i * 23) % 100);
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-solar-electric rounded-full opacity-60"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                />
              );
            })}
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