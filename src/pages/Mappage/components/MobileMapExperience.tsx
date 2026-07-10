import { memo } from "react"
import {
	MapMode,
	MapStats,
	ProvinceSummary,
	UnvisitedProvinceInfo,
} from "../types"
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
		<div className="relative bg-[#F6FAFC]">
			{/* Compact summary — never overlaps map */}
			<MobileMapSummary
				stats={stats}
				mapMode={mapMode}
				onMapModeChange={onMapModeChange}
			/>

			{/* Full-width map stage */}
			<section
				aria-label="เวทีแผนที่ความทรงจำ"
				className="relative w-full border-b border-[#BFD9EB] bg-[#EAF5FF]"
			>
				<div className="relative w-full">
					{/* Legend chip — top-left inside map, small footprint */}
					<div className="pointer-events-none absolute bottom-3 left-4 z-20">
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

			<section className="mx-auto max-w-6xl px-5 py-16">
				<ProvinceArchiveList
					selectedProvinceId={selectedProvinceId}
					onSelectProvince={onSelectProvince}
					statusFilter={mapMode}
					onStatusFilterChange={onMapModeChange}
					variant="explorer"
				/>
			</section>

			{hasSelection ? (
				<ProvinceDetailSheet
					hasSelection
					summary={selectedSummary}
					unvisitedProvince={unvisitedProvince}
					onClearSelection={onClearSelection}
				/>
			) : null}
		</div>
	)
})
