// components/seo/StructuredData.tsx - FIXED TypeScript version
import Script from 'next/script'
import { Product } from '@/lib/types'

// Define proper types for structured data
interface Organization {
  "@context": "https://schema.org"
  "@type": "Organization"
  name: string
  url: string
  logo: string
  description: string
  address: {
    "@type": "PostalAddress"
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  contactPoint: {
    "@type": "ContactPoint"
    telephone: string
    contactType: string
    email: string
  }
  sameAs: string[]
  foundingDate: string
  industry: string
  keywords: string
}

interface ProductSchema {
  "@context": "https://schema.org"
  "@type": "Product"
  name: string
  description: string
  image: string
  brand: {
    "@type": "Brand"
    name: string
  }
  manufacturer: {
    "@type": "Organization"
    name: string
  }
  category: string
  offers: {
    "@type": "Offer"
    availability: string
    priceCurrency: string
    seller: {
      "@type": "Organization"
      name: string
    }
  }
}

// Article schema (för blog posts)
interface ArticleSchema {
  "@context": "https://schema.org"
  "@type": "Article"
  headline: string
  description: string
  image: string
  author: {
    "@type": "Person"
    name: string
  }
  publisher: {
    "@type": "Organization"
    name: string
    logo: {
      "@type": "ImageObject"
      url: string
    }
  }
  datePublished: string
  dateModified: string
}

// FAQ Schema (för produktsidor med Q&A)
interface FAQSchema {
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity: Array<{
    "@type": "Question"
    name: string
    acceptedAnswer: {
      "@type": "Answer"
      text: string
    }
  }>
}

// Union type for all possible structured data schemas
type StructuredDataSchema = Organization | ProductSchema | ArticleSchema | FAQSchema | Record<string, unknown>

interface StructuredDataProps {
  data?: StructuredDataSchema
}

export function StructuredData({ data }: StructuredDataProps) {
  // Default organization data
  const organizationData: Organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ensten AB",
    url: "https://ensten.org",
    logo: "https://ensten.org/images/logo.png",
    description: "Avancerade kontrollenheter och komponenter för solracingfordon",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thorildsgatan 10",
      addressLocality: "Jönköping",
      postalCode: "553 13",
      addressCountry: "SE"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+46-762-972-180",
      contactType: "Customer Service",
      email: "info@ensten.org"
    },
    sameAs: [
      "https://linkedin.com/company/ensten-ab"
    ],
    foundingDate: "2024",
    industry: "Solar Racing Technology",
    keywords: "solar racing, control unit, BWSC, solar car, Current One"
  }

  const jsonLd = data || organizationData

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  )
}

// För produktsidor - now with proper typing
interface ProductStructuredDataProps {
  product: Product
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
  const productData: ProductSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://ensten.org${product.thumbnailPath}`,
    brand: {
      "@type": "Brand",
      name: "Ensten AB"
    },
    manufacturer: {
      "@type": "Organization",
      name: "Ensten AB"
    },
    category: "Solar Racing Equipment",
    offers: {
      "@type": "Offer",
      availability: product.availability === 'available' ? 
        "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      priceCurrency: "SEK",
      seller: {
        "@type": "Organization",
        name: "Ensten AB"
      }
    }
  }

  return <StructuredData data={productData} />
}

// Additional structured data schemas you might need

interface ArticleStructuredDataProps {
  title: string
  description: string
  image: string
  author: string
  publishedDate: string
  modifiedDate?: string
}

export function ArticleStructuredData({ 
  title, 
  description, 
  image, 
  author, 
  publishedDate, 
  modifiedDate 
}: ArticleStructuredDataProps) {
  const articleData: ArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    author: {
      "@type": "Person",
      name: author
    },
    publisher: {
      "@type": "Organization",
      name: "Ensten AB",
      logo: {
        "@type": "ImageObject",
        url: "https://ensten.org/images/logo.png"
      }
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate
  }

  return <StructuredData data={articleData} />
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQStructuredDataProps {
  faqs: FAQItem[]
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const faqData: FAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }

  return <StructuredData data={faqData} />
}