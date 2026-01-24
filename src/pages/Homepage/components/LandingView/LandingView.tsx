import { memo, useMemo } from "react"
import { Link as ScrollLink } from "react-scroll"
import { Link as RouterLink } from "react-router-dom"
import HeroBackground from "@/assets/images/layout/homepagebackground.jpg"
import { useCamps } from "@/hooks"
import { Button, AnimatedCounter, ScrollIndicator } from "@/components/ui"
import { siteConfig } from "@/config/site"

const LandingView = memo(function LandingView() {
	const { totalCamps } = useCamps()

	const yearsActive = useMemo(() => {
		const currentYear = new Date().getFullYear()
		return currentYear - siteConfig.foundingYear
	}, [])

	return (
		<section id="home" className="relative h-screen w-full overflow-hidden">
			{/* Static Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url(${HeroBackground})` }}
			/>

			{/* Gradient Overlays for better text readability */}
			<div
				className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
				aria-hidden="true"
			/>
			<div
				className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"
				aria-hidden="true"
			/>

			{/* Main Content */}
			<div className="relative z-10 flex h-full flex-col">
				{/* Hero Content - Centered vertically */}
				<div className="flex flex-1 flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">
					<div className="max-w-3xl">
						{/* Badge */}
						<div className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm sm:text-sm">
							Since {siteConfig.foundingYear}
						</div>

						{/* Main Title */}
						<h1 className="mb-4 text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
							KAIHOR
							<span className="mt-2 block text-3xl font-medium text-white/90 sm:text-4xl md:text-5xl lg:text-6xl">
								ค่ายหอ
							</span>
						</h1>

						{/* Subtitle */}
						<p className="mb-2 text-lg font-medium text-blue-300 sm:text-xl md:text-2xl">
							ชมรมค่ายอาสาสมัครนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัย
						</p>

						{/* Description */}
						<p className="mb-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
							ครอบครัวที่พร้อมจะออกไปช่วยเหลือสังคม ส่งเสริมความเป็นจิตอาสา
							พัฒนาความสามารถ และพัฒนาสังคมไปด้วยกัน
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col gap-4 sm:flex-row">
							<ScrollLink
								to="about-section"
								smooth={true}
								duration={500}
								tabIndex={0}
								role="button"
								aria-label="Learn more about us"
							>
								<Button
									variant="primary"
									size="lg"
									className="w-full min-w-[200px] px-8 py-4 text-base font-semibold sm:text-lg"
								>
									เกี่ยวกับเรา
								</Button>
							</ScrollLink>
							<RouterLink to="/camp" aria-label="Explore our camps">
								<Button
									variant="primary"
									size="lg"
									className="w-full min-w-[200px] bg-white px-8 py-4 text-base font-semibold text-blue-600 hover:bg-gray-100 sm:text-lg"
								>
									สำรวจค่ายของเรา
								</Button>
							</RouterLink>
						</div>
					</div>
				</div>

				{/* Stats Bar - Bottom */}
				<div className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
					<div className="container mx-auto p-6 sm:py-8">
						<div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-12">
							<AnimatedCounter
								end={totalCamps}
								suffix="+"
								label="ค่าย"
								sublabel="ที่เราจัด"
								duration={2000}
							/>
							<AnimatedCounter
								end={yearsActive}
								suffix="+"
								label="ปี"
								sublabel="ที่ก่อตั้ง"
								duration={2000}
							/>
							<AnimatedCounter
								end={1000}
								suffix="+"
								label="อาสาสมัคร"
								sublabel="ที่เข้าร่วม"
								duration={2500}
								className="hidden md:block"
							/>
							<AnimatedCounter
								end={50}
								suffix="+"
								label="โรงเรียน"
								sublabel="ที่เราช่วย"
								duration={2500}
								className="hidden md:block"
							/>
						</div>
					</div>
				</div>

				{/* Scroll Indicator */}
				<div className="absolute bottom-28 left-1/2 -translate-x-1/2 sm:bottom-32 md:bottom-36">
					<ScrollIndicator text="เลื่อนลงเพื่อดูเพิ่มเติม" />
				</div>
			</div>

			{/* Decorative Elements */}
			<div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
			<div className="absolute bottom-1/4 left-0 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />
		</section>
	)
})

export default LandingView
