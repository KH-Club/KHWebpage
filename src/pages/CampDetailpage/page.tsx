import { useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCampDetail } from "@/hooks"
import { LazyImage, Button } from "@/components/ui"
import {
	FiArrowLeft,
	FiMapPin,
	FiCalendar,
	FiUser,
	FiImage,
} from "react-icons/fi"

const CampDetailPage = () => {
	const { campID } = useParams<{ campID: string }>()
	const navigate = useNavigate()
	const parsedCampID = campID ? parseFloat(campID) : undefined
	const { camp, isLoading, error } = useCampDetail(parsedCampID)

	const handleBack = useCallback(() => {
		navigate("/camp")
	}, [navigate])

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<div className="flex flex-col items-center gap-4">
					<div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
					<p className="text-gray-500">กำลังโหลดข้อมูลค่าย...</p>
				</div>
			</div>
		)
	}

	if (error || !camp) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
				<div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
						<span className="text-3xl">😕</span>
					</div>
					<h2 className="mb-2 text-xl font-bold text-gray-900">
						ไม่พบข้อมูลค่าย
					</h2>
					<p className="mb-6 text-gray-500">
						{error?.message || "ไม่พบค่ายที่คุณต้องการ กรุณาลองใหม่อีกครั้ง"}
					</p>
					<Button onClick={handleBack} variant="primary">
						กลับไปหน้าค่ายทั้งหมด
					</Button>
				</div>
			</div>
		)
	}

	const mainImage = camp.imgSrc[0]
	const galleryImages = camp.imgSrc.slice(1)
	const hasGallery = galleryImages.length > 0

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden sm:h-[60vh]">
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${mainImage})` }}
				/>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

				{/* Back Button */}
				<div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
					<button
						onClick={handleBack}
						className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
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
							{camp.name ? `"${camp.name}"` : `ค่ายหอ ครั้งที่ ${campID}`}
						</h1>
						<p className="flex items-center gap-2 text-lg text-white/80">
							<FiMapPin className="h-5 w-5" />
							{camp.location}
						</p>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="container mx-auto px-6 py-8 sm:py-12">
				<div className="grid gap-8 lg:grid-cols-3">
					{/* Info Cards */}
					<div className="lg:col-span-1">
						<div className="sticky top-6 space-y-4">
							{/* Location Card */}
							<div className="rounded-2xl bg-white p-6 shadow-md">
								<div className="mb-3 flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
										<FiMapPin className="h-5 w-5 text-blue-600" />
									</div>
									<h3 className="font-semibold text-gray-900">สถานที่จัด</h3>
								</div>
								<p className="text-gray-700">{camp.location}</p>
							</div>

							{/* Date Card */}
							<div className="rounded-2xl bg-white p-6 shadow-md">
								<div className="mb-3 flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
										<FiCalendar className="h-5 w-5 text-green-600" />
									</div>
									<h3 className="font-semibold text-gray-900">ช่วงเวลาจัด</h3>
								</div>
								<p className="text-gray-700">{camp.date}</p>
							</div>

							{/* Director Card */}
							<div className="rounded-2xl bg-white p-6 shadow-md">
								<div className="mb-3 flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
										<FiUser className="h-5 w-5 text-purple-600" />
									</div>
									<h3 className="font-semibold text-gray-900">
										ผู้อำนวยการค่าย
									</h3>
								</div>
								<p className="text-gray-700">{camp.director}</p>
							</div>

							{/* Back Button - Mobile */}
							<div className="pt-4 lg:hidden">
								<Button
									onClick={handleBack}
									variant="outline"
									className="w-full"
								>
									<FiArrowLeft className="mr-2 h-4 w-4" />
									กลับไปหน้าค่ายทั้งหมด
								</Button>
							</div>
						</div>
					</div>

					{/* Gallery Section */}
					<div className="lg:col-span-2">
						{hasGallery ? (
							<div>
								<div className="mb-6 flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
										<FiImage className="h-5 w-5 text-orange-600" />
									</div>
									<h2 className="text-xl font-bold text-gray-900">
										รูปภาพกิจกรรม
									</h2>
									<span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
										{camp.imgSrc.length} รูป
									</span>
								</div>

								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									{/* Main Featured Image */}
									<div className="group relative overflow-hidden rounded-2xl sm:col-span-2">
										<LazyImage
											src={mainImage}
											alt={`${camp.name} - Main`}
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
												alt={`${camp.name} - Image ${index + 2}`}
												className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										</div>
									))}
								</div>
							</div>
						) : (
							<div className="rounded-2xl bg-white p-8 shadow-md">
								<div className="mb-4 flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
										<FiImage className="h-5 w-5 text-orange-600" />
									</div>
									<h2 className="text-xl font-bold text-gray-900">
										รูปภาพกิจกรรม
									</h2>
								</div>

								{/* Single Image Display */}
								<div className="group relative overflow-hidden rounded-2xl">
									<LazyImage
										src={mainImage}
										alt={`${camp.name}`}
										className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CampDetailPage
