"use client"

import { forwardRef } from "react"
import { Card, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface EnhancedCardProps extends CardProps {
  hover?: boolean
  gradient?: boolean
  glow?: boolean
}

const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, hover = false, gradient = false, glow = false, ...props }, ref) => {
    return (
      <Card
        className={cn(
          "transition-all-smooth",
          hover && "hover-lift cursor-pointer",
          gradient && "gradient-green-subtle",
          glow && "shadow-green-lg",
          "border-green-200 animate-fade-in",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

EnhancedCard.displayName = "EnhancedCard"

export { EnhancedCard }
