import { memo, useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MapMode, MapStats } from "../types"

interface MapStageHeroProps {
	stats: MapStats
	mapMode: MapMode
	onMapModeChange: (mode: MapMode) => void
	className?: string
}

const modeChips: { mode: MapMode; label: string }[] = [
	{ mode: "all", label: "ทั้งหมด" },
	{ mode: "visited", label: "เคยไปแล้ว" },
	{ mode: "unvisited", label: "ยังไม่เคยไป" },
]

function useCountUpProgress(reduceMotion: boolean | null): number {
	const [progress, setProgress] = useState(reduceMotion ? 1 : 0)

	useEffect(() => {
		if (reduceMotion) {
			setProgress(1)
			return
		}

		let frame = 0
		const startedAt = performance.now()
		const duration = 850
		const tick = (now: number) => {
			const elapsed = Math.min((now - startedAt) / duration, 1)
			setProgress(1 - Math.pow(1 - elapsed, 4))
			if (elapsed < 1) frame = window.requestAnimationFrame(tick)
		}

		frame = window.requestAnimationFrame(tick)
		return () => window.cancelAnimationFrame(frame)
	}, [reduceMotion])

	return progress
}

export const MapStageHero = memo(function MapStageHero({
	stats,
	mapMode,
	onMapModeChange,
	className,
}: MapStageHeroProps) {
	const { visitedCount, campRecords, totalProvinces, explorePercent } = stats
	const reduceMotion = useReducedMotion()
	const countProgress = useCountUpProgress(reduceMotion)
	const animatedVisited = Math.round(visitedCount * countProgress)
	const animatedCamps = Math.round(campRecords * countProgress)
	const animatedPercent = Math.round(explorePercent * countProgress)

	return (
		<div
			className={cn(
				"pointer-events-none absolute left-0 top-0 z-20 flex h-full w-[min(38rem,42vw)] items-start px-8 py-[clamp(3rem,9vh,7rem)] xl:px-14",
				className,
			)}
		>
			<motion.div
				className="pointer-events-auto max-w-md"
				initial={reduceMotion ? false : { opacity: 0.7, y: 14 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			>
				<motion.p
					className="inline-flex items-center gap-2 text-sm font-semibold text-[#2478A8]"
					initial={reduceMotion ? false : { opacity: 0.55, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
				>
					<MapPin className="h-4 w-4" strokeWidth={1.8} aria-hidden />
					แผนที่ความทรงจำ
				</motion.p>

				<motion.h1
					id="map-hero-heading"
					aria-label="ร่องรอยค่ายหอทั่วไทย"
					className="mt-3 text-balance text-[clamp(2.75rem,4.3vw,4.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#102033]"
					initial={reduceMotion ? false : { opacity: 0.65, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						delay: 0.1,
						ease: [0.22, 1, 0.36, 1],
					}}
				>
					ร่องรอย<span className="whitespace-nowrap">ค่ายหอ</span>ทั่วไทย
				</motion.h1>

				<motion.p
					className="mt-5 max-w-[34rem] text-lg leading-8 text-[#334B5F]"
					initial={reduceMotion ? false : { opacity: 0.65, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.5,
						delay: 0.2,
						ease: [0.22, 1, 0.36, 1],
					}}
				>
					{campRecords} ค่ายอาสาใน {visitedCount} จังหวัด บันทึกเส้นทาง
					การลงมือทำ และผู้คนที่เราได้พบ
				</motion.p>

				<div className="mt-8 border-y border-[#A7CEE5] py-4">
					<p className="font-semibold tabular-nums text-[#102033]">
						{animatedVisited} จังหวัด
						<span className="mx-3 text-[#69B7D9]" aria-hidden>
							·
						</span>
						{animatedCamps} ค่าย
						<span className="mx-3 text-[#69B7D9]" aria-hidden>
							·
						</span>
						{animatedPercent}% ของประเทศไทย
					</p>
					<div
						className="mt-3 h-1 overflow-hidden bg-white"
						role="progressbar"
						aria-valuenow={visitedCount}
						aria-valuemin={0}
						aria-valuemax={totalProvinces}
						aria-label="ความคืบหน้าจังหวัดที่เคยไป"
					>
						<motion.div
							className="h-full bg-[#2478A8]"
							initial={reduceMotion ? false : { width: 0 }}
							animate={{ width: `${explorePercent}%` }}
							transition={{
								duration: 0.8,
								delay: 0.25,
								ease: [0.22, 1, 0.36, 1],
							}}
						/>
					</div>
				</div>

				<div
					role="group"
					aria-label="ตัวกรองมุมมองแผนที่"
					className="mt-7 flex border-b border-[#A7CEE5]"
				>
					{modeChips.map(({ mode, label }) => {
						const isActive = mapMode === mode
						return (
							<button
								key={mode}
								type="button"
								onClick={() => onMapModeChange(mode)}
								aria-pressed={isActive}
								className={cn(
									"relative min-h-11 px-4 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] active:scale-[0.97]",
									isActive
										? "text-[#0E4F79]"
										: "text-[#526A7C] hover:text-[#102033]",
								)}
							>
								{label}
								{isActive ? (
									<motion.span
										layoutId="hero-map-filter"
										className="absolute inset-x-2 bottom-[-1px] h-1 bg-[#2478A8] shadow-[0_0_8px_rgba(36,120,168,0.35)]"
									/>
								) : null}
							</button>
						)
					})}
				</div>
			</motion.div>
		</div>
	)
})
