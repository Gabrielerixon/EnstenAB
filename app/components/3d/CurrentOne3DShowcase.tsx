// app/components/3d/CurrentOne3DShowcase.tsx
// Replace ONLY the main container div, keep everything else the same

'use client'

import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// Keep ALL your existing model components exactly the same
function CurrentOneModels({ onActiveComponentChange }: { onActiveComponentChange: (component: 'steering' | 'control' | 'both') => void }) {
  const groupRef = useRef<THREE.Group>(null!)
  
  const controlUnit = useGLTF('/models/current-one/Current One.gltf')
  const steeringWheel = useGLTF('/models/current-one/Ratten.gltf')
  
  // Keep your EXACT original rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
      
      const rotationCycle = (state.clock.elapsedTime * 0.15) % (Math.PI * 2)
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
  })

  return (
    <>
      {/* Keep your exact original circle */}
      <mesh position={[0.5, -0.5, -4.8]}>
        <circleGeometry args={[6, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.15}
        />
      </mesh>

      {/* Keep your exact original group */}
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
          <cylinderGeometry args={[0.03, 0.03, 1.6]} />
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

// Keep your exact loading component
function ModelLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-solar-electric/20 border-t-solar-electric rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-xs font-tech">Loading...</span>
        </div>
      </div>
    </div>
  )
}

useGLTF.preload('/models/current-one/Current One.gltf')
useGLTF.preload('/models/current-one/Ratten.gltf')

// --- MODIFICATION START ---
// ONLY change the main component - add size constraints
export const CurrentOne3DShowcase = () => {
  const [isClient, setIsClient] = useState(false)
  const [activeComponent, setActiveComponent] = useState<'steering' | 'control' | 'both'>('both')

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleActiveComponentChange = useCallback((component: 'steering' | 'control' | 'both') => {
    setActiveComponent(component)
  }, [])

  // Unified container classes to prevent layout shift between loader and canvas
  const containerClasses = "relative w-full max-w-xl mx-auto aspect-square";

  if (!isClient) {
    return (
      // Use the same container classes for the loader to reserve the exact space
      <div className={`${containerClasses} flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20`}>
        <ModelLoader />
      </div>
    )
  }

  return (
    // This is the new main container div. It's self-sizing and responsive.
    <div className={containerClasses}>
      {/* Canvas now fills the responsive parent */}
      <Canvas
        camera={{ 
          position: [0, 1, 8], 
          fov: 60,
          near: 0.1,
          far: 100
        }}
        dpr={[1, 1.5]} 
        performance={{ min: 0.8 }} 
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Keep your EXACT same lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5}
          castShadow={false}
        />
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
        <directionalLight 
          position={[0, 5, 10]} 
          intensity={1.0}
          color="#ffffff"
        />
        
        <Suspense fallback={null}>
          <CurrentOneModels onActiveComponentChange={handleActiveComponentChange} />
        </Suspense>
      </Canvas>

      {/* Keep ALL your exact same overlay components */}
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

        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-solar-electric opacity-60" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-solar-electric opacity-60" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-solar-electric opacity-60" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-solar-electric opacity-60" />

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
      </div>
    </div>
  )
}
// --- MODIFICATION END ---