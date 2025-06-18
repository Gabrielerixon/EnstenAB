import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center font-tech font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group',
  {
    variants: {
      variant: {
        primary: 'bg-solar-gradient text-white shadow-electric hover:shadow-2xl hover:scale-105 focus-visible:ring-solar-electric border border-transparent',
        secondary: 'bg-solar-carbon text-white border border-solar-electric hover:bg-solar-electric hover:shadow-electric focus-visible:ring-solar-electric',
        outline: 'border-2 border-solar-electric text-solar-electric hover:bg-solar-electric hover:text-white hover:shadow-electric focus-visible:ring-solar-electric',
        outlineGold: 'border-2 border-solar-gold text-solar-gold hover:bg-solar-gold hover:text-solar-carbon hover:shadow-solar focus-visible:ring-solar-gold',
        ghost: 'text-white hover:bg-white/10 hover:text-solar-electric focus-visible:ring-white/50',
        racing: 'bg-solar-racing text-white hover:bg-red-600 hover:shadow-racing hover:scale-105 focus-visible:ring-solar-racing',
        glass: 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/40 focus-visible:ring-white/50',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-md',
        md: 'h-11 px-6 py-3 text-base rounded-lg',
        lg: 'h-14 px-8 py-4 text-lg rounded-xl',
        xl: 'h-16 px-10 py-5 text-xl rounded-2xl',
        icon: 'h-11 w-11 rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      animated: {
        true: '',
        false: '',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      animated: false,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  energyEffect?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    animated,
    loading = false,
    icon,
    iconPosition = 'left',
    energyEffect = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, animated }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {/* Energy flow effect for primary buttons */}
        {(variant === 'primary' || energyEffect) && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        )}

        {/* Button content */}
        <div className="relative flex items-center justify-center">
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span>Loading...</span>
            </div>
          ) : (
            <>
              {icon && iconPosition === 'left' && (
                <span className="mr-2 group-hover:scale-110 transition-transform">
                  {icon}
                </span>
              )}
              
              {children && (
                <span className="relative">
                  {children}
                </span>
              )}
              
              {icon && iconPosition === 'right' && (
                <span className="ml-2 group-hover:scale-110 transition-transform">
                  {icon}
                </span>
              )}
            </>
          )}
        </div>

        {/* Racing stripes for racing variant */}
        {variant === 'racing' && (
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12" />
          </div>
        )}

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {variant === 'primary' && (
            <div className="absolute inset-0 bg-solar-electric/20 rounded-inherit blur-xl" />
          )}
          {variant === 'outline' && (
            <div className="absolute inset-0 bg-solar-electric/10 rounded-inherit blur-lg" />
          )}
          {variant === 'racing' && (
            <div className="absolute inset-0 bg-solar-racing/20 rounded-inherit blur-xl" />
          )}
        </div>
      </button>
    )
  }
)

Button.displayName = 'Button'

// Specialized button components for common use cases
export const CTAButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="primary"
      size="lg"
      energyEffect
      className="font-racing uppercase tracking-wider"
      {...props}
    >
      {children}
    </Button>
  )
)

CTAButton.displayName = 'CTAButton'

export const TechButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="glass"
      className="font-racing"
      {...props}
    >
      {children}
    </Button>
  )
)

TechButton.displayName = 'TechButton'

export const RacingButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="racing"
      size="lg"
      className="font-racing uppercase tracking-wider"
      {...props}
    >
      {children}
    </Button>
  )
)

RacingButton.displayName = 'RacingButton'