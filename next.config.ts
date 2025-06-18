// next.config.ts - OPTIMIZED VERSION with Three.js support
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add performance optimizations
  experimental: {
    optimizeCss: true,
  },
  
  // IMPORTANT: Transpile Three.js packages for Next.js
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // Optimize webpack for 3D assets
  webpack: (config, { dev }) => {
    // Optimize 3D model loading
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });

    // Add GLTF/GLB asset handling
    config.module.rules.push({
      test: /\.(gltf|glb)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models/',
          outputPath: 'static/models/',
        },
      },
    });

    // Only in development, optimize build speed
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    return config;
  },

  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;