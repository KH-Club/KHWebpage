import { memo } from "react"
import { FiMaximize2, FiMinus, FiPlus } from "react-icons/fi"
import { cn } from "@/lib/utils"

interface MapControlsProps {
	onZoomIn: () => void
	onZoomOut: () => void
	onFit: () => void
	className?: string
	/** Touch-friendly 44px targets for mobile map app layout */
	touchFriendly?: boolean
}

export const MapControls = memo(function MapControls({
	onZoomIn,
	onZoomOut,
	onFit,
	className,
	touchFriendly = false,
}: MapControlsProps) {
	const controlClass = cn(
		"place-items-center rounded-xl border border-[#A7CEE5] bg-[#F6FAFC] text-[#334B5F] transition hover:border-[#2478A8] hover:text-[#2478A8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]",
		touchFriendly ? "grid h-11 w-11" : "grid h-10 w-10",
	)

	return (
		<div
			role="toolbar"
			aria-label="ตัวควบคุมแผนที่"
			className={cn(
				"absolute z-20 flex flex-col gap-2",
				touchFriendly
					? "bottom-3 right-3"
					: "bottom-20 right-3 sm:bottom-24 sm:right-5",
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
				<FiPlus className="h-5 w-5" aria-hidden />
			</button>
			<button
				type="button"
				onClick={onZoomOut}
				className={controlClass}
				aria-label="ย่อแผนที่"
				title="ย่อ"
			>
				<FiMinus className="h-5 w-5" aria-hidden />
			</button>
			<button
				type="button"
				onClick={onFit}
				className={controlClass}
				aria-label="พอดีทั้งประเทศไทย"
				title="พอดีทั้งประเทศ"
			>
				<FiMaximize2 className="h-5 w-5" aria-hidden />
			</button>
		</div>
	)
})
