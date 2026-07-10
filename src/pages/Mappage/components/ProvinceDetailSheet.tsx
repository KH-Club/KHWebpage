import { memo } from "react"
import { Drawer } from "vaul"
import { ProvinceSummary, UnvisitedProvinceInfo } from "../types"
import { ProvinceDetailContent } from "./ProvinceDetailContent"

interface ProvinceDetailSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	summary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	onClearSelection: () => void
}

/**
 * Mobile/tablet bottom sheet for province details (Vaul).
 * Focus trap, Esc, and backdrop dismiss are handled by the drawer.
 */
export const ProvinceDetailSheet = memo(function ProvinceDetailSheet({
	open,
	onOpenChange,
	summary,
	unvisitedProvince,
	onClearSelection,
}: ProvinceDetailSheetProps) {
	return (
		<Drawer.Root
			open={open}
			onOpenChange={onOpenChange}
			shouldScaleBackground={false}
		>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px]" />
				<Drawer.Content
					aria-describedby={undefined}
					className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88vh] flex-col rounded-t-[1.75rem] border border-slate-200 bg-white shadow-2xl outline-none"
				>
					<div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-slate-300" />
					<Drawer.Title className="sr-only">
						{summary?.provinceName ??
							unvisitedProvince?.name ??
							"รายละเอียดจังหวัด"}
					</Drawer.Title>
					<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
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
