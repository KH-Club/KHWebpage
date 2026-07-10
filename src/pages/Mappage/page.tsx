import { useCallback, useEffect, useMemo, useState } from "react"
import { provinces } from "@/assets/data/provinces"
import {
	getMapStats,
	visitedProvinceSummaries,
	visitedProvinceSummaryById,
} from "./data/campMapData"
import { MapStage } from "./components/MapStage"
import { MobileMapExperience } from "./components/MobileMapExperience"
import { ProvinceArchiveList } from "./components/ProvinceArchiveList"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { MapMode } from "./types"

const MapPage = () => {
	const [selectedProvinceId, setSelectedProvinceId] = useState<string>()
	const [mapMode, setMapMode] = useState<MapMode>("visited")
	const isDesktop = useMediaQuery("(min-width: 1024px)")

	const selectedSummary = selectedProvinceId
		? visitedProvinceSummaryById.get(selectedProvinceId)
		: undefined

	const unvisitedProvince = useMemo(() => {
		if (!selectedProvinceId || selectedSummary) return undefined
		const province = provinces.find((item) => item.id === selectedProvinceId)
		if (!province) return undefined
		return { id: province.id, name: province.name }
	}, [selectedProvinceId, selectedSummary])

	const stats = useMemo(
		() => getMapStats(visitedProvinceSummaries, provinces.length),
		[],
	)

	const handleClearSelection = useCallback(() => {
		setSelectedProvinceId(undefined)
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

	const shared = {
		stats,
		mapMode,
		onMapModeChange: setMapMode,
		selectedProvinceId,
		onSelectProvince: setSelectedProvinceId,
		selectedSummary,
		unvisitedProvince,
		onClearSelection: handleClearSelection,
	}

	return (
		<div className="min-h-screen bg-[#F6FAFC] text-[#102033]">
			{!isDesktop ? (
				<MobileMapExperience {...shared} />
			) : (
				<>
					<MapStage {...shared} />

					<section className="mx-auto max-w-6xl px-6 py-20 xl:px-0">
						<ProvinceArchiveList
							selectedProvinceId={selectedProvinceId}
							onSelectProvince={setSelectedProvinceId}
							statusFilter={mapMode}
							onStatusFilterChange={setMapMode}
							variant="explorer"
						/>
					</section>
				</>
			)}
		</div>
	)
}

export default MapPage
