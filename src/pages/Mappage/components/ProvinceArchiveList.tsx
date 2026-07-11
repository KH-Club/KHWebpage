import { memo, useEffect, useMemo, useState } from "react"
import { ArrowRight, Compass, ListFilter, MapPin, Search } from "lucide-react"
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
	"h-11 border-b border-[#A7CEE5] bg-transparent py-2 pl-10 pr-3 text-sm font-medium text-[#102033] transition focus:border-[#2478A8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] focus-visible:shadow-[0_0_0_4px_rgba(36,120,168,0.1)]"

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
				"group flex min-h-[6.5rem] w-full flex-col gap-3 border-b px-1 py-5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] sm:flex-row sm:items-center sm:justify-between",
				isSelected
					? "border-[#2478A8] bg-[#DCEFF7] text-[#102033]"
					: "border-[#D7E6EF] text-[#102033] hover:border-[#69B7D9] hover:bg-white/55",
			)}
		>
			<span className="min-w-0">
				<span className="flex flex-wrap items-center gap-2">
					<span className="block text-lg font-semibold transition-colors group-hover:text-[#2478A8]">
						{card.provinceName}
					</span>
					<span
						className={cn(
							"inline-flex items-center gap-1 text-xs font-semibold",
							isSelected
								? "text-[#0E4F79]"
								: card.isVisited
									? "text-[#2478A8]"
									: "text-[#526A7C]",
						)}
					>
						<MapPin className="h-3 w-3" strokeWidth={1.8} aria-hidden />
						{card.isVisited ? "เคยไปแล้ว" : "ยังไม่เคยไป"}
					</span>
				</span>
				<span className={cn("mt-1 block text-sm", "text-[#526A7C]")}>
					{regionLabel}
				</span>
				<span
					className={cn("mt-1 block text-sm sm:line-clamp-2", "text-[#334B5F]")}
				>
					{card.isVisited
						? `ล่าสุด: #${card.latestVisitCampId} ${card.latestVisitName}`
						: "ยังไม่มีบันทึกค่าย"}
				</span>
			</span>
			<span
				className={cn(
					"inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold tabular-nums",
					isSelected
						? "text-[#0E4F79]"
						: card.isVisited
							? "text-[#2478A8]"
							: "text-[#526A7C]",
				)}
			>
				{card.isVisited ? `${card.visitCount} ครั้ง` : "ยังไม่มีบันทึก"}
				<ArrowRight
					aria-hidden
					className="h-4 w-4 transition-transform group-hover:translate-x-1"
					strokeWidth={1.8}
				/>
			</span>
		</button>
	)

	if (reduceMotion) return body

	return (
		<motion.div
			initial={{ opacity: 0.72, y: 8 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
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
			className="bg-transparent"
		>
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-semibold text-[#2478A8]">ค้นหาร่องรอยค่าย</p>
					<div className="mt-2 flex items-center gap-3">
						<span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#DCEFF7] text-[#2478A8]">
							<Compass className="h-5 w-5" strokeWidth={1.7} aria-hidden />
						</span>
						<h2
							id="province-archive-heading"
							className="text-balance text-3xl font-bold tracking-[-0.02em] text-[#102033] sm:text-4xl"
						>
							{isExplorer
								? "สำรวจจังหวัดทั่วประเทศไทย"
								: "เลือกจังหวัดเพื่อดูรายละเอียด"}
						</h2>
					</div>
				</div>
				<p className="text-sm text-[#526A7C]">
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
				className="mt-8 flex border-b border-[#A7CEE5]"
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
								"relative min-h-11 px-4 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] active:scale-[0.97]",
								selected
									? "text-[#0E4F79]"
									: "text-[#526A7C] hover:text-[#102033]",
							)}
						>
							{option.label}
							{selected ? (
								<motion.span
									layoutId="archive-status-filter"
									className="absolute inset-x-2 bottom-[-1px] h-1 bg-[#2478A8] shadow-[0_0_8px_rgba(36,120,168,0.3)]"
								/>
							) : null}
						</button>
					)
				})}
			</div>

			<div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
				<label className="relative block lg:col-span-1">
					<span className="sr-only">ค้นหาจังหวัด</span>
					<Search
						className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
						strokeWidth={1.8}
						aria-hidden
					/>
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="ค้นหาจังหวัด"
						className="h-11 w-full border-b border-[#A7CEE5] bg-transparent py-2 pl-10 pr-3 text-sm text-[#102033] transition placeholder:text-[#526A7C] focus:border-[#2478A8] focus:outline-none focus-visible:shadow-[0_0_0_4px_rgba(36,120,168,0.1)] focus-visible:ring-2 focus-visible:ring-[#2478A8]"
					/>
				</label>

				<label className="relative block">
					<span className="sr-only">กรองตามภาค</span>
					<Compass
						className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#526A7C]"
						strokeWidth={1.8}
						aria-hidden
					/>
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

				<label className="relative block">
					<span className="sr-only">เรียงลำดับ</span>
					<ListFilter
						className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#526A7C]"
						strokeWidth={1.8}
						aria-hidden
					/>
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
				<p className="mt-8 border-y border-[#D7E6EF] px-4 py-10 text-center text-sm text-[#526A7C]">
					ไม่พบจังหวัดที่ตรงกับตัวกรอง ลองเปลี่ยนคำค้นหาหรือสถานะ
				</p>
			) : (
				<div className="mt-8 grid grid-cols-1 gap-x-10 md:grid-cols-2">
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
