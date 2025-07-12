// lib/products-service.ts - Service for managing products in Firebase
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  query, 
  orderBy,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { db } from './firebase'
import { Product } from './types'
import { productsData } from './products-data'

const COLLECTION_NAME = 'products'

// Interface for update data
interface ProductUpdateData {
  [key: string]: unknown
  updatedAt?: ReturnType<typeof serverTimestamp>
}

export class ProductsService {
  
  // Get all products
  static async getProducts(): Promise<Product[]> {
    try {
      console.log('📦 Fetching all products from Firestore...')
      const q = query(
        collection(db, COLLECTION_NAME), 
        orderBy('name', 'asc')
      )
      const querySnapshot = await getDocs(q)
      
      const products = querySnapshot.docs.map(doc => {
        const data = doc.data()
        console.log('📄 Processing product:', doc.id, data.name)
        return {
          id: doc.id,
          ...data,
        } as Product
      })
      
      console.log('✅ Successfully loaded', products.length, 'products')
      return products
    } catch (error) {
      console.error('❌ Error fetching products:', error)
      // Fallback to hardcoded data if Firebase fails
      console.log('🔄 Falling back to hardcoded product data')
      return productsData
    }
  }

  // Get product by ID
  static async getProduct(id: string): Promise<Product | null> {
    try {
      console.log('🔍 Fetching product with ID:', id)
      const docRef = doc(db, COLLECTION_NAME, id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        console.log('✅ Found product:', data.name)
        return {
          id: docSnap.id,
          ...data,
        } as Product
      } else {
        console.log('❌ Product not found with ID:', id)
        // Fallback to hardcoded data
        const hardcodedProduct = productsData.find(p => p.id === id)
        if (hardcodedProduct) {
          console.log('🔄 Found in hardcoded data:', hardcodedProduct.name)
          return hardcodedProduct
        }
        return null
      }
    } catch (error) {
      console.error('❌ Error fetching product:', error)
      // Fallback to hardcoded data
      const hardcodedProduct = productsData.find(p => p.id === id)
      return hardcodedProduct || null
    }
  }

  // Update product
  static async updateProduct(id: string, updates: Partial<Product>): Promise<boolean> {
    try {
      console.log('✏️ Updating product with ID:', id)
      console.log('📝 Updates to apply:', updates)
      
      const docRef = doc(db, COLLECTION_NAME, id)
      
      // Prepare update data with proper typing
      const updateData: ProductUpdateData = {
        ...updates,
        updatedAt: serverTimestamp(),
      }
      
      // Remove undefined values and id field
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined || key === 'id') {
          delete updateData[key]
        }
      })
      
      console.log('💾 Final update data:', updateData)
      
      await updateDoc(docRef, updateData)
      console.log('✅ Product updated successfully')
      return true
    } catch (error) {
      console.error('❌ Error updating product:', error)
      throw error // Re-throw to handle in UI
    }
  }

  // Seed products to Firebase (utility function)
  static async seedProducts(): Promise<boolean> {
    try {
      console.log('🌱 Seeding products to Firebase...')
      
      for (const product of productsData) {
        console.log(`📦 Seeding product: ${product.name}`)
        const docRef = doc(db, COLLECTION_NAME, product.id)
        
        // Check if product already exists
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          console.log(`⏭️ Product already exists: ${product.name}`)
          continue
        }
        
        await setDoc(docRef, {
          ...product,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        console.log(`✅ Seeded product: ${product.name}`)
      }
      
      console.log('🎉 Successfully seeded all products!')
      return true
    } catch (error) {
      console.error('❌ Error seeding products:', error)
      throw error
    }
  }

  // Get product count
  static async getProductCount(): Promise<number> {
    try {
      const products = await this.getProducts()
      return products.length
    } catch (error) {
      console.error('❌ Error getting product count:', error)
      return productsData.length // Fallback to hardcoded count
    }
  }

  // Get products by category
  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const products = await this.getProducts()
      return products.filter(product => product.category === category)
    } catch (error) {
      console.error('❌ Error fetching products by category:', error)
      return productsData.filter(product => product.category === category)
    }
  }

  // Get products by availability
  static async getProductsByAvailability(availability: string): Promise<Product[]> {
    try {
      const products = await this.getProducts()
      return products.filter(product => product.availability === availability)
    } catch (error) {
      console.error('❌ Error fetching products by availability:', error)
      return productsData.filter(product => product.availability === availability)
    }
  }

  // Debug function to list all products
  static async debugListAllProducts(): Promise<void> {
    try {
      console.log('🔍 DEBUG: Listing all products in collection...')
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
      console.log('📊 Total products:', querySnapshot.size)
      
      querySnapshot.forEach((doc) => {
        console.log('📦 Product ID:', doc.id)
        console.log('📝 Product data:', doc.data())
        console.log('---')
      })
    } catch (error) {
      console.error('❌ Debug error:', error)
    }
  }
}