interface Camp {
	id: number
	name: string
	location: string
	imgSrc: string
	director: string
}

const getCampsData = async (): Promise<Camp[]> => {
	const filePath = "/src/assets/data/KHdata.json"
	const response = await fetch(filePath)
	const data = await response.json()
	const campsData: Camp[] = data.map(
		(camp: {
			campID: number
			name: string
			location: string
			director: string
			imgSrc: string
		}) => ({
			id: camp.campID,
			name: camp.name,
			location: camp.location,
			imgSrc: camp.imgSrc ?? "/src/assets/images/camps/KH52.jpg",
			director: camp.director,
		}),
	)

	return campsData.reverse()
}

export { getCampsData }
