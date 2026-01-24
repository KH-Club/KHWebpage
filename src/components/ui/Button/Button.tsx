import { memo, forwardRef, ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link"
  size?: "sm" | "md" | "lg"
  children: ReactNode
  isLoading?: boolean
}

const buttonVariants = {
  primary: "bg-blue-500 text-white hover:bg-blue-700 shadow-md",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "bg-transparent underline-offset-4 hover:underline text-blue-500"
}

const buttonSizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
}

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    children, 
    isLoading = false,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-lg font-semibold transition duration-300 ease-in-out",
          "hover:-translate-y-1 hover:scale-105",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
))

Button.displayName = "Button"

export default Button
