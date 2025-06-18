// app/debug/firebase/page.tsx - Create this file to test
'use client'

export default function FirebaseDebugPage() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Firebase Debug Page</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl">Environment Variables Status:</h2>
        
        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span>{key}:</span>
            <span className={value ? 'text-green-400' : 'text-red-400'}>
              {value ? '✅ Set' : '❌ Missing'}
            </span>
          </div>
        ))}
        
        <div className="mt-8">
          <h2 className="text-xl mb-4">Actual Values (first 10 chars):</h2>
          {Object.entries(config).map(([key, value]) => (
            <div key={key} className="mb-2">
              <strong>{key}:</strong> {value ? `${value.substring(0, 10)}...` : 'MISSING'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}