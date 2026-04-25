import { memo } from "react"
import { cn } from "@/lib/utils"
import { mapRegions } from "../data/campMapData"
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
			className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-gray-100"
		>
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
						Visited provinces
					</p>
					<h2
						id="visited-provinces-heading"
						className="text-2xl font-bold text-gray-900"
					>
						Choose from the list
					</h2>
				</div>
				<p className="text-sm text-gray-500">
					{summaries.length} provinces with recorded camps
				</p>
			</div>

			<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{summaries.map((summary) => {
					const region = mapRegions[summary.region]
					const isSelected = selectedProvinceId === summary.provinceId

					return (
						<button
							key={summary.provinceId}
							type="button"
							onClick={() => onSelectProvince(summary.provinceId)}
							aria-label={`Select ${
								summary.provinceName
							} from visited province list, ${summary.visitCount} ${
								summary.visitCount === 1 ? "visit" : "visits"
							}`}
							className={cn(
								"flex min-h-16 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
								isSelected
									? "border-gray-900 bg-gray-900 text-white shadow-md"
									: "border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50",
							)}
							aria-pressed={isSelected}
						>
							<span>
								<span className="block font-semibold">
									{summary.provinceName}
								</span>
								<span
									className={cn(
										"mt-1 block text-xs",
										isSelected ? "text-gray-200" : "text-gray-500",
									)}
								>
									{summary.visitCount}{" "}
									{summary.visitCount === 1 ? "visit" : "visits"}
								</span>
							</span>
							<span
								className="h-4 w-4 shrink-0 rounded-full ring-2 ring-white"
								style={{ backgroundColor: region.color }}
								aria-hidden="true"
							/>
						</button>
					)
				})}
			</div>
		</section>
	)
})
