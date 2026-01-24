import { memo, useMemo } from "react"
import HomepageBackgroundImage from "@/assets/images/layout/homepagebackground.jpg"
import RightContainerImage1 from "@/assets/images/camps/main/52/KH52.jpg"
import RightContainerImage2 from "@/assets/images/camps/main/53/KH53.jpg"
import RightContainerImage3 from "@/assets/images/camps/main/51/KH51.jpg"
import RightContainerImage4 from "@/assets/images/camps/main/50/KH50.jpg"
import { Link } from "react-scroll"
import { useImageCarousel } from "@/hooks"
import { Button } from "@/components/ui"

const LandingView = memo(function LandingView() {
	const images = useMemo(
		() => [
			RightContainerImage1,
			RightContainerImage2,
			RightContainerImage3,
			RightContainerImage4,
		],
		[],
	)

	const { currentImage } = useImageCarousel({
		images,
		intervalMs: 5000,
		autoPlay: true,
	})

	return (
		<section
			id="home"
			className="relative h-[85vh] bg-cover bg-center bg-no-repeat shadow-lg sm:h-screen"
			style={{ backgroundImage: `url(${HomepageBackgroundImage})` }}
		>
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-black opacity-75"
				aria-hidden="true"
			/>

			{/* Content */}
			<div className="relative z-10 flex h-full flex-col items-center justify-center px-6 md:px-10 lg:flex-row">
				{/* Left Container */}
				<div className="flex w-full flex-col items-center justify-center p-5 text-center text-white md:p-10 lg:w-2/5 lg:items-start lg:text-left">
					<h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
						"KAIHOR" / "ค่ายหอ"
					</h1>
					<p className="mb-4 text-lg sm:text-xl md:text-2xl">
						"ชมรมค่ายอาสาสมัครนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัย"
					</p>
					<p className="mb-4 text-sm sm:text-base md:text-lg">
						ชมรมสังกัดจุฬาลงกรณ์มหาวิทยาลัย
						ครอบครัวที่พร้อมจะออกไปช่วยเหลือสังคม ส่งเสริมความเป็นจิตอาสา
						พัฒนาความสามารถ เเละพัฒนาสังคม
					</p>
					<Link
						to="core-section"
						smooth={true}
						duration={500}
						tabIndex={0}
						role="button"
						aria-label="Learn more about us"
					>
						<Button variant="primary" size="md" className="mt-2">
							About us
						</Button>
					</Link>
				</div>

				{/* Right Container - Image Carousel */}
				<div className="mt-6 flex w-full items-center justify-center lg:mt-0 lg:w-1/3">
					<img
						src={currentImage}
						alt="Kaihor volunteer camp activities"
						loading="lazy"
						className="h-auto max-w-[80%] rounded-lg shadow-lg transition-opacity duration-500 sm:max-w-[90%] md:max-w-full"
					/>
				</div>
			</div>
		</section>
	)
})

export default LandingView
