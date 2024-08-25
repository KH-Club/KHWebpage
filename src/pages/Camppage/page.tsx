import { useEffect, useState } from "react"
import CampCard from "./components/CampCard"
import CampSearch from "./components/CampSearch"
import { getCampsData } from "@/utils/getCampData"
interface Camp {
	id: number
	name: string
	location: string
	imgSrc: string
	director: string
}


const CampPage = () => {
	const [campsData, setCampsData] = useState<Camp[]>([])
	const [searchTerm, setSearchTerm] = useState<string>("")

	const fetchCampsData = async () => {
		const campsData = await getCampsData()
		setCampsData(campsData)
		return campsData
	}

	useEffect(() => {
		fetchCampsData()
	}, [])

	const filteredCamps = campsData.filter(
		(camp) =>
			camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
			camp.director.toLowerCase().includes(searchTerm.toLowerCase()),
	)

	return (
		<div className="container mx-auto p-6">
			<h1 className="mb-6 text-center text-3xl font-bold">ประวัติค่ายหอ</h1>
			<CampSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{filteredCamps.map((camp) => (
					<CampCard
						key={camp.id}
						id={camp.id}
						name={camp.name}
						imgSrc={camp.imgSrc}
						location={camp.location}
						director={camp.director}
					/>
				))}
			</div>
		</div>
	)
}

export default CampPage
