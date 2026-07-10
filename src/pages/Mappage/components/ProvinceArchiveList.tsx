import { memo, useEffect, useMemo, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import {
	allArchiveProvinceCards,
	filterAndSortArchiveCards,
} from "../data/archiveList"
import { mapRegions } from "../data/campMapData"
import {
	ArchiveProvinceCard,
	CampMapRegion,
	ProvinceSortOption,
	ProvinceStatusFilter,
} from "../types"

interface ProvinceArchiveListProps {
	selectedProvinceId?: string
	onSelectProvince: (provinceId: string) => void
	/** Synced with hero map mode chips */
	statusFilter: ProvinceStatusFilter
	onStatusFilterChange: (status: ProvinceStatusFilter) => void
	/** Softer explorer chrome under the immersive map */
	variant?: "default" | "explorer"
}

const regionOptions: { value: CampMapRegion | "all"; label: string }[] = [
	{ value: "all", label: "ทุกภาค" },
	...(Object.keys(mapRegions) as CampMapRegion[]).map((id) => ({
		value: id as CampMapRegion | "all",
		label: mapRegions[id].labelTh,
	})),
]

const statusOptions: { value: ProvinceStatusFilter; label: string }[] = [
	{ value: "all", label: "ทั้งหมด" },
	{ value: "visited", label: "เคยไปแล้ว" },
	{ value: "unvisited", label: "ยังไม่เคยไป" },
]

const sortOptions: { value: ProvinceSortOption; label: string }[] = [
	{ value: "mostVisited", label: "ไปบ่อยที่สุด" },
	{ value: "recentlyVisited", label: "ไปล่าสุด" },
	{ value: "alphabetical", label: "ตามชื่อ" },
	{ value: "region", label: "ตามภาค" },
]

const selectClassName =
	"h-11 rounded-2xl border border-white/60 bg-white/80 px-3 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-sm focus:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"

function useDebouncedValue<T>(value: T, delayMs: number): T {
	const [debounced, setDebounced] = useState(value)

	useEffect(() => {
		const timer = window.setTimeout(() => setDebounced(value), delayMs)
		return () => window.clearTimeout(timer)
	}, [value, delayMs])

	return debounced
}

const ArchiveCard = memo(function ArchiveCard({
	card,
	isSelected,
	onSelect,
	index,
	reduceMotion,
}: {
	card: ArchiveProvinceCard
	isSelected: boolean
	onSelect: () => void
	index: number
	reduceMotion: boolean | null
}) {
	const regionLabel = mapRegions[card.region]?.labelTh ?? card.region
	const body = (
		<button
			type="button"
			onClick={onSelect}
			aria-label={
				card.isVisited
					? `เลือกจังหวัด ${card.provinceName} มีบันทึกค่าย ${card.visitCount} ครั้ง`
					: `เลือกจังหวัด ${card.provinceName} ยังไม่เคยไป`
			}
			aria-pressed={isSelected}
			className={cn(
				"flex min-h-[6.5rem] w-full flex-col gap-3 rounded-2xl border px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:justify-between",
				isSelected
					? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
					: "border-white/70 bg-white/80 text-slate-900 shadow-sm backdrop-blur-sm hover:border-blue-200 hover:bg-white",
			)}
		>
			<span className="min-w-0">
				<span className="flex flex-wrap items-center gap-2">
					<span className="block text-lg font-semibold">
						{card.provinceName}
					</span>
					<span
						className={cn(
							"inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold",
							isSelected
								? "bg-white/15 text-white"
								: card.isVisited
									? "bg-sky-100 text-sky-800"
									: "bg-slate-100 text-slate-600",
						)}
					>
						{card.isVisited ? "เคยไปแล้ว" : "ยังไม่เคยไป"}
					</span>
				</span>
				<span
					className={cn(
						"mt-1 block text-sm",
						isSelected ? "text-white/80" : "text-slate-500",
					)}
				>
					{regionLabel}
				</span>
				<span
					className={cn(
						"mt-1 block text-sm sm:line-clamp-2",
						isSelected ? "text-white/85" : "text-slate-600",
					)}
				>
					{card.isVisited
						? `ล่าสุด: #${card.latestVisitCampId} ${card.latestVisitName}`
						: "ยังไม่มีบันทึกค่าย"}
				</span>
			</span>
			<span
				className={cn(
					"inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
					isSelected
						? "bg-white text-sky-900"
						: card.isVisited
							? "bg-blue-100 text-blue-800"
							: "bg-slate-100 text-slate-600",
				)}
			>
				{card.isVisited ? `${card.visitCount} ครั้ง` : "0 ครั้ง"}
			</span>
		</button>
	)

	if (reduceMotion) return body

	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.22,
				delay: Math.min(index * 0.015, 0.25),
				ease: [0.22, 1, 0.36, 1],
			}}
		>
			{body}
		</motion.div>
	)
})

