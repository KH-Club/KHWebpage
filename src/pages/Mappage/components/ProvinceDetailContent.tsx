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
	FiX,
} from "react-icons/fi"
import { motion, useReducedMotion } from "motion/react"
import { LazyImage } from "@/components/ui"
import { mapRegions } from "../data/campMapData"
import { ProvinceSummary, UnvisitedProvinceInfo } from "../types"

interface ProvinceDetailContentProps {
	summary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	onClearSelection: () => void
	/** Compact spacing for bottom sheet */
	compact?: boolean
}

function extractYearLabel(date: string): string {
	const match = date.match(/(19|20)\d{2}/)
	return match ? match[0] : date
}

export const ProvinceDetailContent = memo(function ProvinceDetailContent({
	summary,
	unvisitedProvince,
	onClearSelection,
	compact = false,
}: ProvinceDetailContentProps) {
	const reduceMotion = useReducedMotion()

	if (!summary && unvisitedProvince) {
		return (
			<div className="flex min-h-full flex-col">
				<div className="border-b border-[#D7E6EF] bg-[#EAF5FF] p-6 sm:py-8">
					<div className="flex items-start justify-between gap-3">
						<span className="inline-flex text-xs font-semibold text-[#526A7C]">
							ยังไม่เคยไป
						</span>
						<button
							type="button"
							onClick={onClearSelection}
							className="rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
							aria-label="ปิดรายละเอียดจังหวัด"
						>
							<FiX className="h-4 w-4" />
						</button>
					</div>
					<h2 className="mt-3 text-3xl font-bold text-slate-900">
						{unvisitedProvince.name}
					</h2>
					<p className="mt-1 text-sm text-[#526A7C]">จังหวัดในประเทศไทย</p>
				</div>
				<div className="flex flex-1 flex-col p-6">
					<p className="text-sm leading-7 text-[#334B5F]">
						จังหวัดนี้ยังไม่มีบันทึกค่ายอาสาในชุดข้อมูลปัจจุบัน
					</p>
					<p className="mt-8 border-t border-[#D7E6EF] pt-5 text-sm font-medium text-[#526A7C]">
						เลือกจังหวัดอื่นเพื่ออ่านบันทึกค่ายที่มีอยู่
					</p>
				</div>
			</div>
		)
	}

	if (!summary) {
		return (
			<div className={`flex min-h-full flex-col ${compact ? "p-5" : "p-6"}`}>
				<p className="text-sm font-semibold text-sky-900">รายละเอียดจังหวัด</p>
				<h2 className="mt-2 text-2xl font-bold text-slate-900">เลือกจังหวัด</h2>
				<p className="mt-3 text-sm leading-7 text-slate-600">
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
			</div>
		)
	}

	const regionLabel = mapRegions[summary.region]?.labelTh ?? summary.region

	return (
		<div className="flex min-h-full flex-col">
			{summary.imageSrc ? (
				<div className={`relative shrink-0 ${compact ? "h-40" : "h-52"}`}>
					<LazyImage
						src={summary.imageSrc}
						alt={`${summary.provinceName} รูปค่ายอาสา`}
						wrapperClassName="absolute inset-0"
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
					<button
						type="button"
						onClick={onClearSelection}
						className="absolute right-3 top-3 rounded-full bg-black/35 p-2 text-white backdrop-blur-sm transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
						aria-label="ปิดรายละเอียดจังหวัด"
					>
						<FiX className="h-4 w-4" />
					</button>
					<div className="absolute inset-x-4 bottom-4">
						<span className="inline-flex bg-[#2478A8] px-3 py-1 text-xs font-semibold text-white">
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
			) : (
				<div className="flex items-start justify-between gap-3 border-b border-slate-100 px-6 py-5">
					<div>
						<span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
							เคยไปแล้ว
						</span>
						<h2 className="mt-2 text-2xl font-bold text-slate-900">
							{summary.provinceName}
						</h2>
					</div>
					<button
						type="button"
						onClick={onClearSelection}
						className="rounded-full p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
						aria-label="ปิดรายละเอียดจังหวัด"
					>
						<FiX className="h-4 w-4" />
					</button>
				</div>
			)}

			<div className={`space-y-6 ${compact ? "p-5" : "p-6"}`}>
				<div>
					<p className="text-sm font-semibold text-[#2478A8]">
						บันทึกไว้ {summary.visitCount} ครั้ง
					</p>
					<h3 className="mt-1 text-xl font-bold text-slate-900">
						ล่าสุด: {summary.latestVisit.name}
					</h3>
					<p className="mt-3 text-sm leading-7 text-[#334B5F]">
						{summary.description}
					</p>
				</div>

				<div className="space-y-3 text-sm text-slate-600">
					<div className="flex gap-3">
						<FiCalendar className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
						<span>{summary.latestVisit.date}</span>
					</div>
					<div className="flex gap-3">
						<FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
						<span>{summary.latestVisit.location}</span>
					</div>
					<div className="flex gap-3">
						<FiUsers className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
						<span>{summary.latestVisit.director}</span>
					</div>
				</div>

				{summary.latestVisit.detailHref ? (
					<Link
						to={summary.latestVisit.detailHref}
						className="inline-flex min-h-11 items-center gap-2 bg-[#0E4F79] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#082A3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] focus-visible:ring-offset-2"
					>
						ดูรายละเอียดค่ายล่าสุด
						<FiExternalLink className="h-4 w-4" />
					</Link>
				) : null}

				<div>
					<h4 className="text-sm font-semibold text-slate-900">
						ไทม์ไลน์ค่ายในจังหวัดนี้
					</h4>
					<ol className="relative mt-4 space-y-0 border-l border-[#A7CEE5] pl-5">
						{summary.visits.map((visit, index) => {
							const year = extractYearLabel(visit.date)
							const body = (
								<>
									<span
										className="absolute left-[-1.4rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-sky-600 shadow-sm"
										aria-hidden
									/>
									<p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
										{year}
									</p>
									{visit.detailHref ? (
										<Link
											to={visit.detailHref}
											className="mt-1 flex items-start justify-between gap-3 border-b border-[#D7E6EF] py-2.5 text-sm transition hover:border-[#2478A8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]"
										>
											<span className="min-w-0">
												<span className="block font-medium text-slate-900">
													{visit.name}
												</span>
												<span className="mt-0.5 block text-xs text-slate-500">
													{visit.date}
												</span>
											</span>
											<span className="shrink-0 tabular-nums text-slate-500">
												#{visit.campID}
											</span>
										</Link>
									) : (
										<span className="mt-1 block border-b border-[#D7E6EF] py-2.5 text-sm text-slate-700">
											{visit.name}
										</span>
									)}
								</>
							)

							if (reduceMotion) {
								return (
									<li key={visit.campID} className="relative pb-5 last:pb-0">
										{body}
									</li>
								)
							}

							return (
								<motion.li
									key={visit.campID}
									className="relative pb-5 last:pb-0"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.28,
										delay: 0.08 + index * 0.06,
										ease: [0.22, 1, 0.36, 1],
									}}
								>
									{body}
								</motion.li>
							)
						})}
					</ol>
				</div>
			</div>
		</div>
	)
})
