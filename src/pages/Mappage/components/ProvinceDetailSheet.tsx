import { memo, useEffect, useState } from "react"
import { Drawer } from "vaul"
import { FiMapPin } from "react-icons/fi"
import { cn } from "@/lib/utils"
import { ProvinceSummary, UnvisitedProvinceInfo } from "../types"
import { ProvinceDetailContent } from "./ProvinceDetailContent"

/** Collapsed peek · half · near-full */
const SNAP_COLLAPSED = 0.16
const SNAP_HALF = 0.48
const SNAP_FULL = 0.9
const SNAP_POINTS = [SNAP_COLLAPSED, SNAP_HALF, SNAP_FULL] as const

interface ProvinceDetailSheetProps {
	/** Whether a province is selected (drives snap target) */
	hasSelection: boolean
	summary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	onClearSelection: () => void
}

/**
 * Always-present mobile bottom sheet with snap points.
 * Non-modal so the map stays interactive underneath.
 */
export const ProvinceDetailSheet = memo(function ProvinceDetailSheet({
	hasSelection,
	summary,
	unvisitedProvince,
	onClearSelection,
}: ProvinceDetailSheetProps) {
	const [snap, setSnap] = useState<number | string | null>(SNAP_COLLAPSED)

	// Expand to half when selecting; collapse when clearing
	useEffect(() => {
		if (hasSelection) {
			setSnap(SNAP_HALF)
		} else {
			setSnap(SNAP_COLLAPSED)
		}
	}, [hasSelection])

	const title =
		summary?.provinceName ??
		unvisitedProvince?.name ??
		"เลือกจังหวัดเพื่อดูรายละเอียด"

	return (
		<Drawer.Root
			open
			modal={false}
			dismissible={false}
			shouldScaleBackground={false}
			snapPoints={[...SNAP_POINTS]}
			activeSnapPoint={snap}
			setActiveSnapPoint={setSnap}
		>
			<Drawer.Portal>
				{/* No blocking overlay — map stays usable */}
				<Drawer.Content
					aria-describedby={undefined}
					className={cn(
						"fixed inset-x-0 bottom-0 z-50 flex h-full max-h-[92svh] flex-col outline-none",
						"rounded-t-[1.75rem] border border-slate-200/80 bg-white/95 shadow-[0_-12px_40px_-12px_rgba(15,23,42,0.25)] backdrop-blur-xl",
					)}
				>
					<div className="mx-auto mt-2.5 h-1.5 w-12 shrink-0 rounded-full bg-slate-300" />
					<Drawer.Title className="sr-only">{title}</Drawer.Title>

					{!hasSelection ? (
						<div className="flex flex-col items-center px-5 pb-6 pt-3 text-center">
							<div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-blue-600">
								<FiMapPin className="h-5 w-5" aria-hidden />
							</div>
							<p className="mt-2 text-base font-semibold text-slate-900">
								เลือกจังหวัดเพื่อดูรายละเอียด
							</p>
							<p className="mt-1 max-w-xs text-sm leading-5 text-slate-500">
								แตะจังหวัดบนแผนที่เพื่อซูมและดูประวัติค่าย
							</p>
							<p className="mt-3 text-[11px] text-slate-400">
								ลากขึ้นเพื่อขยายแผงนี้
							</p>
						</div>
					) : (
						<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
							<ProvinceDetailContent
								summary={summary}
								unvisitedProvince={unvisitedProvince}
								onClearSelection={onClearSelection}
								compact
							/>
						</div>
					)}
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	)
})
