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
							แผนที่ค่าย
						</p>
						<h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">
							แผนที่ร่องรอยค่ายอาสาทั่วประเทศไทย
						</h1>
						<p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
							ดูจังหวัดที่ชมรมค่ายหอมีบันทึกการออกค่ายอาสา จังหวัดสีน้ำเงินคือ
							เคยไปแล้ว ส่วนสีเทาคือยังไม่มีข้อมูลการไปค่ายในชุดข้อมูลปัจจุบัน
						</p>
					</div>

					<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="rounded-2xl bg-blue-50 p-5">
							<p className="text-3xl font-bold text-blue-700">
								{visitedProvinceSummaries.length}
							</p>
							<p className="mt-1 text-sm font-medium text-blue-900">
								จังหวัดที่เคยไปแล้ว
							</p>
						</div>
						<div className="rounded-2xl bg-sky-50 p-5">
							<p className="text-3xl font-bold text-sky-700">{totalVisits}</p>
							<p className="mt-1 text-sm font-medium text-sky-900">
								ค่ายที่บันทึกไว้
							</p>
						</div>
						<div className="rounded-2xl bg-stone-50 p-5">
							<p className="text-3xl font-bold text-stone-700">
								{provinces.length}
							</p>
							<p className="mt-1 text-sm font-medium text-stone-800">
								จังหวัดทั้งหมด
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="container mx-auto px-6 py-8 sm:py-12">
				<div
					aria-label="คำอธิบายแผนที่"
					className="mb-6 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-gray-100"
				>
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<div>
							<h2 className="text-lg font-bold text-gray-900">คำอธิบายสี</h2>
							<p className="mt-1 text-sm text-gray-500">
								แสดงเพียง 2 สถานะ เพื่อให้ดูแผนที่ได้ง่ายและไม่สับสน
							</p>
						</div>
						<div className="grid gap-3 sm:grid-cols-2 lg:min-w-[560px]">
							<div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
								<span className="h-4 w-4 rounded-full bg-blue-600" />
								<div>
									<p className="font-semibold text-blue-900">เคยไปแล้ว</p>
									<p className="text-sm text-blue-700">
										มีประวัติการออกค่ายในจังหวัดนี้
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
								<span className="h-4 w-4 rounded-full bg-gray-300" />
								<div>
									<p className="font-semibold text-gray-800">ยังไม่เคยไป</p>
									<p className="text-sm text-gray-500">
										ยังไม่มีข้อมูลการออกค่ายในชุดข้อมูลปัจจุบัน
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
					<ThailandProvinceMap
						selectedProvinceId={selectedProvinceId}
						onSelectProvince={setSelectedProvinceId}
					/>

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
