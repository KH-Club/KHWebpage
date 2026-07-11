import {
	ArrowRight,
	Compass,
	Hammer,
	HeartHandshake,
	MapPin,
	MessageCircle,
} from "lucide-react"
import { Link } from "react-router-dom"
import JoinImage from "@/assets/images/activitys/fun.jpg"
import JourneyImage from "@/assets/images/layout/homepagebackground2.jpg"

const waysToJoin = [
	{ icon: Hammer, label: "ลงมือสร้าง", detail: "งานช่างและพื้นที่เรียนรู้" },
	{
		icon: HeartHandshake,
		label: "ดูแลผู้คน",
		detail: "สวัสดิการ เด็ก และชุมชน",
	},
	{
		icon: MessageCircle,
		label: "เล่าเรื่องค่าย",
		detail: "สื่อสารและเก็บความทรงจำ",
	},
]

export function MemoryMapChapter() {
	return (
		<section
			aria-labelledby="memory-map-heading"
			className="journey-map relative isolate overflow-hidden bg-[#eaf5ff] py-20 sm:py-28 lg:py-36"
		>
			<div className="absolute inset-0 opacity-[0.045]" aria-hidden>
				<div className="absolute left-[8%] top-[18%] size-2 rounded-full bg-blue-900" />
				<div className="absolute left-[8%] top-[18%] h-px w-[68%] origin-left rotate-[8deg] border-t border-dashed border-blue-900" />
				<div className="absolute right-[21%] top-[34%] size-3 rounded-full border-2 border-blue-900" />
			</div>
			<div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10">
				<div className="max-w-xl">
					<div className="mb-6 flex items-center gap-3 text-sm font-semibold text-blue-700">
						<MapPin className="size-5" aria-hidden />
						<span>แผนที่ความทรงจำ</span>
					</div>
					<h2
						id="memory-map-heading"
						className="text-balance text-[clamp(2.4rem,5vw,4.75rem)] font-bold leading-[1.08] tracking-[-0.045em] text-slate-950"
					>
						ทุกจังหวัดมีเรื่องราวที่รอให้เรากลับไปหา
					</h2>
					<p className="mt-6 max-w-[58ch] text-pretty text-base leading-8 text-slate-600 sm:text-lg">
						ตามรอยค่ายหอจากเหนือจรดใต้ สำรวจผู้คน สถานที่
						และความทรงจำที่ยังเชื่อมโยงกันอยู่บนแผนที่ประเทศไทย
					</p>
					<Link
						to="/map"
						className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-blue-600 px-6 font-semibold text-white shadow-[0_6px_8px_rgba(37,99,235,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_8px_8px_rgba(37,99,235,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
					>
						เปิดแผนที่ความทรงจำ
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
				<Link
					to="/map"
					aria-label="สำรวจแผนที่ความทรงจำค่ายหอทั่วประเทศไทย"
					className="group relative min-h-[28rem] overflow-hidden rounded-2xl bg-slate-900 shadow-[0_8px_8px_rgba(15,23,42,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 sm:min-h-[34rem]"
				>
					<img
						src={JourneyImage}
						alt="สมาชิกค่ายหอร่วมเดินทางและทำกิจกรรมอาสา"
						className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/15 to-blue-900/10" />
					<div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-8">
						<div>
							<p className="text-sm font-medium text-blue-200">
								ร่องรอยค่ายหอทั่วไทย
							</p>
							<p className="mt-2 text-2xl font-semibold sm:text-3xl">
								29 จังหวัด · 42 ค่าย
							</p>
						</div>
						<span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-blue-700 transition-transform group-hover:translate-x-1">
							<Compass className="size-5" aria-hidden />
						</span>
					</div>
				</Link>
			</div>
		</section>
	)
}

export function JoinJourneyChapter() {
	return (
		<section className="relative isolate overflow-hidden bg-white px-5 py-20 text-slate-950 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
			<div
				className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f3f9ff] to-white"
				aria-hidden
			/>
			<div className="relative mx-auto grid w-full max-w-7xl items-stretch gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
				<div className="flex flex-col justify-center">
					<p className="text-sm font-semibold text-blue-700">
						มาช่วยกันคนละไม้คนละมือ
					</p>
					<h2 className="mt-4 max-w-3xl text-balance text-[clamp(2.35rem,5vw,4.6rem)] font-bold leading-[1.08] tracking-[-0.045em]">
						ในค่ายหนึ่งค่าย มีพื้นที่ให้ความถนัดของทุกคน
					</h2>
					<p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
						คุณไม่ต้องเก่งทุกอย่าง แค่พร้อมเรียนรู้ ลงมือทำ และดูแลกันระหว่างทาง
					</p>
					<ul className="mt-8 grid gap-3 sm:grid-cols-3">
						{waysToJoin.map(({ icon: Icon, label, detail }) => (
							<li
								key={label}
								className="join-way group flex items-center gap-3 rounded-xl bg-blue-50 p-4 transition duration-300 hover:-translate-y-1 hover:bg-blue-100 sm:flex-col sm:items-start"
							>
								<span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-blue-700 shadow-[0_3px_6px_rgba(37,99,235,0.10)] transition duration-300 group-hover:rotate-[-7deg] group-hover:scale-105">
									<Icon className="size-[18px]" aria-hidden />
								</span>
								<span>
									<span className="block font-semibold text-slate-900">
										{label}
									</span>
									<span className="mt-1 block text-xs leading-5 text-slate-600">
										{detail}
									</span>
								</span>
							</li>
						))}
					</ul>
					<div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
						<Link
							to="/contact"
							className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-blue-600 px-7 font-semibold text-white shadow-[0_6px_8px_rgba(37,99,235,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
						>
							ถามทีมค่ายได้เลย
							<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
						</Link>
						<Link
							to="/camp"
							className="inline-flex min-h-12 items-center justify-center rounded-full border border-blue-200 px-7 font-semibold text-blue-800 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
						>
							ดูว่าค่ายทำอะไรบ้าง
						</Link>
					</div>
				</div>
				<div className="group relative min-h-[24rem] overflow-hidden rounded-2xl bg-blue-100 shadow-[0_8px_8px_rgba(37,99,235,0.10)] sm:min-h-[31rem]">
					<img
						src={JoinImage}
						alt="สมาชิกค่ายหอร่วมทำกิจกรรมด้วยกัน"
						className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-blue-950/65 via-transparent to-transparent" />
					<p className="absolute bottom-0 left-0 max-w-md p-6 text-lg font-medium leading-7 text-white sm:p-8 sm:text-xl">
						“งานของเราอาจต่างกัน แต่ปลายทางเดียวกันคือชุมชนที่ดีขึ้น”
					</p>
				</div>
			</div>
		</section>
	)
}
