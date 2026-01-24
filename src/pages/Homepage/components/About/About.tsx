import { memo, useCallback, useMemo } from "react"
import Image1 from "@/assets/images/activitys/krongarsa.jpg"
import Image2 from "@/assets/images/activitys/krongfood.jpg"
import Image3 from "@/assets/images/activitys/krongngan.jpg"
import Image4 from "@/assets/images/activitys/krongkid2.jpg"
import { useNavigate } from "react-router-dom"
import { Button, StatCard, LazyImage } from "@/components/ui"
import { useCamps } from "@/hooks"
import { siteConfig } from "@/config/site"

const activityImages = [
	{ src: Image1, alt: "Kaihor volunteer activity - krongarsa" },
	{ src: Image2, alt: "Kaihor volunteer activity - food preparation" },
	{ src: Image3, alt: "Kaihor volunteer activity - construction work" },
	{ src: Image4, alt: "Kaihor volunteer activity - teaching children" },
]

const About = memo(function About() {
	const navigate = useNavigate()
	const { totalCamps } = useCamps()

	const handleLearnMoreClick = useCallback(() => {
		navigate("/camp")
	}, [navigate])

	const yearsActive = useMemo(() => {
		const currentYear = new Date().getFullYear()
		return currentYear - siteConfig.foundingYear
	}, [])

	return (
		<section className="bg-gray-100 py-12">
			<div className="container mx-auto px-6">
				<div className="flex flex-col gap-8 md:flex-row">
					{/* Left Container: Images */}
					<div className="flex flex-col gap-4 md:w-3/5">
						<div className="flex gap-4">
							{activityImages.slice(0, 2).map((img, index) => (
								<div key={index} className="relative h-60 flex-1">
									<LazyImage
										src={img.src}
										alt={img.alt}
										wrapperClassName="absolute inset-0"
										className="h-full w-full rounded-lg object-cover shadow-md"
									/>
								</div>
							))}
						</div>
						<div className="flex gap-4">
							{activityImages.slice(2, 4).map((img, index) => (
								<div key={index} className="relative h-60 flex-1">
									<LazyImage
										src={img.src}
										alt={img.alt}
										wrapperClassName="absolute inset-0"
										className="h-full w-full rounded-lg object-cover shadow-md"
									/>
								</div>
							))}
						</div>
					</div>

					{/* Right Container: Text and Content */}
					<div className="rounded-lg bg-white p-6 shadow-md md:w-2/5">
						<h2 className="mb-4 text-center text-2xl font-bold">
							ค่ายหอคืออะไร?
						</h2>
						<p className="mb-2 text-gray-700">
							&nbsp; &nbsp; &nbsp;ค่ายรวมจุฬาฯอาสาพัฒนาชนบท (ค่ายหอ)
							เป็นค่ายอาสาที่จัดขึ้นโดยชมรมค่ายอาสาสมัครนิสิตหอพัก
							โดยมีวัตถุประสงค์หลัก คือ การส่งเสริมความเป็นจิตอาสา ,
							การพัฒนาความสามารถต่างๆ ทั้งทางฝีมือ การทำงานเป็นทีม การเข้าสังคม
							เเละความสัมพันธ์ของ นิสิตที่เข้าร่วมกิจกรรม
							เเต่ละค่ายจะไปจัดที่โรงเรียนที่ต้องการความช่วยเหลือ
							มีระยะเวลาจัดกิจกรรม 10-12 วัน
						</p>
						<p className="mb-2 text-gray-700">
							&nbsp; &nbsp; &nbsp;กิจกรรมของค่ายจะเเบ่งเป็นโครงต่างๆ ได้เเก่
							โครงงานก่อสร้าง,โครงสวัสดิการ,โครงอาสาพัฒนา,โครงเด็กเเละโครงสัมพันธ์ชุมชน
							นิสิตที่เข้าร่วมกิจกรรมจะได้มีโอกาส "เวียนโครง"
							ไปทุกโครงในระหว่างกิจกรรมนอกจากนี้ยังมีกิจกรรมอื่นๆ
							ที่ส่งเสริมความสัมพันธ์ของผู้เข้าร่วมกิจกรรม เช่น กิจกรรมสันทนาการ
						</p>

						{/* Stats */}
						<div className="mt-6 flex flex-col gap-6 pb-3 sm:h-1/6 sm:flex-row">
							<StatCard
								value={`${totalCamps}+`}
								label="ค่าย"
								sublabel="ที่เราได้จัด"
								className="sm:w-1/2"
							/>
							<StatCard
								value={`${yearsActive}+`}
								label="ปี"
								sublabel="ที่ชมรมตั้งมา"
								className="sm:w-1/2"
							/>
						</div>

						{/* CTA Button */}
						<div className="mt-6 flex justify-center">
							<Button onClick={handleLearnMoreClick}>Learn More</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
})

export default About
