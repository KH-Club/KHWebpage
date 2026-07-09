import { memo } from "react"
import {
	Flag,
	MapPinned,
	BookOpen,
	Compass,
	type LucideIcon,
} from "lucide-react"
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
	icon: LucideIcon
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
			icon: MapPinned,
			accent: "border-[#BFDBFE] hover:border-[#93C5FD]",
			iconBg: "bg-[#DBEAFE] text-[#1D4ED8]",
			valueClass: "text-[#0E4F79]",
		},
		{
			key: "camps",
			value: stats.campRecords,
			label: "ค่ายที่บันทึกไว้",
			hint: "รายการค่ายทั้งหมด",
			icon: BookOpen,
			accent: "border-[#BAE6FD] hover:border-[#7DD3FC]",
			iconBg: "bg-[#E0F2FE] text-[#0369A1]",
			valueClass: "text-[#2478A8]",
		},
		{
			key: "total",
			value: stats.totalProvinces,
			label: "จังหวัดทั้งหมด",
			hint: "ทั่วประเทศไทย",
			icon: Flag,
			accent: "border-[#E2E8F0] hover:border-[#CBD5E1]",
			iconBg: "bg-[#F1F5F9] text-[#475569]",
			valueClass: "text-[#102033]",
		},
		{
			key: "explored",
			value: stats.explorePercent,
			label: "สัดส่วนที่สำรวจแล้ว",
			hint: `${stats.visitedCount} จาก ${stats.totalProvinces} จังหวัด`,
			icon: Compass,
			accent: "border-[#FDE68A] hover:border-[#FCD34D]",
			iconBg: "bg-[#FEF3C7] text-[#B7792E]",
			valueClass: "text-[#B7792E]",
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
