import { CampRawData } from "@/types/camp"

const getCampDataByCampID = async (campID:number): Promise<CampRawData|null> => {
	const filePath = "/src/assets/data/KHdata.json"
	const response = await fetch(filePath)
	const data = await response.json()
	for (let i = 0; i < data.length; i++) {
		const subData:CampRawData = data[i]
		if (subData.campID === campID) {
			return subData
		}
	}
	return null
}

export default getCampDataByCampID 
