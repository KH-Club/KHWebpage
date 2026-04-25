import { memo } from "react"
import { Link } from "react-router-dom"
import { FiCalendar, FiExternalLink, FiMapPin, FiUsers } from "react-icons/fi"
import { LazyImage } from "@/components/ui"
import { mapRegions } from "../data/campMapData"
import { ProvinceSummary } from "../types"

interface ProvinceDetailPanelProps {
	summary?: ProvinceSummary
	onClearSelection: () => void
}

export const ProvinceDetailPanel = memo(function ProvinceDetailPanel({
	summary,
	onClearSelection,
}: ProvinceDetailPanelProps) {
	if (!summary) {
		return (
			<aside className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
				<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
					Province detail
				</p>
				<h2 className="mt-2 text-2xl font-bold text-gray-900">
					Select a visited province
				</h2>
				<p className="mt-3 text-sm leading-6 text-gray-600">
					Use the colored provinces on the map or the visited province list to
					see camp history, latest recorded project, date, photo, and related
					camp links.
				</p>
			</aside>
		)
	}

	const region = mapRegions[summary.region]

	return (
		<aside className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100">
			{summary.imageSrc ? (
				<div className="relative h-52">
					<LazyImage
						src={summary.imageSrc}
						alt={`${summary.provinceName} camp photo`}
						wrapperClassName="absolute inset-0"
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
					<div className="absolute inset-x-4 bottom-4">
						<span
							className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
							style={{ backgroundColor: region.selectedColor }}
						>
							{region.label}
						</span>
						<h2 className="mt-2 text-3xl font-bold text-white">
							{summary.provinceName}
						</h2>
					</div>
				</div>
			) : null}

			<div className="space-y-5 p-6">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
							{summary.visitCount} recorded{" "}
							{summary.visitCount === 1 ? "visit" : "visits"}
						</p>
						<h3 className="mt-1 text-xl font-bold text-gray-900">
							Latest: {summary.latestVisit.name}
						</h3>
					</div>
					<button
						type="button"
						onClick={onClearSelection}
						className="rounded-full px-3 py-1 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Clear
					</button>
				</div>

				<p className="text-sm leading-6 text-gray-600">{summary.description}</p>

				<div className="space-y-3 text-sm text-gray-700">
					<div className="flex gap-3">
						<FiCalendar className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
						<span>{summary.latestVisit.date}</span>
					</div>
					<div className="flex gap-3">
						<FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
						<span>{summary.latestVisit.location}</span>
					</div>
					<div className="flex gap-3">
						<FiUsers className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
						<span>{summary.latestVisit.director}</span>
					</div>
				</div>

				{summary.latestVisit.detailHref ? (
					<Link
						to={summary.latestVisit.detailHref}
						className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						View latest camp
						<FiExternalLink className="h-4 w-4" />
					</Link>
				) : null}

				<div>
					<h4 className="text-sm font-semibold text-gray-900">
						Recorded camps in this province
					</h4>
					<ul className="mt-3 space-y-2">
						{summary.visits.map((visit) => (
							<li key={visit.campID}>
								{visit.detailHref ? (
									<Link
										to={visit.detailHref}
										className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										<span className="font-medium text-gray-800">
											{visit.name}
										</span>
										<span className="shrink-0 text-gray-500">
											#{visit.campID}
										</span>
									</Link>
								) : (
									<span className="block rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700">
										{visit.name}
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</aside>
	)
})
