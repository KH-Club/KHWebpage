import { memo } from "react"
import { cn } from "@/lib/utils"

export interface ScrollIndicatorProps {
	className?: string
	text?: string
}

export const ScrollIndicator = memo(function ScrollIndicator({
	className,
	text = "Scroll to explore",
}: ScrollIndicatorProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center gap-2 text-white/80",
				className,
			)}
		>
			<span className="text-xs uppercase tracking-widest sm:text-sm">
				{text}
			</span>
			<div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1">
				<div className="h-2 w-1 animate-bounce rounded-full bg-white/80" />
			</div>
		</div>
	)
})

export default ScrollIndicator
