import { NavigationItem, ProductCategory } from './types'

// Site Configuration
export const SITE_CONFIG = {
  name: 'Ensten AB',
  tagline: 'Control Your Solar Racing Future',
  description: 'Advanced control units and components for solar racing vehicles. Empowering teams to achieve peak performance in the Bridgestone World Solar Challenge.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ensten.org',
  email: 'info@ensten.org',
  phone: '+46 123 456 789', // Update this with actual phone number
  address: {
    street: 'Thorildsgatan 10',
    city: 'Jönköping',
    postalCode: '553 13',
    country: 'Sweden'
  },
  social: {
    linkedin: 'https://linkedin.com/company/ensten-ab',
  }
}

// Navigation
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Education', href: '/education' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// Products
export const PRODUCT_CATEGORIES: Record<ProductCategory, string> = {
  'control-unit': 'Control Units',
  'solar-panel': 'Solar Panels',
  'accessory': 'Accessories'
}

export const FEATURED_PRODUCTS = ['current-one', 'solar-panel', 'cansuba']

// API Endpoints
export const API_ENDPOINTS = {
  products: '/api/products',
  contact: '/api/contact',
  newsletter: '/api/newsletter',
} as const

// Animation Variants (for Framer Motion)
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideIn: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  }
}

// Timing
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8
} as const

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const

// 3D Model Configurations
export const MODEL_CONFIGS = {
  hero: {
    scale: 1.5,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    autoRotate: true,
    rotationSpeed: 0.5
  },
  productViewer: {
    scale: 1,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    autoRotate: true,
    rotationSpeed: 1
  }
}

// Colors (matching Tailwind config)
export const COLORS = {
  ensten: {
    black: '#0A0A0A',
    orange: '#FF6B35',
    blue: '#004E98',
    gray: '#F7F7F7',
  },
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6'
} as const

// Meta Tags (English + Swedish)
export const DEFAULT_META_TAGS = {
  title: 'Ensten AB - Control Your Solar Racing Future',
  titleSv: 'Ensten AB - Kontrollera Din Solracingframtid',
  description: SITE_CONFIG.description,
  descriptionSv: 'Avancerade kontrollenheter och komponenter för solracingfordon. Vi ger team möjligheten att nå topprestanda i Bridgestone World Solar Challenge.',
  keywords: [
    // English keywords
    'solar racing',
    'control unit',
    'BWSC',
    'Bridgestone World Solar Challenge',
    'solar car',
    'Current One',
    'Ensten AB',
    'Solar panels for solar car',
    // Swedish keywords
    'solracing',
    'kontrollenhet',
    'solbil',
    'solenergi',
    'racing',
    'Jönköping',
    'Sverige',
    'kontrollsystem',
    'solracingbilar',
    'solbilstävling',
    'solpaner till solbil'
  ],
  ogImage: '/images/og-image.jpg',
  // Additional Swedish meta tags
  author: 'Ensten AB',
  locality: 'Jönköping',
  region: 'Jönköping',
  country: 'SE',
  language: 'sv-SE',
  alternateLanguage: 'en',
  businessType: 'Teknikföretag',
  industry: 'Solenergi och Racing'
}

// Swedish UI Text
export const SWEDISH_UI = {
  navigation: {
    home: 'Hem',
    products: 'Produkter',
    education: 'Utbildning',
    about: 'Om oss',
    contact: 'Kontakt'
  },
  buttons: {
    learnMore: 'Läs mer',
    contact: 'Kontakta oss',
    orderNow: 'Beställ nu',
    readMore: 'Läs mer',
    back: 'Tillbaka'
  },
  footer: {
    address: 'Adress',
    email: 'E-post',
    phone: 'Telefon',
    followUs: 'Följ oss',
    allRightsReserved: 'Alla rättigheter förbehållna'
  }
}

// Form Validation
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  swedishPostalCode: /^\d{3}\s?\d{2}$/
} as const

// File Size Limits
export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5MB
  model: 10 * 1024 * 1024, // 10MB
  document: 10 * 1024 * 1024, // 10MB
} as const

// Company Registration
export const COMPANY_INFO = {
  orgNumber: '559470-2770', // Add actual organization number
  vatNumber: 'SExxxxxxxxxx', // Add actual VAT number
  registeredName: 'Ensten AB',
  registeredAddress: {
    street: 'Thorildsgatan 10',
    city: 'Jönköping',
    postalCode: '553 13',
    country: 'Sverige'
  }
}

// ADD these to your existing constants.ts file:

// Admin navigation (shown when authenticated)
export const ADMIN_NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Blog Admin', href: '/admin/blog' },
  { label: 'Products Admin', href: '/admin/products' },
  { label: 'Analytics', href: '/admin/analytics' },
]

// ADD blog categories:
export const BLOG_CATEGORIES = {
  'solar-racing': 'Solar Racing',
  'technical-guide': 'Technical Guides', 
  'news': 'News & Updates',
  'case-study': 'Case Studies',
  'tutorial': 'Tutorials'
} as const