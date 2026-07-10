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

/**
 * Floating glass story card over the map stage (desktop / large screens).
 */
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
				"pointer-events-none absolute inset-y-0 right-0 z-30 hidden w-full max-w-md p-4 sm:p-6 lg:block",
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
						initial={
							reduceMotion
								? false
								: { opacity: 0, x: 28, scale: 0.97 }
						}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						exit={
							reduceMotion
								? undefined
								: { opacity: 0, x: 20, scale: 0.98 }
						}
						transition={{
							duration: 0.35,
							ease: [0.22, 1, 0.36, 1],
						}}
						className="pointer-events-auto flex h-full max-h-[calc(70vh-2rem)] flex-col overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/80 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl"
					>
						<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
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
