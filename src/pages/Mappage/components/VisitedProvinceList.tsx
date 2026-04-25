import { memo } from "react"
import { cn } from "@/lib/utils"
import { ProvinceSummary } from "../types"

interface VisitedProvinceListProps {
	summaries: ProvinceSummary[]
	selectedProvinceId?: string
	onSelectProvince: (provinceId: string) => void
}

export const VisitedProvinceList = memo(function VisitedProvinceList({
	summaries,
	selectedProvinceId,
	onSelectProvince,
}: VisitedProvinceListProps) {
	return (
		<section
			aria-labelledby="visited-provinces-heading"
			aria-label="รายชื่อจังหวัดที่เคยไปแล้ว"
			className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-gray-100"
		>
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
						จังหวัดที่เคยไปแล้ว
					</p>
					<h2
						id="visited-provinces-heading"
						className="text-2xl font-bold text-gray-900"
					>
						เลือกจังหวัดเพื่อดูรายละเอียด
					</h2>
				</div>
				<p className="text-sm text-gray-500">
					{summaries.length} จังหวัดที่เคยไปแล้ว
				</p>
			</div>

			<div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
				{summaries.map((summary) => {
					const isSelected = selectedProvinceId === summary.provinceId

					return (
						<button
							key={summary.provinceId}
							type="button"
							onClick={() => onSelectProvince(summary.provinceId)}
							aria-label={`เลือกจังหวัด ${summary.provinceName} จากรายชื่อจังหวัดที่เคยไปแล้ว มีบันทึกค่าย ${summary.visitCount} ครั้ง`}
							className={cn(
								"flex min-h-24 flex-col gap-3 rounded-xl border px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:flex-row sm:items-center sm:justify-between",
								isSelected
									? "border-blue-700 bg-blue-700 text-white shadow-md"
									: "border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50",
							)}
							aria-pressed={isSelected}
						>
							<span className="min-w-0">
								<span className="block text-lg font-semibold">
									{summary.provinceName}
								</span>
								<span
									className={cn(
										"mt-1 block text-sm sm:line-clamp-2",
										isSelected ? "text-blue-50" : "text-gray-500",
									)}
								>
									ล่าสุด: #{summary.latestVisit.campID}{" "}
									{summary.latestVisit.name}
								</span>
							</span>
							<span
								className={cn(
									"inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
									isSelected
										? "bg-white text-blue-700"
										: "bg-blue-100 text-blue-800",
								)}
							>
								{summary.visitCount} ครั้ง
							</span>
						</button>
					)
				})}
			</div>
		</section>
	)
})
