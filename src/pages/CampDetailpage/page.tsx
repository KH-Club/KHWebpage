import { useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCampDetail } from "@/hooks"
import { Button } from "@/components/ui"
import { FiArrowLeft, FiMapPin, FiCalendar, FiUser } from "react-icons/fi"
import {
	CampDetailHero,
	CampInfoCard,
	CampGallery,
	CampDetailLoading,
	CampDetailError,
} from "./components"

const CampDetailPage = () => {
	const { campID } = useParams<{ campID: string }>()
	const navigate = useNavigate()
	const parsedCampID = campID ? parseFloat(campID) : undefined
	const { camp, isLoading, error } = useCampDetail(parsedCampID)

	const handleBack = useCallback(() => {
		navigate("/camp")
	}, [navigate])

	if (isLoading) {
		return <CampDetailLoading />
	}

	if (error || !camp) {
		return <CampDetailError message={error?.message} onBack={handleBack} />
	}

	const mainImage = camp.imgSrc[0]

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<CampDetailHero
				campID={campID || ""}
				campName={camp.name}
				location={camp.location}
				mainImage={mainImage}
				onBack={handleBack}
			/>

			{/* Content Section */}
			<div className="container mx-auto px-6 py-8 sm:py-12">
				<div className="grid gap-8 lg:grid-cols-3">
					{/* Info Cards */}
					<div className="lg:col-span-1">
						<div className="sticky top-6 space-y-4">
							<CampInfoCard
								icon={<FiMapPin className="h-5 w-5 text-blue-600" />}
								iconBgColor="bg-blue-100"
								title="สถานที่จัด"
								value={camp.location}
							/>

							<CampInfoCard
								icon={<FiCalendar className="h-5 w-5 text-green-600" />}
								iconBgColor="bg-green-100"
								title="ช่วงเวลาจัด"
								value={camp.date}
							/>

							<CampInfoCard
								icon={<FiUser className="h-5 w-5 text-purple-600" />}
								iconBgColor="bg-purple-100"
								title="ผู้อำนวยการค่าย"
								value={camp.director}
							/>

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
						<CampGallery
							campName={camp.name || `ค่ายหอ ครั้งที่ ${campID}`}
							images={camp.imgSrc}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CampDetailPage
