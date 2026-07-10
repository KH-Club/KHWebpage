import { memo } from "react"
import { cn } from "@/lib/utils"

interface MapStageLegendProps {
	className?: string
}

export const MapStageLegend = memo(function MapStageLegend({
	className,
}: MapStageLegendProps) {
	return (
		<div
			aria-label="คำอธิบายแผนที่"
			className={cn(
				"rounded-3xl border border-white/50 bg-white/70 p-3.5 shadow-lg backdrop-blur-xl sm:p-4",
				className,
			)}
		>
			<p className="text-xs font-semibold text-slate-500">คำอธิบายสี</p>
			<div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
				<div className="flex items-center gap-2">
					<span className="flex items-center gap-0.5" aria-hidden>
						<span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
						<span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
						<span className="h-2.5 w-2.5 rounded-full bg-blue-800" />
					</span>
					<span className="text-sm font-medium text-slate-800">เคยไปแล้ว</span>
				</div>
				<div className="flex items-center gap-2">
					<span
						className="h-2.5 w-2.5 rounded-full bg-slate-300 ring-1 ring-slate-400/40"
						aria-hidden
					/>
					<span className="text-sm font-medium text-slate-800">ยังไม่เคยไป</span>
				</div>
			</div>
			<p className="mt-1.5 text-[11px] leading-4 text-slate-500">
				น้ำเงินเข้มขึ้นเมื่อมีค่ายหลายครั้ง
			</p>
		</div>
	)
})