export const ProvinceArchiveList = memo(function ProvinceArchiveList({
	selectedProvinceId,
	onSelectProvince,
	statusFilter,
	onStatusFilterChange,
	variant = "default",
}: ProvinceArchiveListProps) {
	const reduceMotion = useReducedMotion()
	const [query, setQuery] = useState("")
	const [region, setRegion] = useState<CampMapRegion | "all">("all")
	const [sort, setSort] = useState<ProvinceSortOption>("mostVisited")
	const debouncedQuery = useDebouncedValue(query, 200)
	const isExplorer = variant === "explorer"

	const filteredCards = useMemo(
		() =>
			filterAndSortArchiveCards(allArchiveProvinceCards, {
				query: debouncedQuery,
				region,
				status: statusFilter,
				sort,
			}),
		[debouncedQuery, region, statusFilter, sort],
	)

	const visitedInView = filteredCards.filter((card) => card.isVisited).length

	return (
		<section
			aria-labelledby="province-archive-heading"
			aria-label="ดัชนีจังหวัดทั่วประเทศไทย"
			className={cn(
				isExplorer
					? "rounded-[1.75rem] border border-white/70 bg-white/75 p-5 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.28)] backdrop-blur-md sm:p-7"
					: "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
			)}
		>
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
						{isExplorer ? "Province Explorer" : "ดัชนีความทรงจำ"}
					</p>
					<h2
						id="province-archive-heading"
						className="mt-1 text-2xl font-bold text-slate-900"
					>
						{isExplorer
							? "สำรวจจังหวัดทั่วประเทศไทย"
							: "เลือกจังหวัดเพื่อดูรายละเอียด"}
					</h2>
				</div>
				<p className="text-sm text-slate-500">
					แสดง {filteredCards.length} จาก {allArchiveProvinceCards.length}{" "}
					จังหวัด
					{statusFilter !== "unvisited"
						? ` · เคยไป ${visitedInView} จังหวัด`
						: null}
				</p>
			</div>

			{/* Status tabs */}
			<div
				role="tablist"
				aria-label="กรองสถานะ"
				className="mt-5 flex flex-wrap gap-2"
			>
				{statusOptions.map((option) => {
					const selected = statusFilter === option.value
					return (
						<button
							key={option.value}
							type="button"
							role="tab"
							aria-selected={selected}
							onClick={() => onStatusFilterChange(option.value)}
							className={cn(
								"rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
								selected
									? "bg-blue-600 text-white shadow-sm"
									: "bg-white/80 text-slate-700 ring-1 ring-slate-200/80 hover:bg-white",
							)}
						>
							{option.label}
						</button>
					)
				})}
			</div>

			<div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
				<label className="relative block lg:col-span-1">
					<span className="sr-only">ค้นหาจังหวัด</span>
					<FiSearch
						className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
						aria-hidden
					/>
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="ค้นหาจังหวัด"
						className="h-11 w-full rounded-2xl border border-white/60 bg-white/80 py-2 pl-10 pr-3 text-sm text-slate-800 shadow-sm backdrop-blur-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
					/>
				</label>

				<label className="block">
					<span className="sr-only">กรองตามภาค</span>
					<select
						value={region}
						onChange={(event) =>
							setRegion(event.target.value as CampMapRegion | "all")
						}
						className={cn(selectClassName, "w-full")}
					>
						{regionOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</label>

				<label className="block">
					<span className="sr-only">เรียงลำดับ</span>
					<select
						value={sort}
						onChange={(event) =>
							setSort(event.target.value as ProvinceSortOption)
						}
						className={cn(selectClassName, "w-full")}
					>
						{sortOptions.map((option) => (
							<option key={option.value} value={option.value}>
								เรียง: {option.label}
							</option>
						))}
					</select>
				</label>
			</div>

			{filteredCards.length === 0 ? (
				<p className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
					ไม่พบจังหวัดที่ตรงกับตัวกรอง ลองเปลี่ยนคำค้นหาหรือสถานะ
				</p>
			) : (
				<div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
					{filteredCards.map((card, index) => (
						<ArchiveCard
							key={card.provinceId}
							card={card}
							index={index}
							reduceMotion={reduceMotion}
							isSelected={selectedProvinceId === card.provinceId}
							onSelect={() => onSelectProvince(card.provinceId)}
						/>
					))}
				</div>
			)}
		</section>
	)
})

