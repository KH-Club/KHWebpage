import { memo } from "react"

export const MapLegend = memo(function MapLegend() {
	return (
		<div
			aria-label="คำอธิบายแผนที่"
			className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
		>
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div>
					<h2 className="text-lg font-bold text-slate-900">คำอธิบายสี</h2>
					<p className="mt-1 text-sm leading-6 text-slate-500">
						แสดง 2 สถานะหลัก · น้ำเงินเข้มขึ้นเมื่อมีค่ายหลายครั้ง
					</p>
				</div>
				<div className="grid gap-3 sm:grid-cols-2 lg:min-w-[520px]">
					<div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
						<span className="flex shrink-0 items-center gap-0.5" aria-hidden>
							<span className="h-3.5 w-3.5 rounded-full bg-blue-400" />
							<span className="h-3.5 w-3.5 rounded-full bg-blue-600" />
							<span className="h-3.5 w-3.5 rounded-full bg-blue-800" />
						</span>
						<div>
							<p className="font-semibold text-sky-900">เคยไปแล้ว</p>
							<p className="text-sm text-sky-700">
								ยิ่งเข้ม = ยิ่งมีหลายครั้ง
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
						<span
							className="h-4 w-4 shrink-0 rounded-full bg-slate-200 ring-1 ring-slate-300"
							aria-hidden
						/>
						<div>
							<p className="font-semibold text-slate-900">ยังไม่เคยไป</p>
							<p className="text-sm text-slate-500">
								ยังไม่มีข้อมูลการออกค่ายในชุดข้อมูลปัจจุบัน
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
})
