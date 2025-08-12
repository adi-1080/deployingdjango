"use client"

import type React from "react"

import { forwardRef } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean
  icon?: React.ReactNode
  gradient?: boolean
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, children, loading, icon, gradient, disabled, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "transition-all-smooth hover-lift focus-ring-green",
          gradient && "gradient-green text-white border-0 hover:opacity-90",
          loading && "cursor-not-allowed opacity-70",
          className,
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Loading...
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </Button>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton }
