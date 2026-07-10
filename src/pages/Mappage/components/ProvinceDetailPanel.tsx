import { memo } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ProvinceSummary, UnvisitedProvinceInfo } from "../types"
import { ProvinceDetailContent } from "./ProvinceDetailContent"

export type { UnvisitedProvinceInfo }

interface ProvinceDetailPanelProps {
	summary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	onClearSelection: () => void
}

export const ProvinceDetailPanel = memo(function ProvinceDetailPanel({
	summary,
	unvisitedProvince,
	onClearSelection,
}: ProvinceDetailPanelProps) {
	const reduceMotion = useReducedMotion()
	const contentKey =
		summary?.provinceId ?? unvisitedProvince?.id ?? "empty"

	return (
		<aside className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
			{reduceMotion ? (
				<ProvinceDetailContent
					summary={summary}
					unvisitedProvince={unvisitedProvince}
					onClearSelection={onClearSelection}
				/>
			) : (
				<motion.div
					key={contentKey}
					initial={{ opacity: 0, y: 8, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
				>
					<ProvinceDetailContent
						summary={summary}
						unvisitedProvince={unvisitedProvince}
						onClearSelection={onClearSelection}
					/>
				</motion.div>
			)}
		</aside>
	)
})
