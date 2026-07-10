import { memo } from "react"
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
			className={cn(
				"border-b border-slate-100 bg-white px-4 py-3 shadow-sm",
				className,
			)}
		>
			<p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-600">
				Memory Map
			</p>
			<h1
				id="mobile-map-title"
				className="mt-0.5 text-lg font-bold leading-snug text-slate-900"
			>
				แผนที่ความทรงจำค่ายอาสา
			</h1>

			<div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
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
				className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"
				role="progressbar"
				aria-valuenow={visitedCount}
				aria-valuemin={0}
				aria-valuemax={totalProvinces}
				aria-label="ความคืบหน้าจังหวัดที่เคยไป"
			>
				<div
					className="h-full rounded-full bg-blue-600 transition-all duration-300"
					style={{ width: `${explorePercent}%` }}
				/>
			</div>

			<div
				role="group"
				aria-label="ตัวกรองมุมมองแผนที่"
				className="mt-3 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
								"h-9 shrink-0 rounded-full px-3.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
								active
									? "bg-blue-600 text-white shadow-sm"
									: "bg-slate-100 text-slate-700 hover:bg-slate-200",
							)}
						>
							{label}
						</button>
					)
				})}
			</div>
		</section>
	)
})
