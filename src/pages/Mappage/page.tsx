import { useCallback, useEffect, useMemo, useState } from "react"
import {
	mapRegions,
	visitedProvinceSummaries,
	visitedProvinceSummaryById,
} from "./data/campMapData"
import { ProvinceDetailPanel } from "./components/ProvinceDetailPanel"
import { ThailandProvinceMap } from "./components/ThailandProvinceMap"
import { VisitedProvinceList } from "./components/VisitedProvinceList"

const MapPage = () => {
	const [selectedProvinceId, setSelectedProvinceId] = useState<string>()

	const selectedSummary = selectedProvinceId
		? visitedProvinceSummaryById.get(selectedProvinceId)
		: undefined

	const totalVisits = useMemo(
		() =>
			visitedProvinceSummaries.reduce(
				(total, summary) => total + summary.visitCount,
				0,
			),
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

	return (
		<div className="min-h-screen bg-gray-50">
			<section className="bg-white">
				<div className="container mx-auto px-6 py-10 sm:py-14">
					<div className="max-w-3xl">
						<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
							Camp map
						</p>
						<h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">
							Kaihor camp footprints across Thailand
						</h1>
						<p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
							Explore provinces where Kaihor Club has recorded volunteer camp
							projects. Colored provinces have camp history; gray provinces have
							no recorded visit in the current historical data.
						</p>
					</div>

					<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="rounded-2xl bg-blue-50 p-5">
							<p className="text-3xl font-bold text-blue-700">
								{visitedProvinceSummaries.length}
							</p>
							<p className="mt-1 text-sm font-medium text-blue-900">
								Visited provinces
							</p>
						</div>
						<div className="rounded-2xl bg-emerald-50 p-5">
							<p className="text-3xl font-bold text-emerald-700">
								{totalVisits}
							</p>
							<p className="mt-1 text-sm font-medium text-emerald-900">
								Recorded visits
							</p>
						</div>
						<div className="rounded-2xl bg-amber-50 p-5">
							<p className="text-3xl font-bold text-amber-700">
								{Object.keys(mapRegions).length}
							</p>
							<p className="mt-1 text-sm font-medium text-amber-900">
								Map regions
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="container mx-auto px-6 py-8 sm:py-12">
				<div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
					<div className="space-y-6">
						<ThailandProvinceMap
							selectedProvinceId={selectedProvinceId}
							onSelectProvince={setSelectedProvinceId}
						/>

						<div
							aria-label="Map legend"
							className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-gray-100"
						>
							<h2 className="text-lg font-bold text-gray-900">Legend</h2>
							<div className="mt-4 flex flex-wrap gap-3">
								<span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
									<span className="h-3 w-3 rounded-full bg-gray-300" />
									Not visited yet
								</span>
								<span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
									<span className="h-3 w-3 rounded-full bg-blue-600" />
									Visited
								</span>
								{Object.values(mapRegions).map((region) => (
									<span
										key={region.id}
										className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700"
									>
										<span
											className="h-3 w-3 rounded-full"
											style={{ backgroundColor: region.color }}
										/>
										{region.label}
									</span>
								))}
							</div>
						</div>
					</div>

					<ProvinceDetailPanel
						summary={selectedSummary}
						onClearSelection={handleClearSelection}
					/>
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
