import { memo } from "react"
import { Heart, Lightbulb, Users } from "lucide-react"

const coreValues = [
	{
		title: "Our Activities",
		description:
			"ชมรมของเรามุ่งเน้นจัดกิจกรรมที่ส่งเสริมความเป็นจิตอาสา และการพัฒนาความสามารถเป็นหลัก",
		items: [
			"ค่ายอาสาพัฒนาโรงเรียนและชุมชน (ปลายปี)",
			"ค่ายอาสาพัฒนาโรงเรียนและชุมชน (กลางปี)",
			"กิจกรรมจิตอาสา 1 Days Trip",
		],
		icon: Heart,
	},
	{
		title: "Our Vision",
		description:
			"เราอยากเป็นแรงขับเคลื่อนเล็ก ๆ ที่สร้างผลกระทบในชุมชน และส่งต่อแรงบันดาลใจให้คนรุ่นใหม่ร่วมกันทำสิ่งดี ๆ อย่างยั่งยืน",
		icon: Lightbulb,
	},
	{
		title: "Our Values",
		description: "สามสิ่งที่เราใช้เป็นเข็มทิศในการทำงานทุกค่าย",
		items: [
			"ช่วยเหลือสังคมด้วยหัวใจอาสา",
			"เรียนรู้ทักษะใหม่จากการลงมือทำ",
			"สร้างความสัมพันธ์ของคนในชมรมและชุมชน",
		],
		icon: Users,
	},
]

const Core = memo(function Core() {
	return (
		<section
			className="core-journey relative overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#eaf5ff_100%)] py-20 sm:py-24 lg:py-28"
			id="core-section"
		>
			<div
				className="pointer-events-none absolute -right-20 top-12 size-72 rounded-full bg-blue-300/20 blur-3xl"
				aria-hidden
			/>
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
				<div className="mb-12 max-w-3xl sm:mb-16">
					<p className="text-sm font-semibold text-blue-700">
						สิ่งที่เราเชื่อและลงมือทำ
					</p>
					<p className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
						ค่ายไม่ใช่แค่การเดินทางไปช่วยเหลือ
						แต่คือพื้นที่ที่ทุกคนได้เติบโตไปพร้อมกัน
					</p>
				</div>
				<div className="core-values-grid grid grid-cols-1 gap-4 md:grid-cols-3">
					{coreValues.map(({ title, description, items, icon: Icon }) => (
						<article
							key={title}
							className="group rounded-2xl bg-white p-6 shadow-[0_6px_8px_rgba(37,99,235,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_8px_rgba(37,99,235,0.12)] sm:p-8"
						>
							<span className="grid size-12 place-items-center rounded-full bg-blue-50 text-blue-700 transition duration-300 group-hover:rotate-[-6deg] group-hover:bg-blue-100">
								<Icon className="size-5" aria-hidden />
							</span>
							<h2 className="mt-7 text-2xl font-semibold tracking-[-0.02em] text-slate-950">
								{title}
							</h2>
							<p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
								{description}
							</p>
							{items ? (
								<ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
									{items.map((item) => (
										<li key={item} className="flex gap-3">
											<span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-500" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							) : null}
						</article>
					))}
				</div>
			</div>
		</section>
	)
})

export default Core
