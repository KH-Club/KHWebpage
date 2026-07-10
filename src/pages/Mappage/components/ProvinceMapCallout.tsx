import { RefObject, memo, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Calendar, MapPin, Navigation, Plus, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { mapRegions } from "../data/campMapData"
import { ProvinceSummary, UnvisitedProvinceInfo } from "../types"

export type CalloutPlacement = "left" | "right" | "top" | "bottom"

export interface MapCalloutPosition {
	anchorX: number
	anchorY: number
	cardX: number
	cardY: number
	cardWidth: number
	cardHeight: number
	connectorX: number
	connectorY: number
	placement: CalloutPlacement
}

interface ProvinceMapCalloutProps {
	summary?: ProvinceSummary
	unvisitedProvince?: UnvisitedProvinceInfo
	position: MapCalloutPosition | null
	cardRef: RefObject<HTMLDivElement>
	onClearSelection: () => void
	onLayoutChange: () => void
}

const contentVariants = {
	hidden: { opacity: 0, y: 6 },
	visible: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.06 + index * 0.045,
			duration: 0.24,
			ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
		},
	}),
}

function extractYear(date: string): string {
	return date.match(/(19|20)\d{2}/)?.[0] ?? date
}

function buildAddCampHref(provinceId: string): string {
	return `/camp?intent=add&province=${encodeURIComponent(provinceId)}`
}

