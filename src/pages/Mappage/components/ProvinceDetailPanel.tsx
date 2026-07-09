import { memo } from "react"
import { Link } from "react-router-dom"
import {
	FiCalendar,
	FiCompass,
	FiExternalLink,
	FiMapPin,
	FiNavigation,
	FiPackage,
	FiUsers,
} from "react-icons/fi"
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
			<aside className="flex h-full flex-col rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
				<p className="text-sm font-semibold text-[#0E4F79]">
					รายละเอียดจังหวัด
				</p>
				<h2 className="mt-2 text-2xl font-bold text-[#102033]">
					เลือกจังหวัด
				</h2>
				<p className="mt-3 text-sm leading-7 text-[#334B5F]">
					คลิกจังหวัดบนแผนที่หรือเลือกรายชื่อด้านล่าง
					เพื่อซูมเข้าและดูประวัติค่าย จำนวนครั้งที่เคยไป และบันทึกล่าสุด
				</p>

				<div
					className="mt-8 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-gradient-to-b from-slate-50 to-sky-50 px-6 py-10 text-center"
					aria-hidden
				>
					<div className="relative mb-4 flex h-20 w-20 items-center justify-center">
						<span className="absolute inset-0 rounded-full bg-sky-100" />
						<FiMapPin className="relative h-9 w-9 text-sky-900" />
					</div>
					<div className="flex items-center gap-4 text-sky-400">
						<FiCompass className="h-5 w-5" />
						<FiNavigation className="h-5 w-5" />
						<FiPackage className="h-5 w-5" />
					</div>
					<p className="mt-4 max-w-[220px] text-xs leading-5 text-slate-500">
						แผนที่ · เข็มทิศ · เส้นทาง · กระเป๋าเป้
					</p>
				</div>
			</aside>
		)
	}

	const regionLabel = mapRegions[summary.region]?.labelTh ?? summary.region

	return (
		<aside className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">
			{summary.imageSrc ? (
				<div className="relative h-52">
					<LazyImage
						src={summary.imageSrc}
						alt={`${summary.provinceName} รูปค่ายอาสา`}
						wrapperClassName="absolute inset-0"
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#082A3D]/80 via-[#082A3D]/30 to-transparent" />
					<div className="absolute inset-x-4 bottom-4">
						<span className="inline-flex rounded-full bg-[#2478A8] px-3 py-1 text-xs font-semibold text-white shadow">
							เคยไปแล้ว
						</span>
						<h2 className="mt-2 text-3xl font-bold text-white">
							{summary.provinceName}
						</h2>
						<p className="mt-1 text-sm font-medium text-white/85">
							{regionLabel} · {summary.visitCount} ครั้ง
						</p>
					</div>
				</div>
			) : null}

			<div className="space-y-5 p-6">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="text-sm font-semibold text-[#0E4F79]">
							บันทึกไว้ {summary.visitCount} ครั้ง
						</p>
						<h3 className="mt-1 text-xl font-bold text-[#102033]">
							ล่าสุด: {summary.latestVisit.name}
						</h3>
					</div>
					<button
						type="button"
						onClick={onClearSelection}
						className="rounded-full px-3 py-1 text-sm font-semibold text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#102033] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]"
					>
						ล้างการเลือก
					</button>
				</div>

				<p className="text-sm leading-7 text-[#334B5F]">{summary.description}</p>

				<div className="space-y-3 text-sm text-[#334B5F]">
					<div className="flex gap-3">
						<FiCalendar className="mt-0.5 h-4 w-4 shrink-0 text-[#2478A8]" />
						<span>{summary.latestVisit.date}</span>
					</div>
					<div className="flex gap-3">
						<FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2478A8]" />
						<span>{summary.latestVisit.location}</span>
					</div>
					<div className="flex gap-3">
						<FiUsers className="mt-0.5 h-4 w-4 shrink-0 text-[#2478A8]" />
						<span>{summary.latestVisit.director}</span>
					</div>
				</div>

				{summary.latestVisit.detailHref ? (
					<Link
						to={summary.latestVisit.detailHref}
						className="inline-flex items-center gap-2 rounded-xl bg-[#0E4F79] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#082A3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] focus-visible:ring-offset-2"
					>
						ดูรายละเอียดค่ายล่าสุด
						<FiExternalLink className="h-4 w-4" />
					</Link>
				) : null}

				<div>
					<h4 className="text-sm font-semibold text-[#102033]">
						ค่ายที่บันทึกไว้ในจังหวัดนี้
					</h4>
					<ul className="mt-3 space-y-2">
						{summary.visits.map((visit) => (
							<li key={visit.campID}>
								{visit.detailHref ? (
									<Link
										to={visit.detailHref}
										className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] px-3 py-2.5 text-sm transition hover:border-[#93C5FD] hover:bg-[#EFF6FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]"
									>
										<span className="font-medium text-[#102033]">
											{visit.name}
										</span>
										<span className="shrink-0 tabular-nums text-[#64748B]">
											#{visit.campID}
										</span>
									</Link>
								) : (
									<span className="block rounded-xl border border-[#E2E8F0] px-3 py-2.5 text-sm text-[#334B5F]">
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
