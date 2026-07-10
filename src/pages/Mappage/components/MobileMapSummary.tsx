import { memo } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { MapMode, MapStats } from "../types"

interface MobileMapSummaryProps {
	stats: MapStats
	mapMode: MapMode
	onMapModeChange: (mode: MapMode) => void
	className?: string
}

const modeChips: { mode: MapMode; label: string }[] = [
	{ mode: "all", label: "ทั้งหมด" },
	{ mode: "visited", label: "เคยไป" },
	{ mode: "unvisited", label: "ยังไม่ไป" },
]

/**
 * Compact summary above the map on mobile — does not overlay the map.
 */
export const MobileMapSummary = memo(function MobileMapSummary({
	stats,
	mapMode,
	onMapModeChange,
	className,
}: MobileMapSummaryProps) {
	const { visitedCount, campRecords, totalProvinces, explorePercent } = stats

	return (
		<section
			aria-labelledby="mobile-map-title"
			className={cn("bg-[#EAF5FF] px-5 pb-3 pt-5", className)}
		>
			<p className="text-sm font-semibold text-[#2478A8]">แผนที่ความทรงจำ</p>
			<h1
				id="mobile-map-title"
				className="mt-1 text-balance text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#102033]"
			>
				ร่องรอยค่ายหอทั่วไทย
			</h1>

			<div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#334B5F]">
				<span className="font-semibold tabular-nums text-slate-900">
					{visitedCount}/{totalProvinces}
				</span>
				<span className="text-slate-300" aria-hidden>
					·
				</span>
				<span className="tabular-nums">{campRecords} ค่าย</span>
				<span className="text-slate-300" aria-hidden>
					·
				</span>
				<span className="font-semibold tabular-nums text-blue-600">
					{explorePercent}%
				</span>
			</div>

			<div
				className="mt-3 h-1 overflow-hidden bg-white"
				role="progressbar"
				aria-valuenow={visitedCount}
				aria-valuemin={0}
				aria-valuemax={totalProvinces}
				aria-label="ความคืบหน้าจังหวัดที่เคยไป"
			>
				<div
					className="h-full bg-[#2478A8] transition-[width] duration-300"
					style={{ width: `${explorePercent}%` }}
				/>
			</div>

			<div
				role="group"
				aria-label="ตัวกรองมุมมองแผนที่"
				className="mt-4 flex overflow-x-auto border-b border-[#A7CEE5] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				{modeChips.map(({ mode, label }) => {
					const active = mapMode === mode
					return (
						<button
							key={mode}
							type="button"
							onClick={() => onMapModeChange(mode)}
							aria-pressed={active}
							className={cn(
								"relative h-11 shrink-0 px-4 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] active:scale-[0.97]",
								active ? "text-[#0E4F79]" : "text-[#526A7C]",
							)}
						>
							{label}
							{active ? (
								<motion.span
									layoutId="mobile-map-filter"
									className="absolute inset-x-2 bottom-[-1px] h-1 bg-[#2478A8] shadow-[0_0_8px_rgba(36,120,168,0.3)]"
								/>
							) : null}
						</button>
					)
				})}
			</div>
		</section>
	)
})