export const ProvinceMapCallout = memo(function ProvinceMapCallout({
	summary,
	unvisitedProvince,
	position,
	cardRef,
	onClearSelection,
	onLayoutChange,
}: ProvinceMapCalloutProps) {
	const reduceMotion = useReducedMotion()
	const selectedId = summary?.provinceId ?? unvisitedProvince?.id
	const provinceName = summary?.provinceName ?? unvisitedProvince?.name
	const region = summary?.region ?? unvisitedProvince?.region
	const regionLabel = region ? mapRegions[region].labelTh : "ประเทศไทย"
	const isOpen = Boolean(selectedId && provinceName && position)

	useEffect(() => {
		const card = cardRef.current
		if (!isOpen || !card) return

		onLayoutChange()
		if (typeof ResizeObserver !== "function") return
		const observer = new ResizeObserver(onLayoutChange)
		observer.observe(card)
		return () => observer.disconnect()
	}, [cardRef, isOpen, onLayoutChange, selectedId])

	return (
		<AnimatePresence mode="wait">
			{isOpen && position && selectedId && provinceName ? (
				<div
					key={selectedId}
					style={{ left: position.cardX, top: position.cardY }}
					className="pointer-events-none absolute z-40 w-[20rem] max-w-[calc(100vw-32px)]"
				>
					<motion.aside
						ref={cardRef}
						role="dialog"
						aria-modal="false"
						aria-label={`รายละเอียดจังหวัด${provinceName}`}
						initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 8 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 4 }}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className="pointer-events-auto origin-center overflow-hidden rounded-[24px] border border-[rgba(148,163,184,0.25)] bg-[rgba(255,255,255,0.86)] shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-[18px]"
					>
						<div className="max-h-[min(34rem,calc(100svh-7rem))] overflow-y-auto overscroll-contain p-5">
							<motion.div
								custom={0}
								variants={contentVariants}
								initial={reduceMotion ? false : "hidden"}
								animate="visible"
								className="flex items-start justify-between gap-4"
							>
								<div>
									<span
										className={
											summary
												? "inline-flex rounded-full bg-[#DCEEFF] px-3 py-1 text-xs font-semibold text-[#0E5F9A]"
												: "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
										}
									>
										{summary ? "เคยไปแล้ว" : "ยังไม่เคยไป"}
									</span>
									<h2 className="mt-3 text-2xl font-bold tracking-[-0.025em] text-[#102033]">
										{provinceName}
									</h2>
									<p className="mt-1 text-sm font-medium text-[#526A7C]">
										{regionLabel}
										{summary ? ` · ${summary.visitCount} ครั้ง` : ""}
									</p>
								</div>
								<button
									type="button"
									onClick={onClearSelection}
									className="grid min-h-11 min-w-11 place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]"
									aria-label="ปิดรายละเอียดจังหวัด"
								>
									<X className="h-5 w-5" aria-hidden />
								</button>
							</motion.div>

							{summary ? (
								<>
									<motion.div
										custom={1}
										variants={contentVariants}
										initial={reduceMotion ? false : "hidden"}
										animate="visible"
										className="mt-5 border-y border-[#CFE0EA] py-4"
									>
										<div className="flex items-start gap-3">
											<div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EAF5FF] text-[#2478A8]">
												<MapPin className="h-4 w-4" aria-hidden />
											</div>
											<div className="min-w-0">
												<p className="text-xs font-semibold text-[#526A7C]">
													บันทึกล่าสุด
												</p>
												<p className="mt-1 text-sm font-semibold leading-6 text-[#102033]">
													#{summary.latestVisit.campID}{" "}
													{summary.latestVisit.name}
												</p>
												<p className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#526A7C]">
													<Calendar className="h-3.5 w-3.5" aria-hidden />
													{summary.latestVisit.date}
												</p>
											</div>
										</div>
									</motion.div>

									<motion.div
										custom={2}
										variants={contentVariants}
										initial={reduceMotion ? false : "hidden"}
										animate="visible"
										className="mt-4"
									>
										<p className="inline-flex items-center gap-2 text-xs font-semibold text-[#526A7C]">
											<Navigation
												className="h-4 w-4 text-[#2478A8]"
												aria-hidden
											/>
											ร่องรอยล่าสุด
										</p>
										<ol
											className="mt-3 flex items-center gap-2"
											aria-label="ปีที่ไปค่ายล่าสุด"
										>
											{summary.visits.slice(0, 3).map((visit, index) => (
												<li
													key={visit.campID}
													className="flex items-center gap-2"
												>
													{index > 0 ? (
														<span
															className="h-px w-3 bg-[#A7CEE5]"
															aria-hidden
														/>
													) : null}
													<span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold tabular-nums text-[#0E4F79] shadow-sm">
														{extractYear(visit.date)}
													</span>
												</li>
											))}
										</ol>
									</motion.div>

									<motion.div
										custom={3}
										variants={contentVariants}
										initial={reduceMotion ? false : "hidden"}
										animate="visible"
										className="mt-5 flex gap-2"
									>
										<Link
											to={summary.latestVisit.detailHref ?? "/camp"}
											className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#0E5F9A] px-4 text-sm font-semibold text-white transition hover:bg-[#0A4774] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] focus-visible:ring-offset-2"
										>
											ดูความทรงจำ
											<ArrowRight className="h-4 w-4" aria-hidden />
										</Link>
										<Link
											to={buildAddCampHref(selectedId)}
											className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-[#A7CEE5] bg-white/70 px-4 text-sm font-semibold text-[#0E4F79] transition hover:border-[#2478A8] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8]"
										>
											<Plus className="h-4 w-4" aria-hidden />
											เพิ่มค่าย
										</Link>
									</motion.div>
								</>
							) : (
								<>
									<motion.div
										custom={1}
										variants={contentVariants}
										initial={reduceMotion ? false : "hidden"}
										animate="visible"
										className="mt-5 flex gap-3 border-y border-[#CFE0EA] py-4"
									>
										<div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500">
											<MapPin className="h-4 w-4" aria-hidden />
										</div>
										<p className="text-sm leading-6 text-[#334B5F]">
											จังหวัดนี้ยังไม่มีบันทึกค่าย เริ่มร่องรอยแรกที่นี่
										</p>
									</motion.div>
									<motion.div
										custom={2}
										variants={contentVariants}
										initial={reduceMotion ? false : "hidden"}
										animate="visible"
										className="mt-5"
									>
										<Link
											to={buildAddCampHref(selectedId)}
											className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0E5F9A] px-4 text-sm font-semibold text-white transition hover:bg-[#0A4774] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2478A8] focus-visible:ring-offset-2"
										>
											<Plus className="h-4 w-4" aria-hidden />
											เริ่มบันทึกแรก
										</Link>
									</motion.div>
								</>
							)}
						</div>
					</motion.aside>
				</div>
			) : null}
		</AnimatePresence>
	)
})
