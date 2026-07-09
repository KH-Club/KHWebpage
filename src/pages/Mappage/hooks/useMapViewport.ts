import { RefObject, useCallback, useEffect, useRef } from "react"
import { select } from "d3-selection"
import {
	zoom as d3Zoom,
	zoomIdentity,
	ZoomBehavior,
	ZoomTransform,
} from "d3-zoom"
import "d3-transition"

const VIEW_WIDTH = 1400
const VIEW_HEIGHT = 2500
const MIN_SCALE = 0.85
const MAX_SCALE = 8

export interface UseMapViewportResult {
	/** Apply zoom transform to the provinces group */
	contentRef: RefObject<SVGGElement>
	zoomIn: () => void
	zoomOut: () => void
	resetView: () => void
	fitThailand: () => void
	zoomToElement: (element: SVGGraphicsElement, padding?: number) => void
}

/**
 * d3-zoom viewport for the Thailand province SVG.
 * Transform is applied directly to `contentRef` to avoid fighting React renders.
 */
export function useMapViewport(
	svgRef: RefObject<SVGSVGElement | null>,
): UseMapViewportResult {
	const contentRef = useRef<SVGGElement>(null)
	const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(
		null,
	)

	const applyTransform = useCallback((transform: ZoomTransform) => {
		if (contentRef.current) {
			select(contentRef.current).attr("transform", transform.toString())
		}
	}, [])

	const transitionTo = useCallback(
		(transform: ZoomTransform, duration = 400) => {
			const svg = svgRef.current
			const behavior = zoomBehaviorRef.current
			if (!svg || !behavior) return

			try {
				select(svg)
					.transition()
					.duration(duration)
					.call(behavior.transform, transform)
			} catch {
				// jsdom / reduced SVG environments
				select(svg).call(behavior.transform, transform)
			}
		},
		[svgRef],
	)

	useEffect(() => {
		const svg = svgRef.current
		if (!svg) return

		const behavior = d3Zoom<SVGSVGElement, unknown>()
			.scaleExtent([MIN_SCALE, MAX_SCALE])
			// Explicit extent avoids d3 reading viewBox.baseVal (broken in jsdom)
			.extent([
				[0, 0],
				[VIEW_WIDTH, VIEW_HEIGHT],
			])
			.translateExtent([
				[-VIEW_WIDTH * 0.35, -VIEW_HEIGHT * 0.15],
				[VIEW_WIDTH * 1.35, VIEW_HEIGHT * 1.15],
			])
			.clickDistance(4)
			.filter((event) => {
				if (event.type === "wheel") return true
				if ("button" in event && event.button !== 0) return false
				return !event.ctrlKey
			})
			.on("zoom", (event) => {
				applyTransform(event.transform)
			})

		const selection = select(svg)
		selection.call(behavior)

		try {
			selection.call(behavior.transform, zoomIdentity)
		} catch {
			applyTransform(zoomIdentity)
		}

		zoomBehaviorRef.current = behavior

		const onWheel = (event: WheelEvent) => {
			event.preventDefault()
		}
		svg.addEventListener("wheel", onWheel, { passive: false })

		return () => {
			svg.removeEventListener("wheel", onWheel)
			selection.on(".zoom", null)
			zoomBehaviorRef.current = null
		}
	}, [svgRef, applyTransform])

	const zoomBy = useCallback(
		(factor: number) => {
			const svg = svgRef.current
			const behavior = zoomBehaviorRef.current
			if (!svg || !behavior) return

			try {
				select(svg)
					.transition()
					.duration(220)
					.call(behavior.scaleBy, factor)
			} catch {
				select(svg).call(behavior.scaleBy, factor)
			}
		},
		[svgRef],
	)

	const zoomIn = useCallback(() => zoomBy(1.35), [zoomBy])
	const zoomOut = useCallback(() => zoomBy(1 / 1.35), [zoomBy])

	const resetView = useCallback(() => {
		transitionTo(zoomIdentity, 350)
	}, [transitionTo])

	const fitThailand = useCallback(() => {
		transitionTo(zoomIdentity, 400)
	}, [transitionTo])

	const zoomToElement = useCallback(
		(element: SVGGraphicsElement, padding = 64) => {
			const behavior = zoomBehaviorRef.current
			if (!behavior) return

			let bbox: DOMRect | SVGRect
			try {
				bbox = element.getBBox()
			} catch {
				return
			}
			if (!bbox.width || !bbox.height) return

			const scaleX = VIEW_WIDTH / (bbox.width + padding * 2)
			const scaleY = VIEW_HEIGHT / (bbox.height + padding * 2)
			const scale = Math.max(
				MIN_SCALE,
				Math.min(Math.min(scaleX, scaleY), 4.5),
			)

			const cx = bbox.x + bbox.width / 2
			const cy = bbox.y + bbox.height / 2
			const transform = zoomIdentity
				.translate(VIEW_WIDTH / 2, VIEW_HEIGHT / 2)
				.scale(scale)
				.translate(-cx, -cy)

			transitionTo(transform, 550)
		},
		[transitionTo],
	)

	return {
		contentRef,
		zoomIn,
		zoomOut,
		resetView,
		fitThailand,
		zoomToElement,
	}
}
