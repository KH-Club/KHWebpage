import { memo } from "react"
import { FiBookOpen, FiCompass, FiFlag, FiMapPin } from "react-icons/fi"
import { cn } from "@/lib/utils"
import { MapStats } from "../types"

interface JourneyInsightsProps {
	stats: MapStats
	className?: string
}

export const JourneyInsights = memo(function JourneyInsights({
	stats,
	className,
}: JourneyInsightsProps) {
	const items = [
		{
			icon: FiMapPin,
			value: String(stats.visitedCount),
			label: "จังหวัดที่มีความทรงจำ",
			tone: "text-blue-600",
		},
		{
			icon: FiBookOpen,
			value: String(stats.campRecords),
			label: "ค่ายที่บันทึกไว้",
			tone: "text-sky-600",
		},
		{
			icon: FiFlag,
			value: String(stats.totalProvinces),
			label: "จังหวัดทั้งหมด",
			tone: "text-slate-700",
		},
		{
			icon: FiCompass,
			value: `${stats.explorePercent}%`,
			label: "สัดส่วนที่สำรวจแล้ว",
			tone: "text-amber-700",
		},
	]

	return (
		<section
			aria-label="สถิติแผนที่ความทรงจำ"
			className={cn("relative", className)}
		>
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="rounded-[1.75rem] border border-white/70 bg-white/70 p-5 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.3)] backdrop-blur-md sm:p-6">
					<div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
								Journey Insights
							</p>
							<h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
								ภาพรวมเส้นทางค่ายหอ
							</h2>
						</div>
						<p className="text-sm text-slate-500">
							{stats.unvisitedCount} จังหวัดยังรอเรื่องราวครั้งแรก
						</p>
					</div>

					<div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
						{items.map((item) => {
							const Icon = item.icon
							return (
								<div
									key={item.label}
									className="rounded-3xl bg-gradient-to-br from-slate-50/90 to-white p-4 ring-1 ring-slate-100"
								>
									<div className="flex items-center gap-2 text-slate-400">
										<Icon className="h-4 w-4" aria-hidden />
									</div>
									<p
										className={cn(
											"mt-2 text-2xl font-bold tabular-nums sm:text-3xl",
											item.tone,
										)}
									>
										{item.value}
									</p>
									<p className="mt-0.5 text-xs font-medium leading-5 text-slate-600 sm:text-sm">
										{item.label}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
})
