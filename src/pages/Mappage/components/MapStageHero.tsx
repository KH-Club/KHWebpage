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
				"pointer-events-none absolute left-0 top-0 z-20 flex h-full w-[min(38rem,42vw)] items-start px-8 py-[clamp(3rem,9vh,7rem)] xl:px-14",
				className,
			)}
		>
			<div className="pointer-events-auto max-w-md">
				<p className="text-sm font-semibold text-[#2478A8]">แผนที่ความทรงจำ</p>
				<h1
					id="map-hero-heading"
					className="mt-3 text-balance text-[clamp(2.75rem,4.3vw,4.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#102033]"
				>
					ร่องรอยค่ายหอทั่วไทย
				</h1>
				<p className="mt-5 max-w-[34rem] text-lg leading-8 text-[#334B5F]">
					{campRecords} ค่ายอาสาใน {visitedCount} จังหวัด
					แต่ละพื้นที่เก็บเรื่องของการเดินทาง การลงมือทำ และผู้คนที่เราได้พบ
				</p>

				<div className="mt-8 border-y border-[#A7CEE5] py-4">
					<p className="font-semibold tabular-nums text-[#102033]">
						{visitedCount} จังหวัด
						<span className="mx-3 text-[#69B7D9]" aria-hidden>
							·
						</span>
						{campRecords} ค่าย
						<span className="mx-3 text-[#69B7D9]" aria-hidden>
							·
						</span>
						{explorePercent}% ของประเทศไทย
					</p>
					<div
						className="mt-3 h-1 overflow-hidden bg-white"
						role="progressbar"
						aria-valuenow={visitedCount}
						aria-valuemin={0}
						aria-valuemax={totalProvinces}
						aria-label="ความคืบหน้าจังหวัดที่เคยไป"
					>
						<div
							className="h-full bg-[#2478A8] transition-[width] duration-500"
							style={{ width: `${explorePercent}%` }}
						/>
					</div>
				</div>

				<div
					role="group"
					aria-label="ตัวกรองมุมมองแผนที่"
					className="mt-7 flex border-b border-[#A7CEE5]"
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
									"relative min-h-11 px-4 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]",
									isActive
										? "text-[#0E4F79] after:absolute after:inset-x-2 after:bottom-[-1px] after:h-1 after:bg-[#2478A8]"
										: "text-[#526A7C] hover:text-[#102033]",
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
