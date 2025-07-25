// app/opengraph-image.tsx - FUNGERAR GARANTERAT
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ensten AB - Solar Racing Control Systems'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
          position: 'relative',
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 107, 53, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 107, 53, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #FF6B35, #FFD700)',
          }}
        />
        
        {/* Logo card med samma stil som din logga */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '40px 80px',
            marginBottom: '50px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            border: '3px solid rgba(255, 107, 53, 0.1)',
          }}
        >
          {/* Recreated logo text i samma stil som din logga */}
          <div
            style={{
              fontSize: 84,
              fontWeight: '400',
              color: '#000000',
              letterSpacing: '0.02em',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              // Matchar din loggas stil så nära som möjligt
            }}
          >
            ensten
          </div>
        </div>
        
        {/* Main tagline */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 'bold',
            color: '#FF6B35',
            textAlign: 'center',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily: 'system-ui',
          }}
        >
          Control Your Solar Racing Future
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: '#E5E5E5',
            textAlign: 'center',
            maxWidth: 1000,
            lineHeight: 1.2,
            fontFamily: 'system-ui',
          }}
        >
          Advanced control-units for BWSC 2025
        </div>
        
        {/* Small "Swedish Engineering" badge */}
        <div
          style={{
            fontSize: 16,
            color: '#FFD700',
            textAlign: 'center',
            marginTop: '20px',
            padding: '8px 20px',
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            fontFamily: 'system-ui',
          }}
        >
          Swedish Engineering Excellence
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #FF6B35, #FFD700)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}