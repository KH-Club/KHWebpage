import {
	KeyboardEvent,
	MouseEvent,
	memo,
	useCallback,
	useRef,
	useState,
} from "react"
import { provinces } from "@/assets/data/provinces"
import { cn } from "@/lib/utils"
import {
	getVisitFill,
	visitedProvinceSummaryById,
} from "../data/campMapData"
import { useMapViewport } from "../hooks/useMapViewport"
import { MapMode } from "../types"
import { MapControls } from "./MapControls"
import { ProvinceTooltip, ProvinceTooltipData } from "./ProvinceTooltip"

interface ThailandProvinceMapProps {
	selectedProvinceId?: string
	onSelectProvince: (provinceId: string) => void
	mapMode?: MapMode
}

const unvisitedStroke = "#f8fafc"
const selectedStroke = "#0f172a"
const selectedVisitedFill = "#1D4ED8"
const selectedUnvisitedFill = "#94A3B8"

function handleProvinceKeyDown(
	event: KeyboardEvent<SVGPathElement>,
	provinceId: string,
	onSelectProvince: (provinceId: string) => void,
) {
	if (event.key === "Enter" || event.key === " ") {
		event.preventDefault()
		onSelectProvince(provinceId)
	}
}

function resolveProvinceFill(options: {
	isVisited: boolean
	visitCount: number
	isSelected: boolean
}): string {
	const { isVisited, visitCount, isSelected } = options
	if (isSelected) {
		return isVisited ? selectedVisitedFill : selectedUnvisitedFill
	}
	if (!isVisited) return getVisitFill(0)
	return getVisitFill(visitCount)
}

export const ThailandProvinceMap = memo(function ThailandProvinceMap({
	selectedProvinceId,
	onSelectProvince,
	mapMode = "all",
}: ThailandProvinceMapProps) {
	const svgRef = useRef<SVGSVGElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const pathRefs = useRef(new Map<string, SVGPathElement>())
	const [focusedProvinceId, setFocusedProvinceId] = useState<string>()
	const [tooltip, setTooltip] = useState<ProvinceTooltipData | null>(null)

	const { contentRef, zoomIn, zoomOut, resetView, fitThailand, zoomToElement } =
		useMapViewport(svgRef)

	const setPathRef = useCallback(
		(provinceId: string, node: SVGPathElement | null) => {
			if (node) {
				pathRefs.current.set(provinceId, node)
			} else {
				pathRefs.current.delete(provinceId)
			}
		},
		[],
	)

	const handleSelect = useCallback(
		(provinceId: string) => {
			onSelectProvince(provinceId)
			const path = pathRefs.current.get(provinceId)
			if (path) {
				zoomToElement(path)
			}
		},
		[onSelectProvince, zoomToElement],
	)

	const handlePointerMove = useCallback(
		(
			event: MouseEvent<SVGPathElement>,
			provinceId: string,
			provinceName: string,
			isVisited: boolean,
			visitCount: number,
		) => {
			const container = containerRef.current
			if (!container) return
			const rect = container.getBoundingClientRect()
			setTooltip({
				provinceId,
				provinceName,
				isVisited,
				visitCount,
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
			})
		},
		[],
	)

	const clearTooltip = useCallback(() => {
		setTooltip(null)
	}, [])

	return (
		<div
			role="region"
			aria-labelledby="thailand-map-title"
			aria-describedby="thailand-map-desc"
			className="relative rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
		>
			<div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-semibold text-sky-900">แผนที่โต้ตอบ</p>
					<h2
						id="thailand-map-title"
						className="text-lg font-bold text-slate-900 sm:text-xl"
					>
						แผนที่จังหวัดที่ชมรมค่ายหอเคยไป
					</h2>
				</div>
			</div>
			<p id="thailand-map-desc" className="sr-only">
				แผนที่ประเทศไทยแบบโต้ตอบ ลากเพื่อเลื่อน เลื่อนเพื่อซูม
				คลิกจังหวัดเพื่อดูรายละเอียด
				จังหวัดสีน้ำเงินคือเคยไป จังหวัดสีเทาคือยังไม่เคยไป
			</p>

			<div
				ref={containerRef}
				className="relative overflow-hidden rounded-2xl bg-slate-50"
			>
				<MapControls
					onZoomIn={zoomIn}
					onZoomOut={zoomOut}
					onReset={resetView}
					onFit={fitThailand}
				/>
				<ProvinceTooltip data={tooltip} />

				<svg
					ref={svgRef}
					viewBox="0 0 1400 2500"
					className="mx-auto block h-[64vh] min-h-[440px] w-full cursor-grab touch-none active:cursor-grabbing sm:h-[72vh] sm:min-h-[560px] xl:h-[780px] xl:max-h-[780px]"
					onMouseLeave={clearTooltip}
				>
					<g ref={contentRef}>
						{provinces.map((province) => {
							const summary = visitedProvinceSummaryById.get(province.id)
							const isVisited = Boolean(summary)
							const visitCount = summary?.visitCount ?? 0
							const isSelected = selectedProvinceId === province.id
							const isFocused = focusedProvinceId === province.id
							const fill = resolveProvinceFill({
								isVisited,
								visitCount,
								isSelected,
							})

							// Mode-based dimming (not the only status signal)
							const dimmed =
								(mapMode === "visited" && !isVisited) ||
								(mapMode === "unvisited" && isVisited)
							const emphasized =
								(mapMode === "visited" && isVisited) ||
								(mapMode === "unvisited" && !isVisited)

							const labelName = summary?.provinceName ?? province.name
							const ariaLabel = isVisited
								? `${labelName}: เคยไปแล้ว ${visitCount} ครั้ง`
								: `${labelName}: ยังไม่เคยไป`

							return (
								<path
									key={province.id}
									ref={(node) => setPathRef(province.id, node)}
									data-province-id={province.id}
									d={province.path}
									fill={fill}
									stroke={
										isSelected || isFocused ? selectedStroke : unvisitedStroke
									}
									strokeWidth={isSelected || isFocused ? 5 : 2}
									role="button"
									tabIndex={0}
									aria-label={ariaLabel}
									aria-pressed={isSelected}
									onClick={() => handleSelect(province.id)}
									onKeyDown={(event) =>
										handleProvinceKeyDown(event, province.id, handleSelect)
									}
									onFocus={() => setFocusedProvinceId(province.id)}
									onBlur={() => setFocusedProvinceId(undefined)}
									onMouseEnter={(event) =>
										handlePointerMove(
											event,
											province.id,
											labelName,
											isVisited,
											visitCount,
										)
									}
									onMouseMove={(event) =>
										handlePointerMove(
											event,
											province.id,
											labelName,
											isVisited,
											visitCount,
										)
									}
									onMouseLeave={clearTooltip}
									className={cn(
										"cursor-pointer transition-[filter,opacity] duration-150 hover:brightness-95 focus:outline-none",
										dimmed && "opacity-30",
										emphasized && "drop-shadow-sm",
										isSelected && "drop-shadow-md",
									)}
								/>
							)
						})}
					</g>
				</svg>
			</div>

			<p className="mt-3 text-center text-xs text-slate-500 sm:text-sm">
				ลากเพื่อเลื่อน · เลื่อนเพื่อซูม · คลิกจังหวัดเพื่อดูรายละเอียด
			</p>
		</div>
	)
})
