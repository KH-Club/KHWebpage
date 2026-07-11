import { memo } from "react"
import { InfoCard } from "@/components/ui"

interface CoreValue {
	title: string
	description?: string
	items?: string[]
}

const coreValues: CoreValue[] = [
	{
		title: "Our Activities",
		description:
			"ชมรมของเรามุ่งเน้นจัดกิจกรรมที่ส่งเสริมความเป็นจิตอาสา เเละการพัฒนาความสามารถเป็นหลัก",
		items: [
			"ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน (ปลายปี)",
			"ค่ายอาสาพัฒนาโรงเรียนเเละชุมชน (กลางปี)",
			"กิจกรรมจิตอาสา 1 Days Trip",
		],
	},
	{
		title: "Our Vision",
		description: `ชมรมของเรามีวิสัยทัศน์ที่จะเป็นเเรงขับเคลื่อนเล็กๆ ที่มีผลกระทบในชุมชน
      เราต้องการสร้างแรงบันดาลใจให้กับคนรุ่นใหม่ เพื่อที่จะมีส่วนร่วมในการทำสิ่งดีๆ 
      และสร้างการเปลี่ยนแปลงเชิงบวกในสังคม เรามุ่งมั่นที่จะทำให้ทุกกิจกรรมของเรา 
      สามารถสร้างผลกระทบที่ยั่งยืนและเป็นประโยชน์ต่อทุกคน`,
	},
	{
		title: "Our Values",
		description: "ชมรมของเรามุ่งเน้นจัดจุดประสงค์ 3 ข้อเป็นวิสัยทัศน์หลัก",
		items: [
			"พัฒนาเเละส่งเสริมความเป็นจิตอาสา ช่วยเหลือสังคม",
			"พัฒนาเเละส่งเสริมการเรียนรู้ทักษะใหม่ๆ",
			"พัฒนาเเละส่งเสริมความสัมพันธ์ของคนในชมรม",
		],
	},
]

const Core = memo(function Core() {
	return (
		<section
			className="core-journey relative overflow-hidden bg-[#102033] py-20 text-white sm:py-24 lg:py-28"
			id="core-section"
		>
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
				<div className="mb-12 max-w-3xl sm:mb-16">
					<p className="text-sm font-semibold text-blue-300">
						สิ่งที่เราเชื่อและลงมือทำ
					</p>
					<p className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
						ค่ายไม่ใช่แค่การเดินทางไปช่วยเหลือ
						แต่คือพื้นที่ที่ทุกคนได้เติบโตไปพร้อมกัน
					</p>
				</div>
				<div className="core-values-grid grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/15 md:grid-cols-3">
					{coreValues.map(({ title, description, items }) => (
						<InfoCard key={title} title={title} description={description}>
							{items && (
								<ul className="list-inside list-disc">
									{items.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							)}
						</InfoCard>
					))}
				</div>
			</div>
		</section>
	)
})

export default Core
