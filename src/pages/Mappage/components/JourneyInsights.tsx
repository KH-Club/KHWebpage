import { memo } from "react"
import { Calendar, Compass, MapPin, Navigation } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { visitedProvinceSummaries } from "../data/campMapData"
import { MapStats } from "../types"

interface JourneyInsightsProps {
	stats: MapStats
	className?: string
}

const mostVisited = visitedProvinceSummaries.reduce((best, item) =>
	item.visitCount > best.visitCount ? item : best,
)

const latest = visitedProvinceSummaries.reduce((current, item) =>
	Number(item.latestVisit.campID) > Number(current.latestVisit.campID)
		? item
		: current,
)

export const JourneyInsights = memo(function JourneyInsights({
	stats,
	className,
}: JourneyInsightsProps) {
	const reduceMotion = useReducedMotion()
	const items = [
		{
			icon: MapPin,
			value: mostVisited.provinceName,
			label: `ไปบ่อยที่สุด ${mostVisited.visitCount} ครั้ง`,
			tone: "text-[#2478A8]",
		},
		{
			icon: Calendar,
			value: latest.provinceName,
			label: `ค่ายล่าสุด #${latest.latestVisit.campID}`,
			tone: "text-[#0E4F79]",
		},
		{
			icon: Compass,
			value: `${stats.unvisitedCount} จังหวัด`,
			label: "ยังรอบันทึกครั้งแรก",
			tone: "text-[#334B5F]",
		},
		{
			icon: Navigation,
			value: `${stats.explorePercent}%`,
			label: "ของประเทศไทยที่เคยไป",
			tone: "text-[#B7792E]",
		},
	]

	return (
		<section
			aria-label="ข้อมูลเด่นจากเส้นทางค่าย"
			className={cn("relative", className)}
		>
			<div className="mx-auto max-w-6xl px-5 sm:px-6">
				<motion.div
					className="overflow-x-auto rounded-2xl border border-white/80 bg-white/75 shadow-[0_6px_8px_-6px_rgba(16,32,51,0.18)] backdrop-blur-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
					initial={reduceMotion ? false : { opacity: 0.72, y: 18 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				>
					<div className="flex min-w-max divide-x divide-[#D7E6EF] lg:grid lg:min-w-0 lg:grid-cols-4">
						{items.map((item) => {
							const Icon = item.icon
							return (
								<motion.div
									key={item.label}
									className="group min-w-[13.5rem] px-5 py-4 transition-colors hover:bg-[#EAF5FF]/70 lg:min-w-0"
									whileHover={reduceMotion ? undefined : { y: -2 }}
									transition={{
										duration: 0.22,
										ease: [0.22, 1, 0.36, 1],
									}}
								>
									<div className="flex items-center gap-3">
										<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#DCEFF7] text-[#2478A8] transition-transform group-hover:scale-105">
											<Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
										</span>
										<div>
											<p className={cn("text-lg font-bold", item.tone)}>
												{item.value}
											</p>
											<p className="text-xs font-medium text-[#526A7C]">
												{item.label}
											</p>
										</div>
									</div>
								</motion.div>
							)
						})}
					</div>
				</motion.div>
			</div>
		</section>
	)
})
