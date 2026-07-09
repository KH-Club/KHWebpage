import { memo } from "react"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { MapMode, MapStats } from "../types"

interface MapHeroProps {
	stats: MapStats
	mapMode: MapMode
	onMapModeChange: (mode: MapMode) => void
	onExploreMap?: () => void
}

const modeChips: { mode: MapMode; label: string }[] = [
	{ mode: "all", label: "ทั้งหมด" },
	{ mode: "visited", label: "สำรวจจังหวัดที่เคยไป" },
	{ mode: "unvisited", label: "แสดงจังหวัดที่ยังไม่เคยไป" },
]

const heroBackgroundStyle = {
	background:
		"linear-gradient(145deg, #F6FAFC 0%, #DCEFF7 42%, #E8F4FA 70%, #F6FAFC 100%)",
} as const

const progressRingCircumference = 2 * Math.PI * 40

export const MapHero = memo(function MapHero({
	stats,
	mapMode,
	onMapModeChange,
	onExploreMap,
}: MapHeroProps) {
	const {
		visitedCount,
		campRecords,
		totalProvinces,
		unvisitedCount,
		explorePercent,
	} = stats

	const progressOffset =
		progressRingCircumference * (1 - explorePercent / 100)

	return (
		<section
			aria-labelledby="map-hero-heading"
			className="relative overflow-hidden border-b border-sky-100"
			style={heroBackgroundStyle}
		>
			{/* Soft map / pin decoration */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				<div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
				<div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-sky-600/10 blur-3xl" />
				<MapPin className="absolute right-8 top-10 h-24 w-24 text-slate-800/10 sm:right-16 sm:top-14 sm:h-32 sm:w-32" />
				<svg
					className="absolute bottom-0 right-0 h-40 w-40 text-slate-800/10 sm:h-52 sm:w-52"
					viewBox="0 0 100 100"
					fill="none"
					aria-hidden
				>
					<path
						d="M20 70 Q35 40 50 55 T80 35"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeDasharray="4 6"
					/>
					<circle cx="80" cy="35" r="4" fill="currentColor" />
				</svg>
			</div>

			<div className="container relative mx-auto px-6 py-10 sm:py-14">
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl">
						<p className="text-sm font-semibold text-sky-900">
							แผนที่ความทรงจำค่ายหอ
						</p>
						<h1
							id="map-hero-heading"
							className="mt-3 text-balance text-4xl font-bold text-slate-900 sm:text-5xl"
						>
							แผนที่ความทรงจำค่ายอาสา
						</h1>
						<p className="mt-2 text-lg font-medium text-sky-700 sm:text-xl">
							Thailand Volunteer Camp Journey
						</p>
						<p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
							ร่องรอยค่ายอาสาของชมรมค่ายหอทั่วประเทศไทย — จังหวัดสีน้ำเงินคือ
							เคยมีบันทึกค่าย ส่วนสีเทาคือยังรอเรื่องราวครั้งแรก
						</p>

						<ul className="mt-6 space-y-2 text-base leading-7 text-slate-900 sm:text-lg">
							<li>
								<span className="font-semibold text-sky-900">
									{visitedCount} จังหวัด
								</span>{" "}
								ที่มีความทรงจำ
							</li>
							<li>
								<span className="font-semibold text-sky-900">
									{campRecords} ค่ายอาสา
								</span>{" "}
								ที่บันทึกไว้ทั่วไทย
							</li>
							<li>
								<span className="font-semibold text-amber-700">
									{unvisitedCount} จังหวัด
								</span>{" "}
								ที่ยังรอเรื่องราวครั้งแรก
							</li>
						</ul>
					</div>

					{/* Progress ring */}
					<div className="flex shrink-0 flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
						<div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-sm">
							<div
								className="relative grid h-24 w-24 place-items-center"
								role="img"
								aria-label={`สำรวจแล้ว ${explorePercent} เปอร์เซ็นต์ ของจังหวัดทั้งหมด`}
							>
								<svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
									<circle
										cx="48"
										cy="48"
										r="40"
										fill="none"
										stroke="#E5E8EA"
										strokeWidth="8"
									/>
									<circle
										cx="48"
										cy="48"
										r="40"
										fill="none"
										stroke="#B7792E"
										strokeWidth="8"
										strokeLinecap="round"
										strokeDasharray={progressRingCircumference}
										strokeDashoffset={progressOffset}
									/>
								</svg>
								<div className="absolute inset-0 flex flex-col items-center justify-center">
									<span className="text-xl font-bold tabular-nums text-slate-900">
										{explorePercent}%
									</span>
									<span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
										explored
									</span>
								</div>
							</div>
							<div>
								<p className="text-2xl font-bold tabular-nums text-slate-900">
									{visitedCount}
									<span className="text-base font-semibold text-slate-500">
										{" "}
										/ {totalProvinces}
									</span>
								</p>
								<p className="mt-0.5 text-sm font-medium text-slate-600">
									จังหวัดที่เคยไปแล้ว
								</p>
								<div
									className="mt-3 h-2 w-36 overflow-hidden rounded-full bg-slate-200"
									role="progressbar"
									aria-valuenow={visitedCount}
									aria-valuemin={0}
									aria-valuemax={totalProvinces}
									aria-label="ความคืบหน้าจังหวัดที่เคยไป"
								>
									<div
										className="h-full rounded-full bg-sky-700 transition-all duration-500"
										style={{ width: `${explorePercent}%` }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mode chips */}
				<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
					<div
						role="group"
						aria-label="ตัวกรองมุมมองแผนที่"
						className="flex flex-wrap gap-2"
					>
						{modeChips.map(({ mode, label }) => {
							const isActive = mapMode === mode
							return (
								<button
									key={mode}
									type="button"
									onClick={() => {
										onMapModeChange(mode)
										onExploreMap?.()
									}}
									aria-pressed={isActive}
									className={cn(
										"rounded-full border px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2",
										isActive
											? "border-sky-900 bg-sky-900 text-white shadow-sm"
											: "border-slate-200 bg-white/90 text-slate-900 hover:border-sky-300 hover:bg-white",
									)}
								>
									{label}
								</button>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
})
