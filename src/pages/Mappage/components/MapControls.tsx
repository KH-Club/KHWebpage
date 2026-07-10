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
	"grid h-10 w-10 place-items-center rounded-2xl border border-white/50 bg-white/70 text-slate-700 shadow-md backdrop-blur-md transition hover:bg-white hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"

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
				"absolute bottom-20 right-3 z-20 flex flex-col gap-1.5 sm:bottom-24 sm:right-5",
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
