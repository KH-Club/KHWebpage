import { memo } from "react"
import { cn } from "@/lib/utils"

interface MapStageLegendProps {
	className?: string
	/** Compact chip for mobile map (minimal footprint) */
	variant?: "default" | "chip"
}

export const MapStageLegend = memo(function MapStageLegend({
	className,
	variant = "default",
}: MapStageLegendProps) {
	if (variant === "chip") {
		return (
			<div
				aria-label="คำอธิบายแผนที่"
				className={cn(
					"inline-flex items-center gap-3 rounded-xl border border-white/85 bg-white/[0.78] px-3 py-2 text-xs font-medium text-[#334B5F] shadow-[0_4px_8px_-5px_rgba(16,32,51,0.2)] backdrop-blur-md",
					className,
				)}
			>
				<span className="inline-flex items-center gap-1.5">
					<span className="flex items-center gap-0.5" aria-hidden>
						<span className="h-2 w-2 rounded-full bg-blue-500" />
						<span className="h-2 w-2 rounded-full bg-blue-700" />
					</span>
					เคยไป
				</span>
				<span className="h-3 w-px bg-slate-200" aria-hidden />
				<span className="inline-flex items-center gap-1.5">
					<span
						className="h-2 w-2 rounded-full bg-slate-300 ring-1 ring-slate-400/50"
						aria-hidden
					/>
					ยังไม่ไป
				</span>
			</div>
		)
	}

	return (
		<div
			aria-label="คำอธิบายแผนที่"
			className={cn(
				"bg-white/72 rounded-xl border border-white/85 px-4 py-3 text-[#334B5F] shadow-[0_4px_8px_-5px_rgba(16,32,51,0.2)] backdrop-blur-md",
				className,
			)}
		>
			<p className="sr-only">คำอธิบายสี</p>
			<div className="flex items-center gap-5">
				<div className="flex items-center gap-2">
					<span className="flex items-center gap-0.5" aria-hidden>
						<span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
						<span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
						<span className="h-2.5 w-2.5 rounded-full bg-blue-800" />
					</span>
					<span className="text-sm font-medium">เคยไปแล้ว</span>
				</div>
				<div className="flex items-center gap-2">
					<span
						className="h-2.5 w-2.5 rounded-full bg-slate-300 ring-1 ring-slate-400/40"
						aria-hidden
					/>
					<span className="text-sm font-medium">ยังไม่เคยไป</span>
				</div>
			</div>
			<p className="mt-1.5 text-[11px] leading-4 text-[#526A7C]">
				น้ำเงินเข้มขึ้นเมื่อมีค่ายหลายครั้ง
			</p>
		</div>
	)
})
