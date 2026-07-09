import { memo } from "react"

export const MapLegend = memo(function MapLegend() {
	return (
		<div
			aria-label="คำอธิบายแผนที่"
			className="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
		>
			<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<div>
					<h2 className="text-lg font-bold text-[#102033]">คำอธิบายสี</h2>
					<p className="mt-1 text-sm leading-6 text-[#64748B]">
						แสดง 2 สถานะหลัก เพื่อง่ายต่อการอ่านแผนที่
					</p>
				</div>
				<div className="grid gap-3 sm:grid-cols-2 lg:min-w-[520px]">
					<div className="flex items-center gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3">
						<span
							className="h-4 w-4 shrink-0 rounded-full bg-[#2563EB] shadow-sm"
							aria-hidden
						/>
						<div>
							<p className="font-semibold text-[#0E4F79]">เคยไปแล้ว</p>
							<p className="text-sm text-[#2478A8]">
								มีประวัติการออกค่ายในจังหวัดนี้
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
						<span
							className="h-4 w-4 shrink-0 rounded-full bg-[#E5E7EB] ring-1 ring-[#CBD5E1]"
							aria-hidden
						/>
						<div>
							<p className="font-semibold text-[#102033]">ยังไม่เคยไป</p>
							<p className="text-sm text-[#64748B]">
								ยังไม่มีข้อมูลการออกค่ายในชุดข้อมูลปัจจุบัน
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
})
