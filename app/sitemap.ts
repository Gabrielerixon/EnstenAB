// app/sitemap.ts - FIXED VERSION
import { MetadataRoute } from 'next'
import { productsData } from '@/lib/products-data' // Fixed: använd productsData istället för products
import { Product } from '@/lib/types' // Import Product type

const baseUrl = 'https://ensten.org'

export default function sitemap(): MetadataRoute.Sitemap {
  // Statiska sidor
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Produktsidor (dynamiska) - Fixed: proper typing
  const productPages = productsData.map((product: Product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Artiklar - Kommenterade ut eftersom ni inte har articles-data än
  // const articlePages = articles.map((article) => ({
  //   url: `${baseUrl}/education/${article.id}`,
  //   lastModified: new Date(article.publishedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [
    ...staticPages,
    ...productPages,
    // ...articlePages, // Lägg till när ni har articles
  ]
}