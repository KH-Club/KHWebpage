import { useCallback, useEffect, useMemo, useState } from "react"
import { provinces } from "@/assets/data/provinces"
import {
	getMapStats,
	visitedProvinceSummaries,
	visitedProvinceSummaryById,
} from "./data/campMapData"
import { JourneyInsights } from "./components/JourneyInsights"
import { MapStage } from "./components/MapStage"
import { MobileMapExperience } from "./components/MobileMapExperience"
import { ProvinceArchiveList } from "./components/ProvinceArchiveList"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { MapMode } from "./types"

const MapPage = () => {
	const [selectedProvinceId, setSelectedProvinceId] = useState<string>()
	const [mapMode, setMapMode] = useState<MapMode>("all")
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
		<div
			className="min-h-screen bg-[#F8FAFC]"
			style={{
				backgroundImage:
					"radial-gradient(ellipse 100% 40% at 50% 0%, rgba(191,219,254,0.35) 0%, transparent 55%)",
			}}
		>
			{!isDesktop ? (
				<MobileMapExperience {...shared} />
			) : (
				<>
					<section className="relative w-full">
						<MapStage {...shared} />
					</section>

					<section className="relative z-10 -mt-6 pb-6 sm:-mt-8 sm:pb-8">
						<JourneyInsights stats={stats} />
					</section>

					<section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6">
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
