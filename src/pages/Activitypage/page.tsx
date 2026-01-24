import KrongArsaImage from "@/assets/images/activitys/krongarsa.jpg"
import KrongFoodImage from "@/assets/images/activitys/krongfood.jpg"
import KrongKidImage from "@/assets/images/activitys/krongkid.jpg"
import KrongSampanImage from "@/assets/images/activitys/krongsampan.jpg"
import KrongNganImage from "@/assets/images/activitys/krongngan.jpg"
import FunImage from "@/assets/images/activitys/fun.jpg"
import ActivityCard from "@/pages/Activitypage/components/ActivityCard"
import ActivityPopup from "@/pages/Activitypage/components/ActivityPopup"

import { useState } from "react"

export interface Activity {
	name: string
	imgSrc: string
	description: string
}

const ActivityPage = () => {
	const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
		null,
	)

	const activityList = [
		{
			name: "โครงอาสา",
			imgSrc: KrongArsaImage,
			description: "โครงอาสา",
		},
		{
			name: "โครงเด็ก",
			imgSrc: KrongKidImage,
			description: "โครงอาสา",
		},
		{
			name: "โครงสวัสดิการ",
			imgSrc: KrongFoodImage,
			description: "โครงอาสา",
		},
		{
			name: "โครงสัมพันธ์ชุมชน",
			imgSrc: KrongSampanImage,
			description: "โครงอาสา",
		},
		{
			name: "โครงงานก่อสร้าง",
			imgSrc: KrongNganImage,
			description: "โครงอาสา",
		},
		{
			name: "กิจกรรมสานสัมพันธ์",
			imgSrc: FunImage,
			description: "กิจกรรมสานสัมพันธ์",
		},
	]

	return (
		<section className="bg-gray-100 py-12">
			<div className="container mx-auto p-4">
				<h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
					กิจกรรมของค่ายหอ
				</h2>
				{/* Responsive Grid Layout */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
					{activityList.map((activity, index) => (
						<ActivityCard
							key={index}
							{...activity}
							onClick={() => setSelectedActivity(activity)}
						/>
					))}
				</div>

				{/* Show Activity Popup if selected */}
				{selectedActivity && (
					<ActivityPopup
						name={selectedActivity.name}
						imgSrc={selectedActivity.imgSrc}
						description={selectedActivity.description}
						onClose={() => setSelectedActivity(null)}
					/>
				)}
			</div>
		</section>
	)
}

export default ActivityPage
