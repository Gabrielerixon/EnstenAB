// components/seo/StructuredData.tsx
import Script from 'next/script'

interface StructuredDataProps {
  data?: object
}

export function StructuredData({ data }: StructuredDataProps) {
  // Default organization data
  const organizationData = {
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

// För produktsidor
export function ProductStructuredData({ product }: { product: any }) {
  const productData = {
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

// Lägg till detta i era komponenter:
// <StructuredData /> i layout.tsx
// <ProductStructuredData product={product} /> i produktsidor