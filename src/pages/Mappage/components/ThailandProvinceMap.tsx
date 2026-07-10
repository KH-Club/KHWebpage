import {
	KeyboardEvent,
	MouseEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"
import { MousePointer2 } from "lucide-react"
import { provinces } from "@/assets/data/provinces"
import { cn } from "@/lib/utils"
import { getVisitFill, visitedProvinceSummaryById } from "../data/campMapData"
import { useMapViewport } from "../hooks/useMapViewport"
import { MapMode, ProvinceSummary, UnvisitedProvinceInfo } from "../types"
import { MapControls } from "./MapControls"
import { MapCalloutPosition, ProvinceMapCallout } from "./ProvinceMapCallout"
import { ProvinceTooltip, ProvinceTooltipData } from "./ProvinceTooltip"

interface ThailandProvinceMapProps {
	selectedProvinceId?: string
	onSelectProvince: (provinceId: string) => void
	selectedSummary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	onClearSelection: () => void
	mapMode?: MapMode
	/** Borderless full-bleed map for the immersive stage */
	immersive?: boolean
	/** Mobile map-app layout: fixed height, 44px controls */
	mobileApp?: boolean
	className?: string
}

interface RippleState {
	id: number
	x: number
	y: number
}

const unvisitedStroke = "#f1f5f9"
const selectedStroke = "#FFFFFF"
const selectedVisitedFill = "#0E5FBA"
const selectedUnvisitedFill = "#2563EB"
const CALLOUT_GAP = 26
const CALLOUT_PADDING = 16
const DEFAULT_CALLOUT_WIDTH = 320
const DEFAULT_CALLOUT_HEIGHT = 390

function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), Math.max(min, max))
}

function roundHalf(value: number): number {
	return Math.round(value * 2) / 2
}

function resolveCalloutPosition(options: {
	anchorX: number
	anchorY: number
	containerWidth: number
	containerHeight: number
	cardWidth: number
	cardHeight: number
}): MapCalloutPosition {
	const {
		anchorX,
		anchorY,
		containerWidth,
		containerHeight,
		cardWidth,
		cardHeight,
	} = options
	const availableRight = containerWidth - anchorX - CALLOUT_PADDING
	const availableLeft = anchorX - CALLOUT_PADDING
	const availableBelow = containerHeight - anchorY - CALLOUT_PADDING
	const availableAbove = anchorY - CALLOUT_PADDING

	let placement: MapCalloutPosition["placement"]
	if (anchorX > containerWidth * 0.7) {
		placement = "left"
	} else if (anchorX < containerWidth * 0.3) {
		placement = "right"
	} else if (anchorY < containerHeight * 0.25) {
		placement = "bottom"
	} else if (anchorY > containerHeight * 0.75) {
		placement = "top"
	} else if (availableRight >= cardWidth + CALLOUT_GAP) {
		placement = "right"
	} else if (availableLeft >= cardWidth + CALLOUT_GAP) {
		placement = "left"
	} else {
		placement = availableBelow >= availableAbove ? "bottom" : "top"
	}

	let cardX = anchorX + CALLOUT_GAP
	let cardY = anchorY - cardHeight / 2

	if (placement === "left") {
		cardX = anchorX - cardWidth - CALLOUT_GAP
	} else if (placement === "bottom") {
		cardX = anchorX - cardWidth / 2
		cardY = anchorY + CALLOUT_GAP
	} else if (placement === "top") {
		cardX = anchorX - cardWidth / 2
		cardY = anchorY - cardHeight - CALLOUT_GAP
	}

	cardX = clamp(
		cardX,
		CALLOUT_PADDING,
		containerWidth - cardWidth - CALLOUT_PADDING,
	)
	cardY = clamp(
		cardY,
		CALLOUT_PADDING,
		containerHeight - cardHeight - CALLOUT_PADDING,
	)

	let connectorX = cardX
	let connectorY = clamp(anchorY, cardY + 26, cardY + cardHeight - 26)
	if (placement === "left") {
		connectorX = cardX + cardWidth
	} else if (placement === "bottom") {
		connectorX = clamp(anchorX, cardX + 28, cardX + cardWidth - 28)
		connectorY = cardY
	} else if (placement === "top") {
		connectorX = clamp(anchorX, cardX + 28, cardX + cardWidth - 28)
		connectorY = cardY + cardHeight
	}

	return {
		anchorX: roundHalf(anchorX),
		anchorY: roundHalf(anchorY),
		cardX: roundHalf(cardX),
		cardY: roundHalf(cardY),
		cardWidth: roundHalf(cardWidth),
		cardHeight: roundHalf(cardHeight),
		connectorX: roundHalf(connectorX),
		connectorY: roundHalf(connectorY),
		placement,
	}
}

