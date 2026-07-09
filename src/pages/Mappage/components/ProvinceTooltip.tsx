import { memo } from "react"
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
		<div
			role="tooltip"
			className={cn(
				"pointer-events-none absolute z-20 max-w-[220px] rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm",
				className,
			)}
			style={{
				left: data.x,
				top: data.y,
				transform: "translate(-50%, calc(-100% - 12px))",
			}}
		>
			<p className="text-sm font-bold text-slate-900">{data.provinceName}</p>
			<p
				className={cn(
					"mt-0.5 text-xs font-medium",
					data.isVisited ? "text-sky-700" : "text-slate-500",
				)}
			>
				{data.isVisited
					? `เคยไปแล้ว ${data.visitCount} ครั้ง`
					: "ยังไม่เคยไป"}
			</p>
		</div>
	)
})
