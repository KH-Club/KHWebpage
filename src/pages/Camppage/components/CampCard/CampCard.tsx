import { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { LazyImage } from "@/components/ui"

export interface CampCardProps {
	id: number
	name: string
	imgSrc: string
	location: string
	director: string
	date: string
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

	const displayName = name ? `"${name}"` : ""

	return (
		<article
			onClick={handleCardClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
			className="m-4 transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			aria-label={`View details for camp ${id} ${name}`}
		>
			<LazyImage
				src={imgSrc}
				alt={`Camp ${id} ${name}`}
				className="h-60 w-full object-cover"
			/>
			<div className="p-4">
				<h2 className="mb-2 text-lg font-bold">
					ค่ายหอ ครั้งที่ {id} {displayName}
				</h2>
				<p className="mb-2 text-gray-700">จัดที่ {location}</p>
				<p className="mb-2 text-gray-700">จัดช่วง {date}</p>
				<p className="text-gray-700">ผู้อำนวยการค่าย : {director}</p>
			</div>
		</article>
	)
})

export default CampCard
