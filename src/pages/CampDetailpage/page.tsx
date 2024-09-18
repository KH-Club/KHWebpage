import { CampData } from "@/types/camp"
import { getMainCampsDataByCampID } from "@/utils/getCampData"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CampDetailPage = () => {
	const [campDetail,setCampDetail] = useState<CampData>()
	const { campID } = useParams<{ campID: string }>()
	const fetchCampDetail = async() =>{
		if(!campID) throw Error("CampID is not valid")
		const campDetail : CampData = await getMainCampsDataByCampID(parseInt(campID));
		setCampDetail(campDetail)
		return campDetail;
	}

	useEffect(() =>{
		fetchCampDetail()
	},[])
	return (
		campDetail ?
		<div className="container mx-auto p-6">
			<h1 className="mb-6 text-center text-4xl font-extrabold">
				ค่ายหอ ครั้งที่ {campID} {campDetail.name !== '' ? `"${campDetail.name}"` : campDetail.name}
			</h1>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{campDetail.imgSrc.map((src, index) => (
					<img
						key={index}
						src={src}
						alt={`Camp ${campDetail.name} Image ${index + 1}`}
						className="h-48 w-full rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-64"
					/>
				))}
			</div>
			<div className="mt-8 rounded-lg bg-gray-100 p-6 shadow-lg">
				<p className="mb-4">
					<strong className="text-lg">จัดที่ :</strong> {campDetail.location}
				</p>
				<p className="mb-4">
					<strong className="text-lg">จัดช่วง :</strong> {campDetail.date}
				</p>
				<p className="mb-4">
					<strong className="text-lg">ผู้อำนวยการค่าย :</strong> {campDetail.director}
				</p>
			</div>
		</div>
		:
		<></>
	)
}

export default CampDetailPage
