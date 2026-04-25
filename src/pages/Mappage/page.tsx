import { useCallback, useEffect, useMemo, useState } from "react"
import { provinces } from "@/assets/data/provinces"
import {
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
							projects. Green provinces have camp history; gray provinces have
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
						<div className="rounded-2xl bg-stone-50 p-5">
							<p className="text-3xl font-bold text-stone-700">
								{provinces.length}
							</p>
							<p className="mt-1 text-sm font-medium text-stone-800">
								Total provinces
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
							<p className="mt-1 text-sm text-gray-500">
								The map uses only two states so it is easy to scan.
							</p>
							<div className="mt-4 grid gap-3 sm:grid-cols-2">
								<div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
									<span className="h-4 w-4 rounded-full bg-emerald-600" />
									<div>
										<p className="font-semibold text-emerald-900">Visited</p>
										<p className="text-sm text-emerald-700">
											Province has recorded camp history
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
									<span className="h-4 w-4 rounded-full bg-gray-300" />
									<div>
										<p className="font-semibold text-gray-800">
											Not visited yet
										</p>
										<p className="text-sm text-gray-500">
											No recorded camp in current data
										</p>
									</div>
								</div>
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
