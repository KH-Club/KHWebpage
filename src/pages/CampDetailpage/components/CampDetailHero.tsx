import { memo } from "react"
import { FiArrowLeft, FiMapPin } from "react-icons/fi"

export interface CampDetailHeroProps {
	campID: string
	campName?: string
	location: string
	mainImage: string
	onBack: () => void
}

export const CampDetailHero = memo(function CampDetailHero({
	campID,
	campName,
	location,
	mainImage,
	onBack,
}: CampDetailHeroProps) {
	return (
		<div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden sm:h-[60vh]">
			{/* Background Image */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: `url(${mainImage})` }}
				data-testid="hero-background"
			/>

			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

			{/* Back Button */}
			<div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
				<button
					onClick={onBack}
					className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
					aria-label="Go back"
				>
					<FiArrowLeft className="h-4 w-4" />
					<span className="hidden sm:inline">กลับ</span>
				</button>
			</div>

			{/* Camp Badge */}
			<div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
				<div className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
					ครั้งที่ {campID}
				</div>
			</div>

			{/* Hero Content */}
			<div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 md:p-12">
				<div className="container mx-auto">
					<h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
						{campName ? `"${campName}"` : `ค่ายหอ ครั้งที่ ${campID}`}
					</h1>
					<p className="flex items-center gap-2 text-lg text-white/80">
						<FiMapPin className="h-5 w-5" />
						{location}
					</p>
				</div>
			</div>
		</div>
	)
})

export default CampDetailHero
