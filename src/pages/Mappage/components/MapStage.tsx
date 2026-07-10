import { memo } from "react"
import { cn } from "@/lib/utils"
import { MapMode, MapStats, ProvinceSummary, UnvisitedProvinceInfo } from "../types"
import { MapStageHero } from "./MapStageHero"
import { MapStageLegend } from "./MapStageLegend"
import { MapStoryCard } from "./MapStoryCard"
import { ThailandProvinceMap } from "./ThailandProvinceMap"

interface MapStageProps {
	stats: MapStats
	mapMode: MapMode
	onMapModeChange: (mode: MapMode) => void
	selectedProvinceId?: string
	onSelectProvince: (provinceId: string) => void
	selectedSummary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	onClearSelection: () => void
	className?: string
}

/**
 * Immersive full-width map stage with floating glass overlays.
 */
export const MapStage = memo(function MapStage({
	stats,
	mapMode,
	onMapModeChange,
	selectedProvinceId,
	onSelectProvince,
	selectedSummary,
	unvisitedProvince,
	onClearSelection,
	className,
}: MapStageProps) {
	return (
		<section
			aria-label="เวทีแผนที่ความทรงจำ"
			className={cn(
				"relative min-h-[70vh] w-full overflow-hidden",
				className,
			)}
			style={{
				background:
					"radial-gradient(ellipse 80% 60% at 50% 35%, rgba(191,219,254,0.55) 0%, rgba(224,242,254,0.35) 40%, rgba(248,250,252,0.9) 70%, #F8FAFC 100%)",
			}}
		>
			{/* Decorative soft orbs */}
			<div
				aria-hidden
				className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-blue-200/25 blur-3xl"
			/>

			{/* Full-bleed interactive map */}
			<div className="absolute inset-0 z-0">
				<ThailandProvinceMap
					immersive
					selectedProvinceId={selectedProvinceId}
					onSelectProvince={onSelectProvince}
					mapMode={mapMode}
				/>
			</div>

			{/* Floating overlays */}
			<MapStageHero
				stats={stats}
				mapMode={mapMode}
				onMapModeChange={onMapModeChange}
			/>

			<div className="pointer-events-none absolute bottom-14 left-4 z-20 sm:bottom-16 sm:left-6 lg:bottom-8">
				<div className="pointer-events-auto">
					<MapStageLegend />
				</div>
			</div>

			<MapStoryCard
				summary={selectedSummary}
				unvisitedProvince={unvisitedProvince}
				onClearSelection={onClearSelection}
			/>
		</section>
	)
})
