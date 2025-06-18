'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

// Define hotspot type
interface Hotspot {
  id: string
  position: [number, number, number]
  title: string
  description: string
}

// Hotspot data based on your images
const HOTSPOTS: Hotspot[] = [
  {
    id: 'encoder-wheels',
    position: [0, 0.5, 0.8],
    title: 'Encoder Wheels',
    description: 'High-precision rotary encoders for steering input'
  },
  {
    id: 'pot',
    position: [0.6, 0, 0],
    title: 'Potentiometer',
    description: 'Analog input for precise control adjustments'
  },
  {
    id: 'cable-fastening',
    position: [0, -0.5, -0.8],
    title: 'Cable Fastening',
    description: 'Secure cable management and connection points'
  }
]

// Individual model component
function CurrentOneModel({ onHotspotClick }: { onHotspotClick: (hotspot: Hotspot) => void }) {
  const gltf = useGLTF('/models/current-one/Current One.gltf')
  const modelRef = useRef<THREE.Group>(null)

  // Auto-rotate the model
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={modelRef}>
      <primitive object={gltf.scene} scale={[2, 2, 2]} position={[0, 0, 0]} />
      
      {/* Hotspots */}
      {HOTSPOTS.map((hotspot) => (
        <group key={hotspot.id} position={hotspot.position}>
          <mesh
            onClick={() => onHotspotClick(hotspot)}
            onPointerOver={(e) => {
              e.stopPropagation()
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto'
            }}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial 
              color="#FF6B35" 
              transparent 
              opacity={0.8}
            />
          </mesh>
          
          {/* Pulsing ring effect */}
          <mesh>
            <ringGeometry args={[0.1, 0.15, 16]} />
            <meshBasicMaterial 
              color="#FF6B35" 
              transparent 
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <span className="ml-2 text-white">Loading 3D Model...</span>
      </div>
    </Html>
  )
}

// Main component
interface CurrentOne3DProps {
  className?: string
  autoRotate?: boolean
  showHotspots?: boolean
  onHotspotClick?: (hotspot: Hotspot) => void
}

export const CurrentOne3D = ({ 
  className = '', 
  autoRotate = true,
  showHotspots = true,
  onHotspotClick = () => {}
}: CurrentOne3DProps) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot)
    onHotspotClick(hotspot)
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ 
          position: [3, 2, 5], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        
        <Suspense fallback={<LoadingFallback />}>
          {showHotspots ? (
            <CurrentOneModel onHotspotClick={handleHotspotClick} />
          ) : (
            <primitive 
              object={useGLTF('/models/current-one/Current One.gltf').scene} 
              scale={[2, 2, 2]} 
            />
          )}
        </Suspense>
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          maxDistance={10}
          minDistance={2}
        />
      </Canvas>
      
      {/* Hotspot info panel */}
      {selectedHotspot && (
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg max-w-sm">
          <h3 className="font-bold text-lg">{selectedHotspot.title}</h3>
          <p className="text-sm text-gray-300">{selectedHotspot.description}</p>
          <button 
            onClick={() => setSelectedHotspot(null)}
            className="mt-2 text-xs text-ensten-orange hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

// Preload the model
useGLTF.preload('/models/current-one/Current One.gltf')