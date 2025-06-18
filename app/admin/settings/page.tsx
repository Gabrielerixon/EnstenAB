// app/admin/settings/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  Shield, 
  Database,
  Info
} from 'lucide-react'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/common/Button'
import Link from 'next/link'

interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  supportEmail: string
  maintenanceMode: boolean
  allowRegistrations: boolean
  enableAnalytics: boolean
  enableNotifications: boolean
}

export default function AdminSettingsPage() {
  const [user, loading] = useAuthState(auth)
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Ensten AB',
    siteDescription: 'Control Your Solar Racing Future',
    contactEmail: 'info@ensten.org',
    supportEmail: 'support@ensten.org',
    maintenanceMode: false,
    allowRegistrations: false,
    enableAnalytics: true,
    enableNotifications: true
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('saving')

    try {
      // TODO: Save to Firestore
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: keyof SiteSettings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mx-auto mb-4" />
          <p className="font-tech">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
      {/* Background Effects */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Header */}
      <header className="relative z-10 bg-solar-carbon/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-racing font-bold text-white">
                  Site Settings
                </h1>
                <p className="text-white/70 text-sm font-tech">
                  Configure website settings and preferences
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleSave}
              variant="primary"
              loading={isSaving}
              icon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        
        {/* Save Status */}
        {saveStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              saveStatus === 'success' 
                ? 'bg-green-500/20 border border-green-500/40 text-green-200'
                : saveStatus === 'error'
                ? 'bg-red-500/20 border border-red-500/40 text-red-200'
                : 'bg-blue-500/20 border border-blue-500/40 text-blue-200'
            }`}
          >
            <div className="flex items-center">
              {saveStatus === 'saving' && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-3" />
              )}
              <span className="font-tech text-sm">
                {saveStatus === 'saving' && 'Saving changes...'}
                {saveStatus === 'success' && 'Settings saved successfully!'}
                {saveStatus === 'error' && 'Failed to save settings. Please try again.'}
              </span>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* General Settings */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center mb-6">
                <Globe className="w-6 h-6 text-solar-electric mr-3" />
                <h2 className="text-xl font-racing font-bold text-white">General Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-tech font-semibold mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-tech font-semibold mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact Settings */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center mb-6">
                <Mail className="w-6 h-6 text-solar-gold mr-3" />
                <h2 className="text-xl font-racing font-bold text-white">Contact Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-tech font-semibold mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-tech font-semibold mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-tech focus:outline-none focus:border-solar-electric"
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-solar-racing mr-3" />
                <h2 className="text-xl font-racing font-bold text-white">Security & Access</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-tech font-semibold">Maintenance Mode</h3>
                    <p className="text-white/60 text-sm font-tech">Put site in maintenance mode</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-solar-electric"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-tech font-semibold">Allow Registrations</h3>
                    <p className="text-white/60 text-sm font-tech">Allow new user registrations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.allowRegistrations}
                      onChange={(e) => handleInputChange('allowRegistrations', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-solar-electric"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-8">
            
            {/* Features */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center mb-6">
                <Settings className="w-6 h-6 text-solar-electric mr-3" />
                <h2 className="text-lg font-racing font-bold text-white">Features</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-tech font-semibold text-sm">Analytics</h3>
                    <p className="text-white/60 text-xs font-tech">Track site usage</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableAnalytics}
                      onChange={(e) => handleInputChange('enableAnalytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-solar-electric"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-tech font-semibold text-sm">Notifications</h3>
                    <p className="text-white/60 text-xs font-tech">Email notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableNotifications}
                      onChange={(e) => handleInputChange('enableNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-solar-electric"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center mb-6">
                <Database className="w-6 h-6 text-solar-gold mr-3" />
                <h2 className="text-lg font-racing font-bold text-white">System Info</h2>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70 font-tech">Version:</span>
                  <span className="text-white font-tech">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 font-tech">Last Backup:</span>
                  <span className="text-white font-tech">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70 font-tech">Uptime:</span>
                  <span className="text-green-400 font-tech">99.9%</span>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-yellow-500/40 p-4">
              <div className="flex items-center mb-2">
                <Info className="w-4 h-4 text-yellow-300 mr-2" />
                <span className="text-yellow-300 font-tech font-semibold text-sm">Important</span>
              </div>
              <p className="text-yellow-200 text-xs font-tech">
                Changes to security settings require admin approval and may affect site functionality.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}