// app/products/[id]/page.tsx - UPPDATERAD MED STRUCTURED DATA
'use client'

import { useState, Suspense } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Zap, Shield, Cpu, Download, ExternalLink, Star, Box } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/common/Button'
import { getProductById } from '@/lib/products-data'
import { ProductStructuredData } from '@/components/seo/StructuredData' // NYTT: Import structured data
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

// Define gallery item types
interface GalleryItem3D {
  type: '3d-model'
  src: string
  name: string
  description: string
  alt: string
}

interface GalleryItemImage {
  type: 'image'
  src: string
  alt: string
  caption?: string
  name?: string
}

type GalleryItemType = GalleryItem3D | GalleryItemImage

// Interactive 3D Model Component with MUCH BIGGER scaling and proper orientation
function Interactive3DModel({ modelPath }: { modelPath: string }) {
  const gltf = useGLTF(modelPath)

  // MUCH BIGGER: Scale up significantly for proper visibility
  let scale = [20, 20, 20] // Massively increased from [4, 4, 4] to [15, 15, 15]
  
  // Handle specific model orientations
  let rotation = [0, 0, 0]
  if (modelPath.includes('solpanel')) {
    // Rotate solar panel so it displays face-up instead of face-down
    scale = [12, 12, 12]
    rotation = [Math.PI, 0, 0] // 180 degrees rotation around X-axis
  }

  return (
    <primitive 
      object={gltf.scene} 
      scale={scale}
      position={[0, 0, 0]}
      rotation={rotation}
    />
  )
}

// 3D Viewer Component with WHITE BACKGROUND and enhanced lighting
function Model3DViewer({ modelPath }: { modelPath: string }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="w-full h-full relative">
      {/* Loading indicator - FIXED for white background */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm z-10 rounded-2xl">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin mb-2" />
            <span className="text-solar-carbon text-sm font-tech font-semibold">Loading 3D Model...</span>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ 
          position: [8, 5, 12], // Moved camera further back for much larger models
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.8 }}
        gl={{ 
          antialias: true,
          alpha: false, // Disabled alpha for solid white background
          powerPreference: "high-performance"
        }}
        style={{ 
          background: '#ffffff', // WHITE BACKGROUND instead of transparent
          borderRadius: '1rem'
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#ffffff', 1) // Ensure white background
          setIsLoading(false)
        }}
      >
        {/* IMPROVED LIGHTING FOR WHITE BACKGROUND */}
        <color attach="background" args={['#ffffff']} />
        
        {/* Studio lighting setup for white background */}
        <ambientLight intensity={0.4} color="#ffffff" />
        
        {/* Key light - main illumination */}
        <directionalLight 
          position={[10, 10, 8]} 
          intensity={1.5}
          color="#ffffff"
          castShadow={false}
        />
        
        {/* Fill light - reduces harsh shadows */}
        <directionalLight 
          position={[-8, 5, 6]} 
          intensity={0.8}
          color="#f8f9fa"
        />
        
        {/* Rim light - adds definition */}
        <directionalLight 
          position={[0, -5, -10]} 
          intensity={0.6}
          color="#e9ecef"
        />
        
        {/* Top light for better overall illumination */}
        <directionalLight 
          position={[0, 15, 0]} 
          intensity={0.7}
          color="#ffffff"
        />
        
        <Suspense fallback={null}>
          <Interactive3DModel modelPath={modelPath} />
        </Suspense>
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          maxDistance={25} // Increased for much larger models
          minDistance={5} // Increased for much larger models
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}