function positionsMatch(
	previous: MapCalloutPosition | null,
	next: MapCalloutPosition,
): boolean {
	return Boolean(
		previous &&
			previous.anchorX === next.anchorX &&
			previous.anchorY === next.anchorY &&
			previous.cardX === next.cardX &&
			previous.cardY === next.cardY &&
			previous.cardWidth === next.cardWidth &&
			previous.cardHeight === next.cardHeight &&
			previous.placement === next.placement,
	)
}

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

function getPathCentroid(
	path: SVGPathElement,
): { x: number; y: number } | null {
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
	selectedSummary,
	unvisitedProvince,
	onClearSelection,
	mapMode = "all",
	immersive = false,
	mobileApp = false,
	className,
}: ThailandProvinceMapProps) {
	const svgRef = useRef<SVGSVGElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const calloutRef = useRef<HTMLDivElement>(null)
	const pathRefs = useRef(new Map<string, SVGPathElement>())
	const lastZoomedId = useRef<string | undefined>()
	const positionFrameRef = useRef<number>()
	const [focusedProvinceId, setFocusedProvinceId] = useState<string>()
	const [tooltip, setTooltip] = useState<ProvinceTooltipData | null>(null)
	const [ripple, setRipple] = useState<RippleState | null>(null)
	const [calloutPosition, setCalloutPosition] =
		useState<MapCalloutPosition | null>(null)

	const updateCalloutPosition = useCallback(() => {
		if (mobileApp || !selectedProvinceId) {
			setCalloutPosition(null)
			return
		}

		const path = pathRefs.current.get(selectedProvinceId)
		const container = containerRef.current
		const svg = svgRef.current
		if (!path || !container || !svg) return

		const center = getPathCentroid(path)
		const containerRect = container.getBoundingClientRect()
		const containerWidth =
			containerRect.width || container.clientWidth || window.innerWidth || 1280
		const containerHeight =
			containerRect.height ||
			container.clientHeight ||
			window.innerHeight ||
			760
		let anchorX = containerWidth / 2
		let anchorY = containerHeight / 2

		const matrix =
			typeof path.getScreenCTM === "function" ? path.getScreenCTM() : null
		if (center && matrix && typeof svg.createSVGPoint === "function") {
			const point = svg.createSVGPoint()
			point.x = center.x
			point.y = center.y
			const screenPoint = point.matrixTransform(matrix)
			anchorX = screenPoint.x - containerRect.left
			anchorY = screenPoint.y - containerRect.top
		} else {
			const pathRect = path.getBoundingClientRect()
			if (pathRect.width || pathRect.height) {
				anchorX = pathRect.left + pathRect.width / 2 - containerRect.left
				anchorY = pathRect.top + pathRect.height / 2 - containerRect.top
			}
		}

		const measuredCard = calloutRef.current?.getBoundingClientRect()
		const cardWidth = Math.min(
			measuredCard?.width || DEFAULT_CALLOUT_WIDTH,
			containerWidth - CALLOUT_PADDING * 2,
		)
		const cardHeight = Math.min(
			measuredCard?.height || DEFAULT_CALLOUT_HEIGHT,
			containerHeight - CALLOUT_PADDING * 2,
		)
		const next = resolveCalloutPosition({
			anchorX,
			anchorY,
			containerWidth,
			containerHeight,
			cardWidth,
			cardHeight,
		})

		setCalloutPosition((previous) =>
			positionsMatch(previous, next) ? previous : next,
		)
	}, [mobileApp, selectedProvinceId])

	const scheduleCalloutPosition = useCallback(() => {
		if (positionFrameRef.current) {
			window.cancelAnimationFrame(positionFrameRef.current)
		}
		positionFrameRef.current = window.requestAnimationFrame(() => {
			positionFrameRef.current = undefined
			updateCalloutPosition()
		})
	}, [updateCalloutPosition])

	const { contentRef, zoomIn, zoomOut, fitThailand, zoomToElement } =
		useMapViewport(svgRef, scheduleCalloutPosition)

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
			setTooltip(null)
			onSelectProvince(provinceId)
		},
		[onSelectProvince, triggerRipple],
	)

	useEffect(() => {
		if (!selectedProvinceId) {
			lastZoomedId.current = undefined
			return
		}
		if (lastZoomedId.current === selectedProvinceId) return

		const path = pathRefs.current.get(selectedProvinceId)
		if (!path) return

		lastZoomedId.current = selectedProvinceId
		zoomToElement(path, 180, 480)
		scheduleCalloutPosition()
	}, [selectedProvinceId, scheduleCalloutPosition, zoomToElement])

	useEffect(() => {
		if (!selectedProvinceId || mobileApp) {
			setCalloutPosition(null)
			return
		}

		scheduleCalloutPosition()
		const observer =
			typeof ResizeObserver === "function"
				? new ResizeObserver(scheduleCalloutPosition)
				: null
		if (containerRef.current) observer?.observe(containerRef.current)
		if (calloutRef.current) observer?.observe(calloutRef.current)
		window.addEventListener("resize", scheduleCalloutPosition)

		return () => {
			observer?.disconnect()
			window.removeEventListener("resize", scheduleCalloutPosition)
		}
	}, [mobileApp, scheduleCalloutPosition, selectedProvinceId])

	useEffect(
		() => () => {
			if (positionFrameRef.current) {
				window.cancelAnimationFrame(positionFrameRef.current)
			}
		},
		[],
	)

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

	const handleMapBackgroundClick = useCallback(
		(event: MouseEvent<SVGSVGElement>) => {
			if (event.target === event.currentTarget) {
				onClearSelection()
			}
		},
		[onClearSelection],
	)

	return (
		<div
			role="region"
			aria-labelledby="thailand-map-title"
			aria-describedby="thailand-map-desc"
			className={cn(
				"relative",
				immersive ? "h-full w-full" : "h-full w-full",
				className,
			)}
		>
			<h2 id="thailand-map-title" className="sr-only">
				แผนที่จังหวัดที่ชมรมค่ายหอเคยไป
			</h2>
			<p id="thailand-map-desc" className="sr-only">
				แผนที่ประเทศไทยแบบโต้ตอบ ลากเพื่อเลื่อน เลื่อนเพื่อซูม
				คลิกจังหวัดเพื่อซูมและดูรายละเอียด จังหวัดสีน้ำเงินคือเคยไป
				จังหวัดสีเทาคือยังไม่เคยไป
			</p>

			<div
				ref={containerRef}
				className={cn(
					"relative h-full overflow-hidden transition-[filter] duration-300",
					immersive ? "bg-transparent" : "bg-[#EAF5FF]",
				)}
			>
				<MapControls
					onZoomIn={zoomIn}
					onZoomOut={zoomOut}
					onFit={fitThailand}
					touchFriendly={mobileApp}
				/>
				<ProvinceTooltip data={selectedProvinceId ? null : tooltip} />

				<svg
					ref={svgRef}
					viewBox="0 0 1400 2500"
					className={cn(
						"mx-auto block w-full cursor-grab touch-pan-y transition-transform duration-500 ease-out active:cursor-grabbing",
						immersive &&
							(selectedProvinceId ? "translate-x-0" : "translate-x-[11vw]"),
						mobileApp
							? "h-[64svh] max-h-[620px] min-h-[500px]"
							: immersive
								? "h-[calc(100svh-4rem)] min-h-[680px]"
								: "h-[64vh] min-h-[440px] sm:h-[72vh] sm:min-h-[560px] xl:h-[780px] xl:max-h-[780px]",
					)}
					onMouseLeave={clearTooltip}
					onClick={handleMapBackgroundClick}
					onTransitionEnd={scheduleCalloutPosition}
				>
					<g ref={contentRef}>
						{provinces.map((province, index) => {
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
							const selectionDimmed = Boolean(selectedProvinceId && !isSelected)
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
									onClick={(event) => {
										event.stopPropagation()
										handleSelect(province.id)
									}}
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
										"map-province-reveal cursor-pointer transition-[filter,opacity,stroke-width] duration-200 hover:brightness-110 hover:drop-shadow-md focus:outline-none",
										modeDimmed && "opacity-30",
										selectionDimmed && !modeDimmed && "opacity-40",
										emphasized && "drop-shadow-sm",
										isSelected && "map-province-selected",
									)}
									style={{ animationDelay: `${Math.min(index * 12, 720)}ms` }}
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
								stroke="#60A5FA"
								strokeWidth={10}
								className="pointer-events-none origin-center animate-map-ripple"
								style={{ transformOrigin: `${ripple.x}px ${ripple.y}px` }}
							/>
						) : null}
					</g>
				</svg>

				{!mobileApp && calloutPosition ? (
					<svg
						aria-hidden
						className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible"
					>
						<line
							x1={calloutPosition.anchorX}
							y1={calloutPosition.anchorY}
							x2={calloutPosition.connectorX}
							y2={calloutPosition.connectorY}
							stroke="rgba(14,95,154,0.58)"
							strokeWidth="1.5"
							strokeDasharray="3 4"
						/>
						<circle
							cx={calloutPosition.anchorX}
							cy={calloutPosition.anchorY}
							r="4.5"
							fill="#FFFFFF"
							stroke="#0E5F9A"
							strokeWidth="2"
						/>
					</svg>
				) : null}

				{!mobileApp ? (
					<ProvinceMapCallout
						summary={selectedSummary}
						unvisitedProvince={unvisitedProvince}
						position={calloutPosition}
						cardRef={calloutRef}
						onClearSelection={onClearSelection}
						onLayoutChange={scheduleCalloutPosition}
					/>
				) : null}

				{mobileApp ? (
					<p className="pointer-events-none absolute bottom-3 left-4 z-10 max-w-[55%] text-left text-[10px] leading-4 text-[#526A7C]">
						แตะจังหวัด · ใช้ปุ่มเพื่อซูม
					</p>
				) : immersive ? (
					<p className="pointer-events-none absolute bottom-3 left-1/2 z-10 inline-flex w-[min(100%-2rem,31rem)] -translate-x-1/2 items-center justify-center gap-1.5 text-center text-[11px] text-slate-500 sm:bottom-4 sm:text-xs">
						<MousePointer2
							className="h-3.5 w-3.5"
							strokeWidth={1.7}
							aria-hidden
						/>
						ลากเพื่อเลื่อน · ใช้ปุ่มเพื่อซูม · คลิกจังหวัดเพื่ออ่านเรื่องราว
					</p>
				) : (
					<p className="mt-3 inline-flex items-center justify-center gap-1.5 text-center text-xs text-slate-500 sm:text-sm">
						<MousePointer2
							className="h-3.5 w-3.5"
							strokeWidth={1.7}
							aria-hidden
						/>
						ลากเพื่อเลื่อน · ใช้ปุ่มเพื่อซูม · คลิกจังหวัดเพื่อดูรายละเอียด
					</p>
				)}
			</div>
		</div>
	)
})
