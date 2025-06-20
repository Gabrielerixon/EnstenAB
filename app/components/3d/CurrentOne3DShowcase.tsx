// app/components/3d/CurrentOne3DShowcase.tsx
'use client'

import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// MOBILE PERFORMANCE: Detect device capabilities
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

// OPTIMIZED: Simplified model component for better performance
function CurrentOneModels({ 
  onActiveComponentChange, 
  isLowEnd 
}: { 
  onActiveComponentChange: (component: 'steering' | 'control' | 'both') => void
  isLowEnd: boolean 
}) {
  const groupRef = useRef<THREE.Group>(null!)
  
  const controlUnit = useGLTF('/models/current-one/Current One.gltf')
  const steeringWheel = useGLTF('/models/current-one/Ratten.gltf')
  
  // PERFORMANCE: Reduce animation frequency on low-end devices
  const rotationSpeed = isLowEnd ? 0.05 : 0.15
  
  useFrame((state) => {
    if (groupRef.current) {
      // OPTIMIZED: Less frequent rotation updates on low-end devices
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
      
      // PERFORMANCE: Skip component detection on low-end devices
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
      {/* SIMPLIFIED: Smaller circle on mobile */}
      <mesh position={[0.5, -0.5, -4.8]}>
        <circleGeometry args={[isLowEnd ? 4 : 6, isLowEnd ? 32 : 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.15}
        />
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
        
        {/* SIMPLIFIED: Thinner connection line on low-end devices */}
        <mesh position={[0, 0, -3]}>
          <cylinderGeometry args={[isLowEnd ? 0.02 : 0.03, isLowEnd ? 0.02 : 0.03, 1.6]} />
          <meshBasicMaterial 
            color="#00D4FF" 
            transparent 
            opacity={0.4}
          />
        </mesh>
      </group>
    </>
  )
}

// OPTIMIZED: Enhanced loading component
function ModelLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-xs font-tech">Loading 3D...</span>
        </div>
      </div>
    </div>
  )
}

// PERFORMANCE: Mobile fallback component
function MobileFallback() {
  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
      <div className="text-center">
        <div className="w-32 h-32 bg-solar-gradient rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <span className="text-white font-racing font-bold text-2xl">C1</span>
        </div>
        <h3 className="text-white font-racing font-bold text-lg mb-2">Current One</h3>
        <p className="text-white/70 font-tech text-sm max-w-xs">
          Interactive 3D model optimized for desktop viewing
        </p>
      </div>
    </div>
  )
}

// Preload models
useGLTF.preload('/models/current-one/Current One.gltf')
useGLTF.preload('/models/current-one/Ratten.gltf')

// MAIN COMPONENT: Performance-aware
export const CurrentOne3DShowcase = () => {
  const [isClient, setIsClient] = useState(false)
  const [activeComponent, setActiveComponent] = useState<'steering' | 'control' | 'both'>('both')
  const [showFallback, setShowFallback] = useState(false)
  const capabilities = useDeviceCapabilities()

  useEffect(() => {
    setIsClient(true)
    
    // PERFORMANCE: Show fallback on very low-end devices
    if (capabilities.isMobile && capabilities.isLowEnd) {
      setShowFallback(true)
    }
  }, [capabilities])

  const handleActiveComponentChange = useCallback((component: 'steering' | 'control' | 'both') => {
    setActiveComponent(component)
  }, [])

  // Unified container classes
  const containerClasses = "relative w-full max-w-xl mx-auto aspect-square"

  if (!isClient) {
    return (
      <div className={`${containerClasses} flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20`}>
        <ModelLoader />
      </div>
    )
  }

  // PERFORMANCE: Show static fallback on very low-end mobile devices
  if (showFallback) {
    return <MobileFallback />
  }

  return (
    <div className={containerClasses}>
      <Canvas
        camera={{ 
          position: [0, 1, 8], 
          fov: 60,
          near: 0.1,
          far: 100
        }}
        // PERFORMANCE: Optimized settings for mobile
        dpr={capabilities.isMobile ? [1, 1.2] : [1, 1.5]} 
        performance={{ min: capabilities.isLowEnd ? 0.5 : 0.8 }} 
        gl={{ 
          antialias: !capabilities.isLowEnd, // Disable antialiasing on low-end
          alpha: true,
          powerPreference: capabilities.isMobile ? "default" : "high-performance"
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* OPTIMIZED: Reduced lighting on mobile */}
        <ambientLight intensity={capabilities.isLowEnd ? 0.6 : 0.8} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={capabilities.isLowEnd ? 1.0 : 1.5}
          castShadow={false} // Shadows disabled for performance
        />
        
        {/* PERFORMANCE: Fewer lights on low-end devices */}
        {!capabilities.isLowEnd && (
          <>
            <pointLight 
              position={[-5, 5, 5]} 
              intensity={1.0} 
              color="#00D4FF"
            />
            <pointLight 
              position={[5, -3, 3]} 
              intensity={0.8} 
              color="#FFB800"
            />
            <directionalLight 
              position={[0, 0, -10]} 
              intensity={0.8}
              color="#ffffff"
            />
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

      {/* UI Overlays - Simplified on mobile */}
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

        {/* PERFORMANCE: Skip component labels on low-end devices */}
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

        {/* PERFORMANCE: Skip scan line animation on low-end devices */}
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
  )
}