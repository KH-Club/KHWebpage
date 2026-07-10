import { memo } from "react"
import { Maximize2, Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MapControlsProps {
	onZoomIn: () => void
	onZoomOut: () => void
	onFit: () => void
	className?: string
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
		"grid place-items-center rounded-full border border-white/85 bg-white/[0.78] text-[#334B5F] shadow-[0_4px_8px_-4px_rgba(16,32,51,0.24)] backdrop-blur-md transition-[transform,color,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#69B7D9] hover:bg-white hover:text-[#2478A8] active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]",
		touchFriendly ? "h-11 w-11" : "h-10 w-10",
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
				<Plus className="h-5 w-5" strokeWidth={1.8} aria-hidden />
			</button>
			<button
				type="button"
				onClick={onZoomOut}
				className={controlClass}
				aria-label="ย่อแผนที่"
				title="ย่อ"
			>
				<Minus className="h-5 w-5" strokeWidth={1.8} aria-hidden />
			</button>
			<button
				type="button"
				onClick={onFit}
				className={controlClass}
				aria-label="พอดีทั้งประเทศไทย"
				title="พอดีทั้งประเทศ"
			>
				<Maximize2 className="h-5 w-5" strokeWidth={1.8} aria-hidden />
			</button>
		</div>
	)
})
