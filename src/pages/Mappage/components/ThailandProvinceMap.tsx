import {
	KeyboardEvent,
	MouseEvent,
	memo,
	useCallback,
	useEffect,
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

interface RippleState {
	id: number
	x: number
	y: number
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

function getPathCentroid(path: SVGPathElement): { x: number; y: number } | null {
	try {
		const bbox = path.getBBox()
		if (!bbox.width && !bbox.height) return null
		return {
			x: bbox.x + bbox.width / 2,
			y: bbox.y + bbox.height / 2,
		}
	} catch {
		return null
	}
}

export const ThailandProvinceMap = memo(function ThailandProvinceMap({
	selectedProvinceId,
	onSelectProvince,
	mapMode = "all",
}: ThailandProvinceMapProps) {
	const svgRef = useRef<SVGSVGElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const pathRefs = useRef(new Map<string, SVGPathElement>())
	const lastZoomedId = useRef<string | undefined>()
	const [focusedProvinceId, setFocusedProvinceId] = useState<string>()
	const [tooltip, setTooltip] = useState<ProvinceTooltipData | null>(null)
	const [ripple, setRipple] = useState<RippleState | null>(null)

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

	const triggerRipple = useCallback((provinceId: string) => {
		const path = pathRefs.current.get(provinceId)
		if (!path) return
		const center = getPathCentroid(path)
		if (!center) return
		setRipple({ id: Date.now(), x: center.x, y: center.y })
	}, [])

	const handleSelect = useCallback(
		(provinceId: string) => {
			triggerRipple(provinceId)
			onSelectProvince(provinceId)
		},
		[onSelectProvince, triggerRipple],
	)

	// Zoom when selection changes (map click or list) — cinematic focus
	useEffect(() => {
		if (!selectedProvinceId) {
			lastZoomedId.current = undefined
			return
		}
		if (lastZoomedId.current === selectedProvinceId) return

		const path = pathRefs.current.get(selectedProvinceId)
		if (!path) return

		lastZoomedId.current = selectedProvinceId
		zoomToElement(path, 64, 620)
	}, [selectedProvinceId, zoomToElement])

	useEffect(() => {
		if (!ripple) return
		const timer = window.setTimeout(() => setRipple(null), 700)
		return () => window.clearTimeout(timer)
	}, [ripple])

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
				คลิกจังหวัดเพื่อซูมและดูรายละเอียด
				จังหวัดสีน้ำเงินคือเคยไป จังหวัดสีเทาคือยังไม่เคยไป
			</p>

			<div
				ref={containerRef}
				className={cn(
					"relative overflow-hidden rounded-2xl bg-slate-50 transition-[filter] duration-300",
					selectedProvinceId && "ring-1 ring-sky-100",
				)}
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

							const modeDimmed =
								(mapMode === "visited" && !isVisited) ||
								(mapMode === "unvisited" && isVisited)
							const selectionDimmed = Boolean(
								selectedProvinceId && !isSelected,
							)
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
									strokeWidth={isSelected || isFocused ? 6 : 2}
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
										"cursor-pointer transition-[filter,opacity,stroke-width] duration-200 hover:brightness-95 focus:outline-none",
										modeDimmed && "opacity-30",
										selectionDimmed && !modeDimmed && "opacity-40",
										emphasized && "drop-shadow-sm",
										isSelected &&
											"drop-shadow-md [filter:drop-shadow(0_0_10px_rgba(37,99,235,0.55))]",
									)}
								/>
							)
						})}

						{ripple ? (
							<circle
								key={ripple.id}
								cx={ripple.x}
								cy={ripple.y}
								r={12}
								fill="none"
								stroke="#38BDF8"
								strokeWidth={10}
								className="pointer-events-none origin-center animate-map-ripple"
								style={{ transformOrigin: `${ripple.x}px ${ripple.y}px` }}
							/>
						) : null}
					</g>
				</svg>
			</div>

			<p className="mt-3 text-center text-xs text-slate-500 sm:text-sm">
				ลากเพื่อเลื่อน · เลื่อนเพื่อซูม · คลิกจังหวัดเพื่อซูมและดูรายละเอียด
			</p>
		</div>
	)
})