// Gallery Item Component
function GalleryItem({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: GalleryItemType; 
  isActive: boolean; 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
        isActive 
          ? 'border-solar-electric' 
          : 'border-white/20 hover:border-white/40'
      }`}
    >
      <div className="w-full h-full bg-white/10 flex items-center justify-center">
        {item.type === '3d-model' ? (
          <div className="text-center text-white">
            <Box className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">3D</span>
          </div>
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {item.type === '3d-model' && (
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-solar-electric rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      )}
    </button>
  )
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'downloads'>('overview')

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-racing font-bold mb-2">Product Not Found</h1>
          <p className="text-white/70 font-tech mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products">
            <Button variant="primary">Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  // ÄNDRAT: Bilder först, sedan 3D-modeller
  const galleryItems: GalleryItemType[] = [
    // BILDER FÖRST
    ...product.images.map(image => ({
      type: 'image' as const,
      src: image.src,
      alt: image.alt,
      caption: image.caption,
      name: image.caption || product.name
    })),
    // 3D-MODELLER EFTER
    ...(product.models3D?.map(model => ({
      type: '3d-model' as const,
      src: model.path,
      name: model.name,
      description: model.description,
      alt: `3D Model of ${model.name}`
    })) || [])
  ]

  const activeGalleryItem = galleryItems[activeGalleryIndex]

  return (
    <>
      {/* NYTT: Product Structured Data - Lägg till detta längst upp */}
      <ProductStructuredData product={product} />
      
      <div className="min-h-screen bg-gradient-to-br from-solar-carbon via-solar-slate to-solar-carbon">
        {/* Background Effects */}
        <div className="absolute inset-0 tech-grid opacity-20" />
        
        {/* Header */}
        <section className="relative pt-32 pb-16">
          <div className="container mx-auto px-6">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center mb-8"
            >
              <Link href="/products" className="flex items-center text-white/60 hover:text-solar-electric transition-colors font-tech">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Link>
            </motion.div>

            {/* Product Header */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              {/* Product Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Main Display */}
                <div className="relative aspect-square bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                  {activeGalleryItem?.type === '3d-model' ? (
                    <div className="w-full h-full">
                      <Model3DViewer 
                        modelPath={activeGalleryItem.src}
                      />
                      
                      {/* 3D Controls Overlay - FIXED with dark text for white background */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-solar-electric/30 shadow-lg">
                        <div className="flex items-center text-solar-carbon text-sm font-tech font-semibold">
                          <Box className="w-4 h-4 mr-2 text-solar-electric" />
                          <span>Interactive 3D Model</span>
                        </div>
                        <p className="text-solar-carbon/80 text-xs mt-1">Click and drag to rotate • Scroll to zoom</p>
                      </div>
                      
                      {/* Enhanced model indicator - FIXED for white background */}
                      <div className="absolute top-4 right-4 bg-green-600 backdrop-blur-sm rounded-lg px-3 py-1 border border-green-400/30 shadow-lg">
                        <span className="text-white text-xs font-tech font-semibold">Enhanced 3D View</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full p-8 flex items-center justify-center">
                      <Image
                        src={activeGalleryItem?.src || product.thumbnailPath}
                        alt={activeGalleryItem?.alt || product.name}
                        width={600}
                        height={600}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  
                  {/* Gallery Controls */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Gallery Thumbnails */}
                {galleryItems.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {galleryItems.map((item, index) => (
                      <GalleryItem
                        key={index}
                        item={item}
                        isActive={index === activeGalleryIndex}
                        onClick={() => setActiveGalleryIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info - REST OF YOUR EXISTING CODE... */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Product Title */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-solar-electric rounded-full mr-3" />
                    <span className="text-solar-electric font-tech font-semibold tracking-wider uppercase text-sm">
                      {product.category === 'control-unit' ? 'Control Unit' : 
                       product.category === 'solar-panel' ? 'Solar System' : 'Accessory'}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-racing font-bold text-white mb-3">
                    {product.name}
                  </h1>
                  
                  <p className="text-xl text-solar-gold font-tech font-medium mb-4">
                    {product.tagline}
                  </p>
                  
                  <p className="text-white/80 font-tech text-lg leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* REST OF YOUR PRODUCT INFO CODE CONTINUES... */}
                {/* (Pricing, Features, etc. - samma som ni har nu) */}
                
                {/* Pricing & Availability */}
                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-racing font-bold text-white mb-1">
                        {product.price}
                      </div>
                      <div className="text-solar-electric font-tech text-sm">
                        {product.availability === 'available' ? 'Available Now' :
                         product.availability === 'pre-order' ? 'Pre-Order Available' : 'Coming Soon'}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-solar-gold mr-2" />
                      <span className="text-white font-tech">
                        {product.category === 'control-unit' ? 'BWSC 2025 Ready' : 'Racing Grade'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/contact">
                    <Button variant="primary" fullWidth>
                      Request Quote
                    </Button>
                    </Link>
                    <Link href="/contact">
                    <Button variant="outline" fullWidth>
                      Contact Engineer
                    </Button>
                    </Link>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h3 className="text-xl font-racing font-bold text-white">Key Features</h3>
                  <div className="space-y-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-10 h-10 bg-solar-gradient rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <div className="text-white">
                            {feature.icon === 'cpu' && <Cpu className="w-6 h-6" />}
                            {feature.icon === 'shield' && <Shield className="w-6 h-6" />}
                            {feature.icon === 'zap' && <Zap className="w-6 h-6" />}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-tech font-semibold mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-white/70 font-tech text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs - REST OF YOUR EXISTING CODE */}
        <section className="relative py-24">
          <div className="container mx-auto px-6">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'specs', label: 'Specifications' },
                  { key: 'downloads', label: 'Downloads' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'overview' | 'specs' | 'downloads')}
                    className={`px-6 py-3 rounded-md font-tech font-medium transition-all ${
                      activeTab === tab.key
                        ? 'bg-solar-electric text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                {activeTab === 'overview' && (
                  <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8">
                    <h2 className="text-2xl font-racing font-bold text-white mb-6">Product Overview</h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-white/90 font-tech text-lg leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8">
                    <h2 className="text-2xl font-racing font-bold text-white mb-6">Technical Specifications</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between items-center py-3 border-b border-white/10">
                          <span className="text-white/80 font-tech">{spec.label}</span>
                          <span className="text-white font-tech font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'downloads' && (
                  <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8">
                    <h2 className="text-2xl font-racing font-bold text-white mb-6">Downloads & Resources</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { name: 'Technical Specifications', size: '2.3 MB', format: 'PDF' },
                        { name: 'Installation Guide', size: '4.1 MB', format: 'PDF' },
                        { name: 'Software Package', size: '15.2 MB', format: 'ZIP' },
                        { name: '3D Model Files', size: '3.2 MB', format: 'GLB' }
                      ].map((download, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                          <div>
                            <h3 className="text-white font-tech font-semibold">{download.name}</h3>
                            <p className="text-white/60 text-sm font-tech">{download.format} • {download.size}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  )
}