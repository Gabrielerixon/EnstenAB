// app/components/3d/LazyCurrentOne3DShowcase.tsx
'use client'

import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Box, Loader } from 'lucide-react'
import Image from 'next/image'
import * as THREE from 'three'

// Device capabilities hook (same as before)
function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    isLowEnd: false,
    reducedAnimations: false
  })

  useEffect(() => {
    const checkCapabilities = () => {
      const isMobile = window.innerWidth < 768
      const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true
      const reducedAnimations = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      setCapabilities({ isMobile, isLowEnd, reducedAnimations })
    }

    checkCapabilities()
    window.addEventListener('resize', checkCapabilities)
    return () => window.removeEventListener('resize', checkCapabilities)
  }, [])

  return capabilities
}

// 3D Models Component (same as before but only loads when triggered)
function CurrentOneModels({ 
  onActiveComponentChange, 
  isLowEnd 
}: { 
  onActiveComponentChange: (component: 'steering' | 'control' | 'both') => void
  isLowEnd: boolean 
}) {
  const groupRef = useRef<THREE.Group>(null!)
  
  const controlUnit = useGLTF('/models/current-one/Current One.glb')
  const steeringWheel = useGLTF('/models/current-one/Ratten.glb')
  
  const rotationSpeed = isLowEnd ? 0.05 : 0.15
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
      
      if (!isLowEnd) {
        const rotationCycle = (state.clock.elapsedTime * rotationSpeed) % (Math.PI * 2)
        let newActiveComponent: 'steering' | 'control' | 'both'
        
        if (rotationCycle < Math.PI * 0.6) {
          newActiveComponent = 'steering'
        } else if (rotationCycle < Math.PI * 1.4) {
          newActiveComponent = 'control'
        } else {
          newActiveComponent = 'both'
        }
        
        onActiveComponentChange(newActiveComponent)
      }
    }
  })

  return (
    <>
      <mesh position={[0.5, -0.5, -4.8]}>
        <circleGeometry args={[isLowEnd ? 4 : 6, isLowEnd ? 32 : 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      <group ref={groupRef} position={[0.5, -0.5, -2]}>
        <primitive 
          object={steeringWheel.scene.clone()} 
          position={[-0.8, 0.1, -0]}
          scale={[33.75, 33.75, 33.75]}
          rotation={[0, Math.PI * 1.5, 0]}
        />
        
        <primitive 
          object={controlUnit.scene.clone()} 
          position={[0.8, -0.1, -4]}
          scale={[20, 20, 20]}
          rotation={[0, Math.PI * 0.5, 0]}
        />
        
        <mesh position={[0, 0, -3]}>
          <cylinderGeometry args={[isLowEnd ? 0.02 : 0.03, isLowEnd ? 0.02 : 0.03, 1.6]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} />
        </mesh>
      </group>
    </>
  )
}

// Static Preview Component
function StaticPreview({ onLoad3D }: { onLoad3D: () => void }) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
      {/* Static image background */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <Image 
            src="/images/current-one-3d-preview.png"
            alt="Current One 3D Model Preview"
            fill
            className="object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-racing text-lg mb-1">Current One System</h3>
            <p className="font-tech text-sm opacity-80">Click to interact</p>
        </div>
      </div>

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLoad3D}
          className="bg-solar-electric/90 backdrop-blur-sm rounded-full p-6 shadow-2xl border-2 border-white/20 hover:bg-solar-electric transition-all duration-300"
        >
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </motion.button>
      </div>

      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="text-white text-sm font-tech">
          Click to load 3D model
        </div>
      </div>

      {/* Performance badge */}
      <div className="absolute top-4 right-4 bg-green-600/80 backdrop-blur-sm rounded-lg px-2 py-1">
        <span className="text-white text-xs font-tech">Fast Load</span>
      </div>
    </div>
  )
}

// Loading component
function Model3DLoader() {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="text-center">
        <Loader className="w-12 h-12 text-solar-electric animate-spin mx-auto mb-4" />
        <div className="text-white font-tech">Loading 3D Model...</div>
        <div className="text-white/60 text-sm font-tech mt-1">Optimized GLB • 2MB</div>
      </div>
    </div>
  )
}

