// lib/products-data.ts
import { Product } from '@/lib/types'

export const productsData: Product[] = [
  {
    id: 'current-one',
    name: 'Current One',
    tagline: 'The Ultimate Solar Racing Control Unit',
    description: 'Professional-grade control unit designed specifically for solar racing vehicles competing in the Bridgestone World Solar Challenge. Features advanced real-time processing, military-grade protection, and seamless CAN bus integration.',
    shortDescription: 'Professional-grade control unit for championship solar racing performance.',
    modelPath: '/models/current-one/Current One.gltf',
    thumbnailPath: '/images/products/current-one/currentOne.png',
    features: [
      {
        id: 'processing',
        title: '1000Hz Processing',
        description: 'Lightning-fast data processing for real-time race decisions',
        icon: 'cpu'
      },
      {
        id: 'protection',
        title: 'IP67 Protection',
        description: 'Military-grade protection against dust and water',
        icon: 'shield'
      },
      {
        id: 'integration',
        title: 'CAN Bus Integration',
        description: 'Seamless integration with all vehicle systems',
        icon: 'zap'
      }
    ],
    specifications: [
      { label: 'Operating Voltage', value: '12-48V DC' },
      { label: 'Processing Speed', value: '1000Hz' },
      { label: 'Communication', value: 'CAN Bus, UART, SPI' },
      { label: 'Protection Rating', value: 'IP67' },
      { label: 'Operating Temperature', value: '-20°C to +85°C' },
      { label: 'Dimensions', value: '120 x 80 x 40mm' },
      { label: 'Weight', value: '450g' },
      { label: 'Certification', value: 'BWSC 2025 Approved' }
    ],
    images: [
      {
        src: '/images/products/current-one/currentOne.png',
        alt: 'Current One Control Unit',
        caption: 'Current One - Main Unit'
      }
    ],
    highlights: [
      'BWSC 2025 Approved',
      'Used by Championship Teams',
      'Swedish Engineering Excellence',
      'Professional Support Included'
    ],
    category: 'control-unit',
    price: 'Contact for Pricing',
    availability: 'pre-order',
    models3D: [
      {
        path: '/models/current-one/Current One.gltf',
        name: 'Control Unit',
        description: 'Main control unit housing'
      },
      {
        path: '/models/current-one/Ratten.gltf', 
        name: 'Steering Wheel Interface',
        description: 'Driver control interface'
      }
    ]
  },
  {
    id: 'solar-module',
    name: 'Solar Module',
    tagline: 'High-Efficiency Solar Panel System',
    description: 'Advanced solar panel system designed for maximum energy harvesting in racing conditions. Features industry-leading efficiency and lightweight construction optimized for competitive solar vehicles.',
    shortDescription: 'High-efficiency solar panel system for optimal energy harvesting.',
    modelPath: '/models/current-one/solpanel.gltf',
    thumbnailPath: '/images/products/solar-panel/Solpanel/solarmodule.jpg',
    features: [
      {
        id: 'efficiency',
        title: 'High Efficiency',
        description: 'Industry-leading solar cell efficiency for maximum power output',
        icon: 'zap'
      },
      {
        id: 'lightweight',
        title: 'Lightweight Design',
        description: 'Optimized for minimal weight impact on vehicle performance',
        icon: 'cpu'
      },
      {
        id: 'durability',
        title: 'Racing Durability',
        description: 'Built to withstand harsh racing conditions',
        icon: 'shield'
      }
    ],
    specifications: [
      { label: 'Cell Efficiency', value: '22.5%' },
      { label: 'Maximum Power', value: '1200W' },
      { label: 'Operating Voltage', value: '40-60V DC' },
      { label: 'Weight per Panel', value: '2.8kg' },
      { label: 'Temperature Coefficient', value: '-0.35%/°C' },
      { label: 'Dimensions', value: '1650 x 670 x 35mm' }
    ],
    images: [
      {
        src: '/images/products/solar-panel/Solpanel/ELCD_qualitycontrol.JPG',
        alt: 'Solar Module - Front View',
        caption: 'Solar Module - Front View'
      },
      {
        src: '/images/products/solar-panel/Solpanel/solarmodule_bending.jpg', 
        alt: 'Solar Module - Installation',
        caption: 'Solar Module - Installation View'
      },
      {
        src: '/images/products/solar-panel/Solpanel/solarmodule.jpg',
        alt: 'Solar Module - Detail',
        caption: 'Solar Module - Connection Detail'
      }
    ],
    highlights: [
      'Industry-Leading Efficiency',
      'Racing-Optimized Design',
      'Lightweight Construction',
      'Professional Installation Support'
    ],
    category: 'solar-panel',
    price: 'Contact for Pricing',
    availability: 'available',
    models3D: [
      {
        path: '/models/current-one/solpanel.gltf',
        name: 'Solar Panel',
        description: 'Complete solar panel assembly'
      }
    ]
  },
  {
    id: 'cansuba',
    name: 'Cansuba Converter',
    tagline: 'Advanced CAN Bus Communication System',
    description: 'Sophisticated CAN bus converter system designed for seamless communication between vehicle subsystems. Enables reliable data exchange and system integration for solar racing vehicles.',
    shortDescription: 'Advanced CAN bus converter for seamless system communication.',
    modelPath: '',
    thumbnailPath: '/images/products/cansuba/cansuba.png',
    features: [
      {
        id: 'communication',
        title: 'Multi-Protocol Support',
        description: 'Supports multiple communication protocols for maximum compatibility',
        icon: 'zap'
      },
      {
        id: 'reliability',
        title: 'High Reliability',
        description: 'Robust communication with error detection and correction',
        icon: 'shield'
      },
      {
        id: 'integration',
        title: 'Easy Integration',
        description: 'Plug-and-play setup with existing vehicle systems',
        icon: 'cpu'
      }
    ],
    specifications: [
      { label: 'Protocol Support', value: 'CAN 2.0A/B, CAN-FD' },
      { label: 'Baud Rate', value: '125kbps - 1Mbps' },
      { label: 'Operating Voltage', value: '12-24V DC' },
      { label: 'Operating Temperature', value: '-40°C to +85°C' },
      { label: 'Dimensions', value: '85 x 55 x 25mm' },
      { label: 'Weight', value: '120g' }
    ],
    images: [
      {
        src: '/images/products/cansuba/cansuba.png',
        alt: 'Cansuba Converter',
        caption: 'Cansuba Converter - Main Unit'
      }
    ],
    highlights: [
      'Multi-Protocol Support',
      'Robust Communication',
      'Easy Integration',
      'Compact Design'
    ],
    category: 'accessory',
    price: 'Contact for Pricing', 
    availability: 'available',
    models3D: []
  }
]

export const getProductById = (id: string): Product | undefined => {
  return productsData.find(product => product.id === id)
}