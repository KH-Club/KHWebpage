import { memo } from "react"
import { cn } from "@/lib/utils"
import { MapMode, MapStats } from "../types"

interface MapStageHeroProps {
	stats: MapStats
	mapMode: MapMode
	onMapModeChange: (mode: MapMode) => void
	className?: string
}

const modeChips: { mode: MapMode; label: string }[] = [
	{ mode: "all", label: "ทั้งหมด" },
	{ mode: "visited", label: "เคยไปแล้ว" },
	{ mode: "unvisited", label: "ยังไม่เคยไป" },
]

export const MapStageHero = memo(function MapStageHero({
	stats,
	mapMode,
	onMapModeChange,
	className,
}: MapStageHeroProps) {
	const { visitedCount, campRecords, totalProvinces, explorePercent } = stats

	return (
		<div
			className={cn(
				"pointer-events-none absolute inset-x-0 top-0 z-20 p-4 sm:p-6 lg:p-8",
				className,
			)}
		>
			<div className="pointer-events-auto max-w-xl rounded-[1.75rem] border border-white/50 bg-white/70 p-5 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-6">
				<p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
					Volunteer Camp Memory Map
				</p>
				<h1
					id="map-hero-heading"
					className="mt-2 text-balance text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl"
				>
					แผนที่ความทรงจำค่ายอาสา
				</h1>
				<p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
					ร่องรอยค่ายหอทั่วไทย — {visitedCount} จังหวัด · {campRecords} ค่าย ·
					สำรวจแล้ว {explorePercent}%
				</p>

				{/* Compact journey progress */}
				<div className="mt-4">
					<div className="flex items-end justify-between gap-3 text-sm">
						<span className="font-semibold tabular-nums text-slate-900">
							{visitedCount}
							<span className="font-medium text-slate-500">
								{" "}
								/ {totalProvinces} จังหวัด
							</span>
						</span>
						<span className="font-semibold tabular-nums text-blue-600">
							{explorePercent}%
						</span>
					</div>
					<div
						className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200/80"
						role="progressbar"
						aria-valuenow={visitedCount}
						aria-valuemin={0}
						aria-valuemax={totalProvinces}
						aria-label="ความคืบหน้าจังหวัดที่เคยไป"
					>
						<div
							className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
							style={{ width: `${explorePercent}%` }}
						/>
					</div>
				</div>

				<div
					role="group"
					aria-label="ตัวกรองมุมมองแผนที่"
					className="mt-4 flex flex-wrap gap-2"
				>
					{modeChips.map(({ mode, label }) => {
						const isActive = mapMode === mode
						return (
							<button
								key={mode}
								type="button"
								onClick={() => onMapModeChange(mode)}
								aria-pressed={isActive}
								className={cn(
									"rounded-full px-3.5 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-sm",
									isActive
										? "bg-blue-600 text-white shadow-sm"
										: "bg-white/80 text-slate-700 ring-1 ring-slate-200/80 hover:bg-white",
								)}
							>
								{label}
							</button>
						)
					})}
				</div>
			</div>
		</div>
	)
})
