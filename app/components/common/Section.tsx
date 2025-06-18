// Revised Section.tsx with simplified background approach
import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sectionVariants = cva(
  'w-full relative z-10',
  {
    variants: {
      background: {
        default: 'bg-white/5 backdrop-blur-sm',
        white: 'bg-white/10 backdrop-blur-sm',
        gray: 'bg-gray-100/10 backdrop-blur-sm',
        dark: 'bg-ensten-black/30 backdrop-blur-sm text-white',
        'ensten-black': 'bg-ensten-black/30 backdrop-blur-sm text-white',
        gradient: 'bg-gradient-to-b from-ensten-blue/30 to-ensten-black/30 backdrop-blur-sm text-white',
        transparent: 'bg-transparent',
      },
      spacing: {
        none: '',
        sm: 'py-8 md:py-12',
        md: 'py-12 md:py-20',
        lg: 'py-20 md:py-32',
        xl: 'py-32 md:py-48',
      },
      container: {
        none: '',
        sm: 'container mx-auto px-4 max-w-4xl',
        md: 'container mx-auto px-4 max-w-6xl',
        lg: 'container mx-auto px-4 max-w-7xl',
        full: 'container mx-auto px-4',
      },
      containerBackground: {
        default: 'bg-transparent',
        card: 'bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/10',
        white: 'bg-white/80 backdrop-blur-sm rounded-xl shadow-xl',
        dark: 'bg-ensten-black/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/5',
        none: '', // Added an explicit "none" option for complete transparency
      }
    },
    defaultVariants: {
      background: 'transparent', // Changed default to transparent
      spacing: 'md',
      container: 'md',
    },
  }
)

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  children?: ReactNode
  containerBackground?: 'default' | 'card' | 'white' | 'dark' | 'none'
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, background, spacing, container, containerBackground = 'default', children, ...props }, ref) => {
    // Simplified container classes logic
    const containerClasses = cn(
      sectionVariants({ container }),
      // Only apply background styling if explicitly requested with a non-default option
      containerBackground !== 'default' && containerBackground !== 'none' && 'p-8 my-8',
      containerBackground === 'card' && 'bg-white/10 backdrop-blur-sm rounded-xl shadow-xl border border-white/10',
      containerBackground === 'white' && 'bg-white/80 backdrop-blur-sm rounded-xl shadow-xl',
      containerBackground === 'dark' && 'bg-ensten-black/70 backdrop-blur-sm rounded-xl shadow-xl border border-white/5',
    );

    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ background, spacing }), className)}
        {...props}
      >
        {container !== 'none' ? (
          <div className={containerClasses}>
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    )
  }
)

Section.displayName = 'Section'