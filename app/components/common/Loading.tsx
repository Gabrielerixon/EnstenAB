import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const loadingVariants = cva(
  'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
      color: {
        primary: 'text-ensten-orange',
        secondary: 'text-ensten-blue',
        white: 'text-white',
        dark: 'text-ensten-black',
        current: 'text-current',
      }
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
)

interface LoadingProps extends VariantProps<typeof loadingVariants> {
  className?: string
  text?: string
  fullScreen?: boolean
}

export const Loading = ({ 
  size, 
  color, 
  className, 
  text,
  fullScreen = false 
}: LoadingProps) => {
  const spinner = (
    <div className={cn(loadingVariants({ size, color }), className)} />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center">
          {spinner}
          {text && (
            <p className="mt-4 text-sm text-gray-600">{text}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {spinner}
      {text && (
        <p className="mt-4 text-sm text-gray-600">{text}</p>
      )}
    </div>
  )
}

// Page loading skeleton
export const PageSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg mb-6" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  )
}

// Card loading skeleton
export const CardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-t-lg" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  )
}