import { memo } from "react"
import { FiImage } from "react-icons/fi"
import { LazyImage } from "@/components/ui"

export interface CampGalleryProps {
	campName: string
	images: string[]
}

export const CampGallery = memo(function CampGallery({
	campName,
	images,
}: CampGalleryProps) {
	const mainImage = images[0]
	const galleryImages = images.slice(1)
	const hasGallery = galleryImages.length > 0

	if (hasGallery) {
		return (
			<div>
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
						<FiImage className="h-5 w-5 text-orange-600" />
					</div>
					<h2 className="text-xl font-bold text-gray-900">รูปภาพกิจกรรม</h2>
					<span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
						{images.length} รูป
					</span>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{/* Main Featured Image */}
					<div className="group relative overflow-hidden rounded-2xl sm:col-span-2">
						<LazyImage
							src={mainImage}
							alt={`${campName} - Main`}
							className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</div>

					{/* Gallery Images */}
					{galleryImages.map((src, index) => (
						<div
							key={`gallery-${index}`}
							className="group relative overflow-hidden rounded-2xl"
						>
							<LazyImage
								src={src}
								alt={`${campName} - Image ${index + 2}`}
								className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className="rounded-2xl bg-white p-8 shadow-md">
			<div className="mb-4 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
					<FiImage className="h-5 w-5 text-orange-600" />
				</div>
				<h2 className="text-xl font-bold text-gray-900">รูปภาพกิจกรรม</h2>
			</div>

			{/* Single Image Display */}
			<div className="group relative overflow-hidden rounded-2xl">
				<LazyImage
					src={mainImage}
					alt={campName}
					className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
		</div>
	)
})

export default CampGallery
