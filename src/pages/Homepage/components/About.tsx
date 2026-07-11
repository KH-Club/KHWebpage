import { memo, useCallback } from "react"
import Image1 from "@/assets/images/activitys/krongarsa.jpg"
import Image2 from "@/assets/images/activitys/krongfood.jpg"
import Image3 from "@/assets/images/activitys/krongngan.jpg"
import Image4 from "@/assets/images/activitys/krongkid2.jpg"
import { useNavigate } from "react-router-dom"
import { Button, LazyImage } from "@/components/ui"

const activityImages = [
	{ src: Image1, alt: "Kaihor volunteer activity - krongarsa" },
	{ src: Image2, alt: "Kaihor volunteer activity - food preparation" },
	{ src: Image3, alt: "Kaihor volunteer activity - construction work" },
	{ src: Image4, alt: "Kaihor volunteer activity - teaching children" },
]

const About = memo(function About() {
	const navigate = useNavigate()

	const handleLearnMoreClick = useCallback(() => {
		navigate("/camp")
	}, [navigate])

	return (
		<section
			id="about-section"
			className="about-journey mx-auto bg-white py-20 sm:py-24 lg:py-32"
		>
			<div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
				{/* Section Header */}
				<div className="mb-12 max-w-3xl text-left sm:mb-16">
					<span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-blue-600">
						เกี่ยวกับเรา
					</span>
					<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
						ค่ายหอคืออะไร?
					</h2>
					<p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
						พื้นที่ทดลองลงมือทำ เรียนรู้จากชุมชน และค้นพบว่าการเปลี่ยนแปลงเล็ก ๆ
						เริ่มจากการเดินทางร่วมกันได้เสมอ
					</p>
				</div>

				<div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
					{/* Left Container: Images Grid */}
					<div className="about-collage grid grid-cols-2 gap-3 sm:gap-4 lg:w-3/5">
						{activityImages.map((img, index) => (
							<div
								key={index}
								className="group relative h-48 overflow-hidden rounded-2xl sm:h-60 md:h-72"
							>
								<LazyImage
									src={img.src}
									alt={img.alt}
									wrapperClassName="absolute inset-0"
									className="h-full w-full object-cover shadow-lg transition-transform duration-500 group-hover:scale-110"
								/>
								{/* Hover overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</div>
						))}
					</div>

					{/* Right Container: Text and Content */}
					<div className="flex flex-col justify-center lg:w-2/5">
						<div className="about-copy p-0 sm:p-2">
							<p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">
								<span className="font-semibold text-blue-600">
									ค่ายรวมจุฬาฯอาสาพัฒนาชนบท (ค่ายหอ)
								</span>{" "}
								เป็นค่ายอาสาที่จัดขึ้นโดยชมรมค่ายอาสาสมัครนิสิตหอพัก
								โดยมีวัตถุประสงค์หลัก คือ การส่งเสริมความเป็นจิตอาสา
								การพัฒนาความสามารถต่างๆ ทั้งทางฝีมือ การทำงานเป็นทีม
								การเข้าสังคม และความสัมพันธ์ของนิสิตที่เข้าร่วมกิจกรรม
							</p>
							<p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
								แต่ละค่ายจะไปจัดที่โรงเรียนที่ต้องการความช่วยเหลือ
								มีระยะเวลาจัดกิจกรรม 10-12 วัน กิจกรรมของค่ายจะแบ่งเป็นโครงต่างๆ
								เช่น โครงงานก่อสร้าง โครงสวัสดิการ โครงอาสาพัฒนา โครงเด็ก
								โครงสัมพันธ์ชุมชน เเละ โครงสร้างสรรค์ผลิตภัณฑ์ชุมชน
							</p>

							{/* Activity Tags */}
							<div className="mb-6 flex flex-wrap gap-2">
								{[
									"โครงงานก่อสร้าง",
									"โครงสวัสดิการ",
									"โครงอาสาพัฒนา",
									"โครงเด็ก",
									"โครงสัมพันธ์ชุมชน",
									"โครงสร้างสรรค์ผลิตภัณฑ์ชุมชน",
								].map((tag) => (
									<span
										key={tag}
										className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
									>
										{tag}
									</span>
								))}
							</div>

							{/* CTA Button */}
							<Button
								onClick={handleLearnMoreClick}
								variant="primary"
								size="lg"
								className="w-full sm:w-auto"
							>
								ดูค่ายทั้งหมด
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
})

export default About
