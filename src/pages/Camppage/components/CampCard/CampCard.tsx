import { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { LazyImage } from "@/components/ui"
import { FiMapPin, FiCalendar, FiUser } from "react-icons/fi"

export interface CampCardProps {
	id: number
	name: string
	imgSrc: string
	location: string
	director: string
	date: string
	province?: string
}

const CampCard = memo(function CampCard({
	id,
	name,
	imgSrc,
	location,
	director,
	date,
}: CampCardProps) {
	const navigate = useNavigate()

	const handleCardClick = useCallback(() => {
		navigate(`/camp/${id}`)
	}, [navigate, id])

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault()
				handleCardClick()
			}
		},
		[handleCardClick],
	)

	return (
		<article
			onClick={handleCardClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
			className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			aria-label={`View details for camp ${id} ${name}`}
		>
			{/* Image Container */}
			<div className="relative h-52 overflow-hidden sm:h-56 md:h-64">
				<LazyImage
					src={imgSrc}
					alt={`Camp ${id} ${name}`}
					wrapperClassName="absolute inset-0"
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

				{/* Camp Number Badge */}
				<div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
					ครั้งที่ {id}
				</div>

				{/* Date Badge */}
				<div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800 backdrop-blur-sm">
					<FiCalendar className="h-3.5 w-3.5" />
					{date}
				</div>
			</div>

			{/* Content */}
			<div className="p-5">
				{/* Title */}
				<h2 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-xl">
					{name ? `"${name}"` : `ค่ายหอ ครั้งที่ ${id}`}
				</h2>

				{/* Info Items */}
				<div className="space-y-2">
					<div className="flex items-start gap-2 text-sm text-gray-600">
						<FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
						<span className="line-clamp-1">{location}</span>
					</div>

					<div className="flex items-start gap-2 text-sm text-gray-600">
						<FiUser className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
						<span className="line-clamp-1">ผอ.ค่าย: {director}</span>
					</div>
				</div>

				{/* View Details Link */}
				<div className="mt-4 flex items-center text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
					ดูรายละเอียด
					<svg
						className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</div>
			</div>
		</article>
	)
})

export default CampCard
