import { memo } from "react"
import { Drawer } from "vaul"
import { cn } from "@/lib/utils"
import { ProvinceSummary, UnvisitedProvinceInfo } from "../types"
import { ProvinceDetailContent } from "./ProvinceDetailContent"

interface ProvinceDetailSheetProps {
	/** Whether a province is selected (drives snap target) */
	hasSelection: boolean
	summary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	onClearSelection: () => void
}

/** Mobile story sheet with a visible-height scroll container. */
export const ProvinceDetailSheet = memo(function ProvinceDetailSheet({
	hasSelection,
	summary,
	unvisitedProvince,
	onClearSelection,
}: ProvinceDetailSheetProps) {
	const title =
		summary?.provinceName ??
		unvisitedProvince?.name ??
		"เลือกจังหวัดเพื่อดูรายละเอียด"

	return (
		<Drawer.Root
			open={hasSelection}
			onOpenChange={(open) => {
				if (!open) onClearSelection()
			}}
			modal={false}
			dismissible
			shouldScaleBackground={false}
		>
			<Drawer.Portal>
				<Drawer.Content
					aria-describedby={undefined}
					className={cn(
						"fixed inset-x-0 bottom-0 z-50 flex h-[78svh] max-h-[42rem] flex-col outline-none",
						"rounded-t-[28px] border-t border-white/90 bg-white/[0.94] shadow-[0_-6px_8px_-6px_rgba(16,32,51,0.2)] backdrop-blur-md",
					)}
				>
					<div className="mx-auto mt-2.5 h-1.5 w-12 shrink-0 rounded-full bg-slate-300" />
					<Drawer.Title className="sr-only">{title}</Drawer.Title>

					<div
						data-vaul-no-drag
						className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
					>
						<ProvinceDetailContent
							summary={summary}
							unvisitedProvince={unvisitedProvince}
							onClearSelection={onClearSelection}
							compact
						/>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	)
})
