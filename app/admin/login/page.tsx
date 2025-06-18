// app/admin/login/page.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { motion } from 'framer-motion'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle,
  Zap,
  Shield,
  Users,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/common/Button'

// Admin users data for display
const adminUsers = [
  {
    email: 'oskar@ensten.org',
    name: 'Oskar Administrator',
    role: 'Full Access',
    permissions: ['Blog Management', 'User Management', 'Analytics', 'Settings']
  },
  {
    email: 'erik@ensten.org',
    name: 'Erik Törnqvist',
    role: 'Chief Operating Officer',
    permissions: ['Blog Management', 'Content Creation', 'Team Management']
  },
  {
    email: 'goncalo@ensten.org',
    name: 'Gonçalo Marques',
    role: 'Chief Product Officer',
    permissions: ['Blog Management', 'Product Content', 'Technical Guides']
  },
  {
    email: 'daniel@ensten.org',
    name: 'Daniel Pito',
    role: 'Technical Engineer',
    permissions: ['Technical Content', 'Documentation', 'Support']
  },
  {
    email: 'linus@ensten.org',
    name: 'Linus Andersson',
    role: 'Technical Engineer',
    permissions: ['Technical Content', 'Documentation', 'Research']
  }
]

export default function AdminLoginPage() {
  const [user, loading] = useAuthState(auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push('/admin/dashboard')
    }
  }, [user, loading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Redirect will happen via useEffect
    } catch (error: any) {
      console.error('Login error:', error)
      switch (error.code) {
        case 'auth/user-not-found':
          setLoginError('No account found with this email address.')
          break
        case 'auth/wrong-password':
          setLoginError('Incorrect password.')
          break
        case 'auth/invalid-email':
          setLoginError('Invalid email address.')
          break
        case 'auth/too-many-requests':
          setLoginError('Too many failed attempts. Please try again later.')
          break
        default:
          setLoginError('Login failed. Please check your credentials.')
      }
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleQuickSelect = (userEmail: string) => {
    setEmail(userEmail)
    setSelectedUser(userEmail)
    setLoginError('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mx-auto mb-4" />
          <p className="font-tech">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Back to Website Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Website
          </Button>
        </Link>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-solar-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-racing font-bold text-white mb-2">
                Ensten AB Admin
              </h1>
              <p className="text-white/70 font-tech">
                Secure access to content management system
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white font-tech font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20"
                    placeholder="your.email@ensten.org"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-tech font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 font-tech focus:outline-none focus:border-solar-electric focus:ring-2 focus:ring-solar-electric/20"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-4 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200"
                >
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-tech text-sm">{loginError}</span>
                </motion.div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoggingIn}
                className="text-lg py-4"
              >
                {isLoggingIn ? 'Signing In...' : 'Sign In to Admin Panel'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm font-tech">
                Having trouble? Contact the system administrator
              </p>
            </div>
          </motion.div>

          {/* Right Column - Team Directory */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-racing font-bold text-white mb-3">
                Authorized Users
              </h2>
              <p className="text-white/70 font-tech">
                Select your account for quick access
              </p>
            </div>

            <div className="space-y-4">
              {adminUsers.map((adminUser, index) => (
                <motion.div
                  key={adminUser.email}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleQuickSelect(adminUser.email)}
                  className={`bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl border p-4 cursor-pointer transition-all duration-300 hover:border-white/40 ${
                    selectedUser === adminUser.email 
                      ? 'border-solar-electric bg-solar-electric/10' 
                      : 'border-white/20'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-solar-gradient rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-racing font-bold">
                        {adminUser.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-white font-tech font-semibold">
                        {adminUser.name}
                      </h3>
                      <p className="text-solar-electric text-sm font-tech">
                        {adminUser.role}
                      </p>
                      <p className="text-white/60 text-xs font-tech">
                        {adminUser.email}
                      </p>
                    </div>

                    {selectedUser === adminUser.email && (
                      <CheckCircle className="w-5 h-5 text-solar-electric" />
                    )}
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {adminUser.permissions.map((permission, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs font-tech"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-r from-solar-racing/20 to-solar-electric/20 backdrop-blur-sm rounded-xl border border-white/20 p-4">
              <div className="flex items-center mb-2">
                <Lock className="w-4 h-4 text-solar-electric mr-2" />
                <span className="text-white font-tech font-semibold text-sm">
                  Security Notice
                </span>
              </div>
              <p className="text-white/80 text-xs font-tech">
                This is a secure area. All login attempts are monitored and logged. 
                Contact admin@ensten.org for account issues.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}