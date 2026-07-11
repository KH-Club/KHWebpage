import { ArrowRight, Compass, MapPin, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import JourneyImage from "@/assets/images/layout/homepagebackground2.jpg"

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
		<section className="relative isolate overflow-hidden bg-[#102033] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28">
			<div className="absolute left-1/2 top-0 h-px w-[min(76rem,88vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
			<div
				className="absolute -right-24 -top-24 size-80 rounded-full bg-blue-500/10 blur-3xl"
				aria-hidden
			/>
			<div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
				<Sparkles className="size-7 text-blue-300" aria-hidden />
				<p className="mt-5 text-sm font-semibold text-blue-300">
					เรื่องต่อไปอาจเริ่มจากคุณ
				</p>
				<h2 className="mt-4 max-w-4xl text-balance text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[1.08] tracking-[-0.045em]">
					พร้อมสร้างความทรงจำบทใหม่ไปด้วยกันไหม?
				</h2>
				<p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-300 sm:text-lg">
					ไม่ว่าคุณจะถนัดลงมือสร้าง ดูแลผู้คน หรือเล่าเรื่องชุมชน ทุกแรงเล็ก ๆ
					มีที่ทางของมันในค่ายหอ
				</p>
				<div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
					<Link
						to="/contact"
						className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-7 font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#102033]"
					>
						คุยกับทีมค่าย
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
					</Link>
					<Link
						to="/camp"
						className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#102033]"
					>
						รู้จักค่ายของเรา
					</Link>
				</div>
			</div>
		</section>
	)
}
