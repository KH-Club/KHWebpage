interface Camp  {
    id : number;
    name: string;
    location: string;
    imgSrc: string;
    director: string;
}

const getCampsData = async() :  Promise<Camp[]> =>{
    const filePath = "/src/assets/data/KHdata.json";
    const response = await fetch(filePath)
    const data = await response.json()
    const campsData : Camp[] = data.map((camp: { campID: any; name: any; location: any; director: any; })  => ({
        id : camp.campID,
        name : camp.name,
        location : camp.location,
        imgSrc : '/src/assets/KH52.jpg',
        director : camp.director
    }))

    return campsData.reverse();
}

export {
    getCampsData
}
