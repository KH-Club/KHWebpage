import { memo, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface AnimatedCounterProps {
	end: number
	duration?: number
	suffix?: string
	prefix?: string
	className?: string
	labelClassName?: string
	label?: string
	sublabel?: string
}

export const AnimatedCounter = memo(function AnimatedCounter({
	end,
	duration = 2000,
	suffix = "",
	prefix = "",
	className,
	labelClassName,
	label,
	sublabel,
}: AnimatedCounterProps) {
	const [count, setCount] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	// Intersection Observer to trigger animation when visible
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.1 },
		)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => observer.disconnect()
	}, [])

	// Animate the counter
	useEffect(() => {
		if (!isVisible) return

		let startTime: number | null = null
		const startValue = 0

		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime
			const progress = Math.min((currentTime - startTime) / duration, 1)

			// Easing function for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4)
			const currentCount = Math.floor(
				startValue + (end - startValue) * easeOutQuart,
			)

			setCount(currentCount)

			if (progress < 1) {
				requestAnimationFrame(animate)
			}
		}

		requestAnimationFrame(animate)
	}, [isVisible, end, duration])

	return (
		<div ref={ref} className={cn("text-center", className)}>
			<div className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
				{prefix}
				{count}
				{suffix}
			</div>
			{label && (
				<div
					className={cn(
						"mt-1 text-lg text-white/90 sm:text-xl",
						labelClassName,
					)}
				>
					{label}
				</div>
			)}
			{sublabel && (
				<div className="mt-0.5 text-sm text-white/70">{sublabel}</div>
			)}
		</div>
	)
})

export default AnimatedCounter
