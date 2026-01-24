import { memo, ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface InfoCardProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  hoverEffect?: boolean
}

export const InfoCard = memo(function InfoCard({
  title,
  description,
  children,
  className,
  hoverEffect = true
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-white p-6 shadow-md",
        hoverEffect && "transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 hover:text-white",
        className
      )}
    >
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {description && <p className="mb-4">{description}</p>}
      {children}
    </div>
  )
})

export default InfoCard
