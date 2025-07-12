// lib/products-data.ts
import { Product } from '@/lib/types'

export const productsData: Product[] = [
  {
    id: 'current-one',
    name: 'Current One',
    tagline: 'The Ultimate Solar Racing Control Unit',
    description: 'Professional-grade control unit designed specifically for solar racing vehicles competing in the Bridgestone World Solar Challenge. Features advanced real-time processing and seamless CAN bus integration.',
    shortDescription: 'Professional-grade control unit for championship solar racing performance.',
    modelPath: '/models/current-one/Current One.glb',
    thumbnailPath: '/images/products/current-one/currentOne.png',
    features: [
      {
        id: 'processing',
        title: 'Real-time Data Logging',
        description: 'Continuous data capture for race analysis and optimization',
        icon: 'cpu'
      },
      {
        id: 'lightweight',
        title: 'Lightweight Design',
        description: 'Under 1.5kg including steering wheel for minimal weight impact',
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
      { label: 'Power Consumption', value: '<4W' },
      { label: 'Weight (with steering wheel)', value: '<1.5kg' },
      { label: 'System Voltage', value: '12V' },
      { label: 'Input Voltage Range', value: '40-160V' },
      { label: 'Dimensions', value: '275 x 183 x 56mm' },
      { label: 'Communication', value: 'CAN Bus, UART' },
      { label: 'Data Logging', value: 'Real-time' }
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
        path: '/models/current-one/Current One.glb',
        name: 'Control Unit',
        description: 'Main control unit housing'
      },
      {
        path: '/models/current-one/Ratten.glb', 
        name: 'Steering Wheel Interface',
        description: 'Driver control interface'
      }
    ]
  },
  {
    id: 'solar-module',
    name: 'Custom Solar Modules',
    tagline: 'High-Efficiency Solar Panel System',
    description: 'Custom-designed solar modules featuring Maxeon Gen7 cells for maximum energy harvesting in racing conditions. Optimized thickness and weight for competitive solar vehicles.',
    shortDescription: 'Custom solar modules with Maxeon Gen7 cells for optimal energy harvesting.',
    modelPath: '/models/current-one/solpanel.glb',
    thumbnailPath: '/images/products/solar-panel/Solpanel/solarmodule.jpg',
    features: [
      {
        id: 'efficiency',
        title: 'High Efficiency',
        description: 'Maxeon Gen7 cells delivering approximately 26% efficiency',
        icon: 'zap'
      },
      {
        id: 'lightweight',
        title: 'Ultra-Thin Design',
        description: 'Only 0.8mm thickness for minimal weight and aerodynamic impact',
        icon: 'cpu'
      },
      {
        id: 'custom',
        title: 'Custom Configuration',
        description: 'Tailored dimensions up to 4x7 Maxeon cells per module',
        icon: 'shield'
      }
    ],
    specifications: [
      { label: 'Cell Type', value: 'Maxeon Gen7 (or other cells on request)' },
      { label: 'Efficiency', value: '~26%' },
      { label: 'Maximum Dimensions', value: '4x7 Maxeon cells (550 x 900mm)' },
      { label: 'Thickness', value: '0.8mm' },
      { label: 'Weight', value: '~1kg/m²' },
      { label: 'Configuration', value: 'Custom design available' }
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
      'Maxeon Gen7 Technology',
      'Custom Design Available',
      'Ultra-Lightweight Construction',
      'Professional Installation Support'
    ],
    category: 'solar-panel',
    price: 'Contact for Pricing',
    availability: 'available',
    models3D: [
      {
        path: '/models/current-one/solpanel.glb',
        name: 'Solar Panel',
        description: 'Complete solar panel assembly'
      }
    ]
  },
  {
    id: 'cansuba',
    name: 'Cansuba Converter',
    tagline: 'Mitsuba Analogue Converter',
    description: 'Specialized converter designed to enable analogue Mitsuba motor controllers to communicate over CAN bus. Essential interface for modern solar racing vehicle integration.',
    shortDescription: 'Mitsuba analogue converter for seamless CAN bus communication.',
    modelPath: '/models/current-one/Cansuba.glb',
    thumbnailPath: '/images/products/cansuba/cansuba.png',
    features: [
      {
        id: 'communication',
        title: 'Mitsuba Analogue Converter',
        description: 'Enables analogue Mitsuba motor controllers to communicate over CAN',
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
        description: 'Plug-and-play setup with existing Mitsuba systems',
        icon: 'cpu'
      }
    ],
    specifications: [
      { label: 'Voltage', value: '12V' },
      { label: 'Dimensions', value: '129 x 67 x 28mm' },
      { label: 'Protocol Support', value: 'Mitsuba Analogue to CAN' },
      { label: 'Compatibility', value: 'Mitsuba Motor Controllers' },
    ],
    images: [
      {
        src: '/images/products/cansuba/cansuba.png',
        alt: 'Cansuba Converter',
        caption: 'Cansuba Converter - Main Unit'
      }
    ],
    highlights: [
      'Mitsuba Motor Controller Compatible',
      'Robust CAN Communication',
      'Easy Integration',
      'Compact Design'
    ],
    category: 'accessory',
    price: 'Contact for Pricing', 
    availability: 'available',
    models3D: [
      {
        path: '/models/current-one/Cansuba.glb',
        name: 'Cansuba Converter',
        description: 'Complete CAN bus converter unit'
      }
    ]
  }
]

export const getProductById = (id: string): Product | undefined => {
  return productsData.find(product => product.id === id)
}