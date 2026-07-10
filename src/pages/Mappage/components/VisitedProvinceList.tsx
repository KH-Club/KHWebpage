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
			className="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-sm sm:p-6"
		>
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-semibold text-[#0E4F79]">
						จังหวัดที่เคยไปแล้ว
					</p>
					<h2
						id="visited-provinces-heading"
						className="text-2xl font-bold text-[#102033]"
					>
						เลือกจังหวัดเพื่อดูรายละเอียด
					</h2>
				</div>
				<p className="text-sm text-[#64748B]">
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
								"flex min-h-24 flex-col gap-3 rounded-2xl border px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:justify-between",
								isSelected
									? "border-[#0E4F79] bg-[#0E4F79] text-white shadow-md"
									: "border-[#E2E8F0] bg-white text-[#102033] hover:border-[#93C5FD] hover:bg-[#EFF6FF]",
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
										isSelected ? "text-white/85" : "text-[#64748B]",
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
										? "bg-white text-[#0E4F79]"
										: "bg-[#DBEAFE] text-[#1D4ED8]",
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