// Main component with lazy loading
export const LazyCurrentOne3DShowcase = () => {
  const [isClient, setIsClient] = useState(false)
  const [load3D, setLoad3D] = useState(false)
  const [is3DLoaded, setIs3DLoaded] = useState(false)
  const [activeComponent, setActiveComponent] = useState<'steering' | 'control' | 'both'>('both')
  const capabilities = useDeviceCapabilities()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Intersection observer for auto-loading when scrolled into view (optional)
  useEffect(() => {
    if (!load3D && capabilities.isMobile === false) { // Only auto-load on desktop
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Auto-load after 2 seconds of being in view (optional)
            setTimeout(() => setLoad3D(true), 2000)
            observer.disconnect()
          }
        },
        { threshold: 0.5 }
      )
      
      if (containerRef.current) {
        observer.observe(containerRef.current)
      }
      
      return () => observer.disconnect()
    }
  }, [load3D, capabilities.isMobile])

  const handleLoad3D = useCallback(() => {
    setLoad3D(true)
  }, [])

  const handleActiveComponentChange = useCallback((component: 'steering' | 'control' | 'both') => {
    setActiveComponent(component)
  }, [])

  const containerClasses = "relative w-full max-w-xl mx-auto aspect-square"

  if (!isClient) {
    return (
      <div className={containerClasses}>
        <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
          <div className="text-white font-tech">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={containerClasses} ref={containerRef}>
      {!load3D ? (
        // Show static preview until user clicks
        <StaticPreview onLoad3D={handleLoad3D} />
      ) : (
        // Load 3D model
        <div className="relative w-full h-full">
          {!is3DLoaded && <Model3DLoader />}
          
          <Canvas
            camera={{ 
              position: [0, 1, 8], 
              fov: 60,
              near: 0.1,
              far: 100
            }}
            dpr={capabilities.isMobile ? [1, 1.2] : [1, 1.5]} 
            performance={{ min: capabilities.isLowEnd ? 0.5 : 0.8 }} 
            gl={{ 
              antialias: !capabilities.isLowEnd,
              alpha: true,
              powerPreference: capabilities.isMobile ? "default" : "high-performance"
            }}
            style={{ width: '100%', height: '100%' }}
            onCreated={() => setIs3DLoaded(true)}
          >
            <ambientLight intensity={capabilities.isLowEnd ? 0.6 : 0.8} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={capabilities.isLowEnd ? 1.0 : 1.5}
              castShadow={false}
            />
            
            {!capabilities.isLowEnd && (
              <>
                <pointLight position={[-5, 5, 5]} intensity={1.0} color="#00D4FF" />
                <pointLight position={[5, -3, 3]} intensity={0.8} color="#FFB800" />
                <directionalLight position={[0, 0, -10]} intensity={0.8} color="#ffffff" />
              </>
            )}
            
            <directionalLight 
              position={[0, 5, 10]} 
              intensity={capabilities.isLowEnd ? 0.8 : 1.0}
              color="#ffffff"
            />
            
            <Suspense fallback={null}>
              <CurrentOneModels 
                onActiveComponentChange={handleActiveComponentChange} 
                isLowEnd={capabilities.isLowEnd}
              />
            </Suspense>
          </Canvas>

          {/* UI Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute top-4 left-4 bg-solar-carbon/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-solar-electric/30"
            >
              <div className="text-solar-electric text-xs font-tech font-semibold tracking-wider">
                COMPLETE SYSTEM
              </div>
              <div className="text-white/80 text-xs font-tech">
                Current One
              </div>
            </motion.div>

            {!capabilities.isLowEnd && (
              <AnimatePresence mode="wait">
                {activeComponent === 'steering' && (
                  <motion.div
                    key="steering"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-20 left-8 bg-solar-electric/95 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20"
                  >
                    <div className="text-white text-sm font-racing font-bold">
                      STEERING WHEEL
                    </div>
                    <div className="text-white/90 text-xs font-tech">
                      Driver Interface
                    </div>
                  </motion.div>
                )}
                
                {activeComponent === 'control' && (
                  <motion.div
                    key="control"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-20 right-8 bg-solar-racing/90 backdrop-blur-sm rounded-lg px-4 py-2"
                  >
                    <div className="text-white text-sm font-racing font-bold">
                      CONTROL UNIT
                    </div>
                    <div className="text-white/80 text-xs font-tech">
                      Core Processing
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Corner frames */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-solar-electric opacity-60" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-solar-electric opacity-60" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-solar-electric opacity-60" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-solar-electric opacity-60" />

            {!capabilities.isLowEnd && !capabilities.reducedAnimations && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-solar-electric/10 to-transparent h-8 pointer-events-none"
                animate={{ y: [-50, 300] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatDelay: 2
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Don't preload models anymore - load them only when needed
// useGLTF.preload('/models/current-one/Current One.glb') // REMOVED
// useGLTF.preload('/models/current-one/Ratten.glb') // REMOVED