// lib/types.ts - Updated with 3D model support
// Core type definitions for the Ensten AB website

// Navigation
export interface NavigationItem {
  label: string
  href: string
  external?: boolean
}

// 3D Models
export interface Model3D {
  path: string
  name: string
  description: string
}

// Products
export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  shortDescription: string
  modelPath: string
  thumbnailPath: string
  features: Feature[]
  specifications: Specification[]
  images: ProductImage[]
  highlights: string[]
  category: ProductCategory
  price?: string
  availability: 'available' | 'pre-order' | 'coming-soon'
  models3D?: Model3D[] // Optional 3D models array
}

export interface Feature {
  id: string
  title: string
  description: string
  icon?: string
  position?: Position3D // For 3D hotspots
}

export interface Specification {
  label: string
  value: string
  unit?: string
}

export interface ProductImage {
  src: string
  alt: string
  caption?: string
}

export type ProductCategory = 'control-unit' | 'solar-panel' | 'accessory'

// 3D Related
export interface Position3D {
  x: number
  y: number
  z: number
}

export interface Model3DConfig {
  path: string
  scale?: number
  position?: Position3D
  rotation?: Position3D
  autoRotate?: boolean
  rotationSpeed?: number
}

// Education/Blog
export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: TeamMember
  publishedAt: string
  updatedAt?: string
  category: ArticleCategory
  tags: string[]
  featuredImage: string
  readingTime: number
}

export type ArticleCategory = 
  | 'solar-racing' 
  | 'technical-guide' 
  | 'news' 
  | 'case-study'
  | 'tutorial'

// Team
export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  email?: string
  linkedin?: string
}

// Contact
export interface ContactFormData {
  name: string
  email: string
  company?: string
  subject: string
  message: string
  teamSize?: string
  interestedIn?: ProductCategory[]
}

// API Responses
export interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

// SEO
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
}

// Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface SectionProps extends BaseComponentProps {
  id?: string
  fullWidth?: boolean
  noPadding?: boolean
  background?: 'default' | 'dark' | 'light' | 'gradient'
}

// Events
export interface SolarEvent {
  id: string
  name: string
  date: string
  location: string
  description: string
  registrationUrl?: string
  image?: string
}

// Utilities
export type Nullish<T> = T | null | undefined