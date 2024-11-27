import { KHCamps } from "@/assets/data/KHdata"
import { CampData } from "@/types/camp"

const getMainCampsData = async (): Promise<CampData[]> => {
	
	const campsData: CampData[] = KHCamps.map(
		(camp: CampData) => ({
			campID: camp.campID,
            name: camp.name, 
            location: camp.location || "-", 
            director: camp.director || "-", 
            date: camp.date || "-",
            imgSrc: camp.imgSrc?.length ? camp.imgSrc : ["/camps/homepagebackground.jpg"], 
            province: camp.province || "-", 
			isMainCamp : true
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
