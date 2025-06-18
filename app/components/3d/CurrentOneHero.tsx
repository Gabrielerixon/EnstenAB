'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Simple auto-rotating model without hotspots
function CurrentOneSimple() {
  const gltf = useGLTF('/models/current-one/Current One.gltf')
  const modelRef = useRef<THREE.Group>(null)

  // Simple Y-axis rotation - keep it simple!
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01 // Re-enabled rotation
    }
  })

  return (
    <group ref={modelRef} position={[0, -1, 0]} castShadow receiveShadow>
      {/* Wrap in another group to control the pivot point */}
      <group position={[0, 0, 0]}>
        <primitive 
          object={gltf.scene} 
          scale={[20, 20, 20]} // Your perfect size!
          position={[1.2, 1, -1]} // Your original positioning
          castShadow
          receiveShadow
        />
      </group>
    </group>
  )
}

// Hero version - clean and simple
interface CurrentOneHeroProps {
  className?: string
}

export const CurrentOneHero = ({ className = '' }: CurrentOneHeroProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ 
          position: [6, 3, 8],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true }}
        shadows
        onPointerMove={() => {}} // Disable mouse interactions
        onPointerDown={() => {}} // Disable mouse interactions
      >
        {/* CLEAN WHITE STUDIO LIGHTING - No colored lights */}
        <ambientLight intensity={0.3} />
        
        {/* Circle of 6 white spotlights above the model */}
        <spotLight position={[0, 8, 4]} angle={0.3} penumbra={0.3} intensity={1.5} color="#ffffff" castShadow />
        <spotLight position={[3.5, 8, 2]} angle={0.3} penumbra={0.3} intensity={1.2} color="#ffffff" />
        <spotLight position={[3.5, 8, -2]} angle={0.3} penumbra={0.3} intensity={1.2} color="#ffffff" />
        <spotLight position={[0, 8, -4]} angle={0.3} penumbra={0.3} intensity={1.5} color="#ffffff" />
        <spotLight position={[-3.5, 8, -2]} angle={0.3} penumbra={0.3} intensity={1.2} color="#ffffff" />
        <spotLight position={[-3.5, 8, 2]} angle={0.3} penumbra={0.3} intensity={1.2} color="#ffffff" />
        
        {/* Key light from front for main highlight */}
        <directionalLight position={[2, 5, 5]} intensity={1} color="#ffffff" />
        
        {/* Invisible ground plane for shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>
        
        <Suspense fallback={null}>
          <CurrentOneSimple />
        </Suspense>
        
        {/* No OrbitControls - just a static showcase */}
      </Canvas>
    </div>
  )
}

// Preload for faster loading
useGLTF.preload('/models/current-one/Current One.gltf')