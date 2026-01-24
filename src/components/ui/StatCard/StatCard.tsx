import { memo, ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface StatCardProps {
  value: string | number
  label: string
  sublabel?: string
  icon?: ReactNode
  className?: string
  accentColor?: string
}

export const StatCard = memo(function StatCard({
  value,
  label,
  sublabel,
  icon,
  className,
  accentColor = "bg-blue-500"
}: StatCardProps) {
  return (
    <div className={cn("flex w-full items-center", className)}>
      <div className={cn("mr-4 h-full w-2", accentColor)} />
      <div className="flex items-center text-blue-500">
        {icon && <span className="mr-2">{icon}</span>}
        <span className="flex h-full items-center justify-center text-5xl font-semibold">
          {value}
        </span>
        <div className="ml-4 flex flex-col">
          <span className="text-lg font-semibold">{label}</span>
          {sublabel && <span className="text-md font-semibold">{sublabel}</span>}
        </div>
      </div>
    </div>
  )
})

export default StatCard
