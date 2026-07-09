import { memo, type ComponentType } from "react"
import { FiBookOpen, FiCompass, FiFlag, FiMapPin } from "react-icons/fi"
import { cn } from "@/lib/utils"
import { MapStats as MapStatsData } from "../types"

interface MapStatsProps {
	stats: MapStatsData
	className?: string
}

interface StatCardConfig {
	key: string
	value: number
	label: string
	hint: string
	icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>
	accent: string
	iconBg: string
	valueClass: string
}

export const MapStats = memo(function MapStats({
	stats,
	className,
}: MapStatsProps) {
	const cards: StatCardConfig[] = [
		{
			key: "visited",
			value: stats.visitedCount,
			label: "จังหวัดที่เคยไป",
			hint: "มีบันทึกค่ายอาสา",
			icon: FiMapPin,
			accent: "border-blue-200 hover:border-blue-300",
			iconBg: "bg-blue-100 text-blue-700",
			valueClass: "text-sky-900",
		},
		{
			key: "camps",
			value: stats.campRecords,
			label: "ค่ายที่บันทึกไว้",
			hint: "รายการค่ายทั้งหมด",
			icon: FiBookOpen,
			accent: "border-sky-200 hover:border-sky-300",
			iconBg: "bg-sky-100 text-sky-700",
			valueClass: "text-sky-700",
		},
		{
			key: "total",
			value: stats.totalProvinces,
			label: "จังหวัดทั้งหมด",
			hint: "ทั่วประเทศไทย",
			icon: FiFlag,
			accent: "border-slate-200 hover:border-slate-300",
			iconBg: "bg-slate-100 text-slate-600",
			valueClass: "text-slate-900",
		},
		{
			key: "explored",
			value: stats.explorePercent,
			label: "สัดส่วนที่สำรวจแล้ว",
			hint: `${stats.visitedCount} จาก ${stats.totalProvinces} จังหวัด`,
			icon: FiCompass,
			accent: "border-amber-200 hover:border-amber-300",
			iconBg: "bg-amber-100 text-amber-700",
			valueClass: "text-amber-700",
		},
	]

	return (
		<section
			aria-label="สถิติแผนที่ความทรงจำ"
			className={cn(
				"grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
				className,
			)}
		>
			{cards.map((card) => {
				const Icon = card.icon
				const display =
					card.key === "explored" ? `${card.value}%` : String(card.value)

				return (
					<article
						key={card.key}
						className={cn(
							"group rounded-3xl border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
							card.accent,
						)}
					>
						<div className="flex items-start justify-between gap-3">
							<div
								className={cn(
									"grid h-11 w-11 place-items-center rounded-2xl transition group-hover:scale-105",
									card.iconBg,
								)}
							>
								<Icon className="h-5 w-5" aria-hidden />
							</div>
						</div>
						<p
							className={cn(
								"mt-4 text-3xl font-bold tabular-nums tracking-tight sm:text-4xl",
								card.valueClass,
							)}
						>
							{display}
						</p>
						<p className="mt-1 text-sm font-semibold text-[#102033]">
							{card.label}
						</p>
						<p className="mt-0.5 text-xs text-[#64748B]">{card.hint}</p>
					</article>
				)
			})}
		</section>
	)
})
