// scripts/test-firebase.js - Test Firebase setup
// Run with: node scripts/test-firebase.js

require('dotenv').config({ path: '.env.local' })

async function testFirebaseSetup() {
  console.log('🔥 Testing Firebase Setup...\n')

  // Check environment variables
  console.log('📋 Environment Variables:')
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'FIREBASE_PROJECT_ID', 
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
  ]

  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.log('❌ Missing environment variables:')
    missingVars.forEach(varName => console.log(`   - ${varName}`))
    console.log('\n💡 Please add these to your .env.local file\n')
    return
  }

  console.log('✅ All required environment variables found\n')

  // Test Firebase Admin connection
  try {
    console.log('🔗 Testing Firebase Admin connection...')
    
    const admin = require('firebase-admin')
    
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      })
    }

    const db = admin.firestore()
    const auth = admin.auth()

    // Test Firestore connection
    await db.collection('test').add({ timestamp: new Date(), test: true })
    console.log('✅ Firestore connection successful')

    // Test Auth connection and list users
    const listUsersResult = await auth.listUsers()
    console.log(`✅ Auth connection successful - Found ${listUsersResult.users.length} users`)

    // List admin users - UPDATED LIST
    console.log('\n👥 Admin Users:')
    const adminEmails = [
      'oskar@ensten.org',     // Updated from admin@ensten.org
      'erik@ensten.org', 
      'goncalo@ensten.org',
      'daniel@ensten.org',
      'linus@ensten.org'
    ]

    for (const email of adminEmails) {
      try {
        const user = await auth.getUserByEmail(email)
        console.log(`   ✅ ${email} - Exists (UID: ${user.uid})`)
      } catch (error) {
        console.log(`   ❌ ${email} - Not found`)
      }
    }

    console.log('\n🎉 Firebase setup test completed successfully!')
    
  } catch (error) {
    console.log('❌ Firebase connection failed:')
    console.log(error.message)
    
    if (error.message.includes('private key')) {
      console.log('\n💡 Check your FIREBASE_PRIVATE_KEY format in .env.local')
      console.log('   Make sure it has quotes around it and includes \\n characters')
    } else {
      console.log('\n💡 Check your environment variables and Firebase project settings')
    }
  }
}

// Run the test
testFirebaseSetup().catch(console.error)