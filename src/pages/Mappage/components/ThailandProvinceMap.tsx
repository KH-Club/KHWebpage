import { KeyboardEvent, memo, useState } from "react"
import { provinces } from "@/assets/data/provinces"
import { cn } from "@/lib/utils"
import { mapRegions, visitedProvinceSummaryById } from "../data/campMapData"

interface ThailandProvinceMapProps {
	selectedProvinceId?: string
	onSelectProvince: (provinceId: string) => void
}

const unvisitedFill = "#d1d5db"
const unvisitedStroke = "#f8fafc"

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

export const ThailandProvinceMap = memo(function ThailandProvinceMap({
	selectedProvinceId,
	onSelectProvince,
}: ThailandProvinceMapProps) {
	const [focusedProvinceId, setFocusedProvinceId] = useState<string>()

	return (
		<div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-100 sm:p-6">
			<svg
				role="img"
				aria-labelledby="thailand-map-title thailand-map-desc"
				viewBox="0 0 1400 2500"
				className="mx-auto block h-[70vh] max-h-[760px] min-h-[420px] w-full"
			>
				<title id="thailand-map-title">Kaihor camp province map</title>
				<desc id="thailand-map-desc">
					Interactive Thailand map. Visited provinces are colored by region and
					can be selected. Unvisited provinces are gray.
				</desc>
				{provinces.map((province) => {
					const summary = visitedProvinceSummaryById.get(province.id)
					const isVisited = Boolean(summary)
					const isSelected = selectedProvinceId === province.id
					const isFocused = focusedProvinceId === province.id
					const region = summary ? mapRegions[summary.region] : undefined
					const fill = isSelected
						? region?.selectedColor
						: region?.color ?? unvisitedFill

					return (
						<path
							key={province.id}
							d={province.path}
							fill={fill}
							stroke={isSelected || isFocused ? "#111827" : unvisitedStroke}
							strokeWidth={isSelected || isFocused ? 5 : 2}
							role={isVisited ? "button" : undefined}
							tabIndex={isVisited ? 0 : undefined}
							aria-label={
								summary
									? `${summary.provinceName}: ${summary.visitCount} recorded camp visits`
									: undefined
							}
							aria-pressed={isVisited ? isSelected : undefined}
							onClick={
								isVisited ? () => onSelectProvince(province.id) : undefined
							}
							onKeyDown={
								isVisited
									? (event) =>
											handleProvinceKeyDown(
												event,
												province.id,
												onSelectProvince,
											)
									: undefined
							}
							onFocus={
								isVisited ? () => setFocusedProvinceId(province.id) : undefined
							}
							onBlur={
								isVisited ? () => setFocusedProvinceId(undefined) : undefined
							}
							className={cn(
								"transition duration-150",
								isVisited
									? "cursor-pointer hover:brightness-95 focus:outline-none"
									: "cursor-default",
							)}
						>
							<title>
								{summary
									? `${summary.provinceName}: ${summary.visitCount} visits`
									: province.name}
							</title>
						</path>
					)
				})}
			</svg>
		</div>
	)
})
