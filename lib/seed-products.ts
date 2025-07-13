// lib/seed-products.ts - Utility to seed Firebase with product data
import { ProductsService } from './products-service'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

/**
 * Seeds Firebase with all products from products-data.ts
 */
export async function seedProductsToFirebase(): Promise<void> {
  try {
    console.log('🌱 Starting product seeding process...')
    await ProductsService.seedProducts()
    console.log('✅ Products seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding products:', error)
    throw new Error(`Failed to seed products: ${error}`)
  }
}

/**
 * Removes ALL products from Firebase (use with caution!)
 */
export async function clearAllProducts(): Promise<void> {
  try {
    console.log('🗑️ Starting to clear all products...')
    
    const querySnapshot = await getDocs(collection(db, 'products'))
    console.log(`📊 Found ${querySnapshot.size} products to delete`)
    
    const deletePromises = querySnapshot.docs.map(docSnapshot => {
      console.log(`🗑️ Deleting product: ${docSnapshot.id}`)
      return deleteDoc(doc(db, 'products', docSnapshot.id))
    })
    
    await Promise.all(deletePromises)
    console.log('✅ All products cleared successfully!')
    
  } catch (error) {
    console.error('❌ Error clearing products:', error)
    throw new Error(`Failed to clear products: ${error}`)
  }
}

/**
 * Debug function to show all products in the database
 */
export async function debugProductDatabase(): Promise<string> {
  try {
    console.log('🔍 Debugging product database...')
    
    const querySnapshot = await getDocs(collection(db, 'products'))
    let debugOutput = `🔍 DATABASE DEBUG - PRODUCTS COLLECTION\n`
    debugOutput += `📊 Total products found: ${querySnapshot.size}\n\n`
    
    if (querySnapshot.empty) {
      debugOutput += `❌ No products found in database\n`
      debugOutput += `💡 Try seeding products first\n`
    } else {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        debugOutput += `📦 ID: ${doc.id}\n`
        debugOutput += `   Name: ${data.name || 'No name'}\n`
        debugOutput += `   Category: ${data.category || 'No category'}\n`
        debugOutput += `   Availability: ${data.availability || 'No availability'}\n`
        debugOutput += `   Price: ${data.price || 'No price'}\n`
        debugOutput += `   Created: ${data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : 'No date'}\n`
        debugOutput += `   ---\n`
      })
    }
    
    console.log(debugOutput)
    return debugOutput
    
  } catch (error) {
    const errorMsg = `❌ Debug error: ${error}`
    console.error(errorMsg)
    return errorMsg
  }
}