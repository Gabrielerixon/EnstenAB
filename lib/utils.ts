import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Combine class names with Tailwind merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency
export function formatCurrency(amount: number, currency = 'SEK'): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format date
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

// Generate slug from text
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

// Truncate text
export function truncate(text: string, length = 100): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Check if element is in viewport
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Calculate reading time
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const numberOfWords = text.split(/\s/g).length
  return Math.ceil(numberOfWords / wordsPerMinute)
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Get file extension
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

// Format file size
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

// Generate random ID
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

// Deep clone object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// Get query parameters
export function getQueryParams(url: string): Record<string, string> {
  const params = new URLSearchParams(new URL(url).search)
  const result: Record<string, string> = {}
  
  params.forEach((value, key) => {
    result[key] = value
  })
  
  return result
}

// Check if device is mobile
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// Scroll to element
export function scrollToElement(elementId: string, offset = 0): void {
  const element = document.getElementById(elementId)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

// Get contrast color (black or white) based on background
export function getContrastColor(hexColor: string): 'black' | 'white' {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  return luminance > 0.5 ? 'black' : 'white'
}