import { memo } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface ProvinceTooltipData {
	provinceId: string
	provinceName: string
	isVisited: boolean
	visitCount: number
	/** clientX / clientY relative to map container */
	x: number
	y: number
}

interface ProvinceTooltipProps {
	data: ProvinceTooltipData | null
	className?: string
}

export const ProvinceTooltip = memo(function ProvinceTooltip({
	data,
	className,
}: ProvinceTooltipProps) {
	if (!data) return null

	return (
		<motion.div
			role="tooltip"
			className={cn(
				"pointer-events-none absolute z-20 max-w-[220px] rounded-xl border border-white/85 bg-white/90 px-3 py-2 shadow-[0_6px_8px_-5px_rgba(16,32,51,0.28)] backdrop-blur-md",
				className,
			)}
			style={{
				left: data.x,
				top: data.y,
				transform: "translate(-50%, calc(-100% - 12px))",
			}}
			initial={{ opacity: 0.6, y: 4, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
		>
			<p className="text-sm font-bold text-slate-900">{data.provinceName}</p>
			<p
				className={cn(
					"mt-0.5 text-xs font-medium",
					data.isVisited ? "text-sky-700" : "text-slate-500",
				)}
			>
				{data.isVisited ? `เคยไปแล้ว ${data.visitCount} ครั้ง` : "ยังไม่เคยไป"}
			</p>
		</motion.div>
	)
})
