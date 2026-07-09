import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { provinces } from "@/assets/data/provinces"
import {
	getMapStats,
	visitedProvinceSummaries,
	visitedProvinceSummaryById,
} from "./data/campMapData"
import { MapHero } from "./components/MapHero"
import { MapLegend } from "./components/MapLegend"
import { MapStats } from "./components/MapStats"
import { ProvinceDetailPanel } from "./components/ProvinceDetailPanel"
import { ThailandProvinceMap } from "./components/ThailandProvinceMap"
import { VisitedProvinceList } from "./components/VisitedProvinceList"
import { MapMode } from "./types"

const MapPage = () => {
	const [selectedProvinceId, setSelectedProvinceId] = useState<string>()
	const [mapMode, setMapMode] = useState<MapMode>("all")
	const mapSectionRef = useRef<HTMLElement>(null)

	const selectedSummary = selectedProvinceId
		? visitedProvinceSummaryById.get(selectedProvinceId)
		: undefined

	const stats = useMemo(
		() => getMapStats(visitedProvinceSummaries, provinces.length),
		[],
	)

	const handleClearSelection = useCallback(() => {
		setSelectedProvinceId(undefined)
	}, [])

	const handleExploreMap = useCallback(() => {
		const node = mapSectionRef.current
		if (node && typeof node.scrollIntoView === "function") {
			node.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		}
	}, [])

	useEffect(() => {
		const handleKeyDown = (event: globalThis.KeyboardEvent) => {
			if (event.key === "Escape") {
				handleClearSelection()
			}
		}

		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [handleClearSelection])

	return (
		<div className="min-h-screen bg-[#F8FAFC]">
			<MapHero
				stats={stats}
				mapMode={mapMode}
				onMapModeChange={setMapMode}
				onExploreMap={handleExploreMap}
			/>

			<section className="container mx-auto px-6 py-8 sm:py-10">
				<MapStats stats={stats} />
			</section>

			<section
				ref={mapSectionRef}
				className="container mx-auto scroll-mt-24 px-6 pb-8 sm:pb-12"
			>
				<div className="mb-6">
					<MapLegend />
				</div>

				<div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
					<div data-map-mode={mapMode}>
						<ThailandProvinceMap
							selectedProvinceId={selectedProvinceId}
							onSelectProvince={setSelectedProvinceId}
						/>
					</div>

					<div className="xl:sticky xl:top-24 xl:self-start">
						<ProvinceDetailPanel
							summary={selectedSummary}
							onClearSelection={handleClearSelection}
						/>
					</div>
				</div>

				<div className="mt-6">
					<VisitedProvinceList
						summaries={visitedProvinceSummaries}
						selectedProvinceId={selectedProvinceId}
						onSelectProvince={setSelectedProvinceId}
					/>
				</div>
			</section>
		</div>
	)
}

export default MapPage
