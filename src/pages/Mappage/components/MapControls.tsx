import { memo } from "react"
import { FiHome, FiMaximize2, FiMinus, FiPlus } from "react-icons/fi"
import { cn } from "@/lib/utils"

interface MapControlsProps {
	onZoomIn: () => void
	onZoomOut: () => void
	onReset: () => void
	onFit: () => void
	className?: string
}

const controlClass =
	"grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"

export const MapControls = memo(function MapControls({
	onZoomIn,
	onZoomOut,
	onReset,
	onFit,
	className,
}: MapControlsProps) {
	return (
		<div
			role="toolbar"
			aria-label="ตัวควบคุมแผนที่"
			className={cn(
				"absolute right-3 top-3 z-10 flex flex-col gap-1.5 sm:right-4 sm:top-4",
				className,
			)}
		>
			<button
				type="button"
				onClick={onZoomIn}
				className={controlClass}
				aria-label="ขยายแผนที่"
				title="ขยาย"
			>
				<FiPlus className="h-4 w-4" aria-hidden />
			</button>
			<button
				type="button"
				onClick={onZoomOut}
				className={controlClass}
				aria-label="ย่อแผนที่"
				title="ย่อ"
			>
				<FiMinus className="h-4 w-4" aria-hidden />
			</button>
			<button
				type="button"
				onClick={onReset}
				className={controlClass}
				aria-label="รีเซ็ตมุมมองแผนที่"
				title="รีเซ็ต"
			>
				<FiHome className="h-4 w-4" aria-hidden />
			</button>
			<button
				type="button"
				onClick={onFit}
				className={controlClass}
				aria-label="พอดีทั้งประเทศไทย"
				title="พอดีทั้งประเทศ"
			>
				<FiMaximize2 className="h-4 w-4" aria-hidden />
			</button>
		</div>
	)
})
