import { memo } from "react"
import { CampData } from "@/types/camp"
import CampCard from "./CampCard"
import { FiSearch } from "react-icons/fi"

export interface ListViewProps {
	campsList: CampData[]
}

const ListView = memo(function ListView({ campsList }: ListViewProps) {
	if (campsList.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 py-16">
				<div className="mb-4 rounded-full bg-gray-100 p-4">
					<FiSearch className="h-8 w-8 text-gray-400" />
				</div>
				<h3 className="mb-2 text-lg font-semibold text-gray-700">
					ไม่พบค่ายที่ค้นหา
				</h3>
				<p className="text-gray-500">ลองค้นหาด้วยคำอื่น หรือล้างการค้นหา</p>
			</div>
		)
	}

	return (
		<div role="list" aria-label="Camp list">
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{campsList.map((camp) => (
					<CampCard
						key={camp.campID}
						id={camp.campID}
						name={camp.name}
						imgSrc={camp.imgSrc[0]}
						location={camp.location}
						director={camp.director}
						date={camp.date}
						province={camp.province}
					/>
				))}
			</div>
		</div>
	)
})

export default ListView
