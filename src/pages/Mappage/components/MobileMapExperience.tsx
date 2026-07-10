import { memo } from "react"
import { MapMode, MapStats, ProvinceSummary, UnvisitedProvinceInfo } from "../types"
import { JourneyInsights } from "./JourneyInsights"
import { MapStageLegend } from "./MapStageLegend"
import { MobileMapSummary } from "./MobileMapSummary"
import { ProvinceArchiveList } from "./ProvinceArchiveList"
import { ProvinceDetailSheet } from "./ProvinceDetailSheet"
import { ThailandProvinceMap } from "./ThailandProvinceMap"

interface MobileMapExperienceProps {
	stats: MapStats
	mapMode: MapMode
	onMapModeChange: (mode: MapMode) => void
	selectedProvinceId?: string
	onSelectProvince: (provinceId: string) => void
	selectedSummary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	onClearSelection: () => void
}

/**
 * Map-first mobile layout: summary → map → insights → explorer + snap sheet.
 * No large floating cards over the map.
 */
export const MobileMapExperience = memo(function MobileMapExperience({
	stats,
	mapMode,
	onMapModeChange,
	selectedProvinceId,
	onSelectProvince,
	selectedSummary,
	unvisitedProvince,
	onClearSelection,
}: MobileMapExperienceProps) {
	const hasSelection = Boolean(selectedProvinceId)

	return (
		<div className="relative bg-[#F8FAFC] pb-[18svh]">
			{/* Compact summary — never overlaps map */}
			<MobileMapSummary
				stats={stats}
				mapMode={mapMode}
				onMapModeChange={onMapModeChange}
			/>

			{/* Full-width map stage */}
			<section
				aria-label="เวทีแผนที่ความทรงจำ"
				className="relative w-full bg-gradient-to-b from-sky-50 to-[#F8FAFC]"
			>
				<div className="relative w-full">
					{/* Legend chip — top-left inside map, small footprint */}
					<div className="pointer-events-none absolute left-3 top-3 z-20">
						<div className="pointer-events-auto">
							<MapStageLegend variant="chip" />
						</div>
					</div>

					<ThailandProvinceMap
						mobileApp
						selectedProvinceId={selectedProvinceId}
						onSelectProvince={onSelectProvince}
						mapMode={mapMode}
					/>
				</div>
			</section>

			{/* Below fold — not competing with map */}
			<section className="px-0 pb-4 pt-5">
				<JourneyInsights stats={stats} />
			</section>

			<section className="mx-auto max-w-6xl px-4 pb-8">
				<ProvinceArchiveList
					selectedProvinceId={selectedProvinceId}
					onSelectProvince={onSelectProvince}
					statusFilter={mapMode}
					onStatusFilterChange={onMapModeChange}
					variant="explorer"
				/>
			</section>

			{/* Always-on snap bottom sheet */}
			<ProvinceDetailSheet
				hasSelection={hasSelection}
				summary={selectedSummary}
				unvisitedProvince={unvisitedProvince}
				onClearSelection={onClearSelection}
			/>
		</div>
	)
})
