import { KeyboardEvent, memo, useState } from "react"
import { provinces } from "@/assets/data/provinces"
import { cn } from "@/lib/utils"
import { visitedProvinceSummaryById } from "../data/campMapData"

interface ThailandProvinceMapProps {
	selectedProvinceId?: string
	onSelectProvince: (provinceId: string) => void
}

const unvisitedFill = "#d1d5db"
const unvisitedStroke = "#f8fafc"
const visitedFill = "#2563eb"
const selectedVisitedFill = "#1d4ed8"

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
		<div
			role="region"
			aria-labelledby="thailand-map-title"
			aria-describedby="thailand-map-desc"
			className="rounded-3xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-6"
		>
			<div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-semibold text-[#0E4F79]">แผนที่โต้ตอบ</p>
					<h2
						id="thailand-map-title"
						className="text-lg font-bold text-[#102033] sm:text-xl"
					>
						แผนที่จังหวัดที่ชมรมค่ายหอเคยไป
					</h2>
				</div>
			</div>
			<p id="thailand-map-desc" className="sr-only">
				แผนที่ประเทศไทยแบบโต้ตอบ
				จังหวัดสีน้ำเงินคือจังหวัดที่เคยไปและเลือกดูรายละเอียดได้
				จังหวัดสีเทาคือยังไม่มีข้อมูลการไปค่าย
			</p>
			<svg
				viewBox="0 0 1400 2500"
				className="mx-auto block h-[64vh] min-h-[440px] w-full sm:h-[72vh] sm:min-h-[560px] xl:h-[780px] xl:max-h-[780px]"
			>
				{provinces.map((province) => {
					const summary = visitedProvinceSummaryById.get(province.id)
					const isVisited = Boolean(summary)
					const isSelected = selectedProvinceId === province.id
					const isFocused = focusedProvinceId === province.id
					const fill = isSelected
						? selectedVisitedFill
						: isVisited
							? visitedFill
							: unvisitedFill

					return (
						<path
							key={province.id}
							d={province.path}
							fill={fill}
							stroke={isSelected || isFocused ? "#111827" : unvisitedStroke}
							strokeWidth={isSelected || isFocused ? 5 : 2}
							role={isVisited ? "button" : undefined}
							tabIndex={isVisited ? 0 : undefined}
							aria-hidden={isVisited ? undefined : true}
							aria-label={
								summary
									? `${summary.provinceName}: มีบันทึกค่าย ${summary.visitCount} ครั้ง`
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
									? `${summary.provinceName}: ${summary.visitCount} ครั้ง`
									: province.name}
							</title>
						</path>
					)
				})}
			</svg>
			<p className="mt-3 text-center text-xs text-[#64748B] sm:text-sm">
				คลิกจังหวัดสีน้ำเงินเพื่อดูรายละเอียด · กด Esc เพื่อล้างการเลือก
			</p>
		</div>
	)
})
