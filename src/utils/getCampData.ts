import { CampData } from "@/types/camp"

const getMainCampsData = async (): Promise<CampData[]> => {
	const filePath = "/src/assets/data/KHdata.json"
	const response = await fetch(filePath)
	const data = await response.json()
	const campsData: CampData[] = data.map(
		(camp: {
			campID: number
			name: string
			location: string
			director: string
			imgSrc: string[]
			date : string
		}) => ({
			campID: camp.campID,
			name: camp.name,
			date : camp.date,
			location: camp.location,
			imgSrc: camp.imgSrc ?? ["/src/assets/images/camps/main/52/KH52.jpg"],
			director: camp.director,
		}),
	)
	return campsData.reverse()
}

const getMainCampsDataByCampID = async (campID: number): Promise<CampData> => {
	const campsData = await getMainCampsData();
	const camp = campsData.find(camp => camp.campID === campID)
	if(!camp) throw Error(`Camp with ${campID} is not found`)
	return camp;
};

export { 
	getMainCampsData ,
	getMainCampsDataByCampID
}
