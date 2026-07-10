import { memo } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { ProvinceSummary, UnvisitedProvinceInfo } from "../types"
import { ProvinceDetailContent } from "./ProvinceDetailContent"

interface MapStoryCardProps {
	summary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	onClearSelection: () => void
	className?: string
}

/** Integrated edge panel for province stories on larger screens. */
export const MapStoryCard = memo(function MapStoryCard({
	summary,
	unvisitedProvince,
	onClearSelection,
	className,
}: MapStoryCardProps) {
	const reduceMotion = useReducedMotion()
	const open = Boolean(summary || unvisitedProvince)
	const key = summary?.provinceId ?? unvisitedProvince?.id ?? "closed"

	return (
		<div
			className={cn(
				"pointer-events-none absolute inset-y-0 right-0 z-30 hidden w-[min(27rem,34vw)] lg:block",
				className,
			)}
		>
			<AnimatePresence mode="wait">
				{open ? (
					<motion.aside
						key={key}
						role="dialog"
						aria-modal="false"
						aria-label="เรื่องราวจังหวัดที่เลือก"
						initial={reduceMotion ? false : { opacity: 0, x: 44 }}
						animate={{ opacity: 1, x: 0 }}
						exit={reduceMotion ? undefined : { opacity: 0, x: 32 }}
						transition={{
							duration: 0.35,
							ease: [0.22, 1, 0.36, 1],
						}}
						className="pointer-events-auto flex h-full flex-col overflow-hidden border-l border-[#BFD9EB] bg-[#F6FAFC]"
					>
						<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
							<ProvinceDetailContent
								summary={summary}
								unvisitedProvince={unvisitedProvince}
								onClearSelection={onClearSelection}
								compact
							/>
						</div>
					</motion.aside>
				) : null}
			</AnimatePresence>
		</div>
	)
})
