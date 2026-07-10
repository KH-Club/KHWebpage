import { memo } from "react"
import { cn } from "@/lib/utils"
import {
	MapMode,
	MapStats,
	ProvinceSummary,
	UnvisitedProvinceInfo,
} from "../types"
import { MapAtmosphere } from "./MapAtmosphere"
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

/** Bright, continuous atlas stage. The map is the dominant surface. */
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
				"relative min-h-[calc(100svh-4rem)] w-full overflow-hidden border-b border-[#BFD9EB] bg-[#EAF5FF]",
				className,
			)}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage:
						"radial-gradient(circle at 82% 12%, rgba(105,183,217,0.32), transparent 30%), radial-gradient(circle at 12% 88%, rgba(56,189,248,0.15), transparent 34%)",
				}}
			/>
			<div className="absolute inset-0 z-0">
				<ThailandProvinceMap
					immersive
					selectedProvinceId={selectedProvinceId}
					onSelectProvince={onSelectProvince}
					mapMode={mapMode}
				/>
			</div>
			<MapAtmosphere dimmed={Boolean(selectedProvinceId)} />

			<MapStageHero
				stats={stats}
				mapMode={mapMode}
				onMapModeChange={onMapModeChange}
				className={cn(
					"transition-[opacity,transform] duration-300",
					selectedProvinceId && "pointer-events-none -translate-x-4 opacity-0",
				)}
			/>

			<div
				className={cn(
					"pointer-events-none absolute bottom-7 left-8 z-20 transition-opacity duration-300",
					selectedProvinceId && "opacity-0",
				)}
			>
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
