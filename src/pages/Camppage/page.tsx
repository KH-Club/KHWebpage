import { useEffect, useState } from "react";
import CampCard from "./components/CampCard";
import { getCampsData } from "@/utils/getCampData";
interface Camp {
    id : number;
    name: string;
    location: string;
    imgSrc: string;
    director: string;
}

const CampPage = () => {
    const [campsData, setCampsData] = useState<Camp[]>([]);

    const fetchCampsData = async () => {
        const campsData = await getCampsData();
        setCampsData(campsData);
        return campsData;
    };

    useEffect(() => {
        fetchCampsData();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">ประวัติค่ายหอ</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campsData.map((camp) => (
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
    );
};

export default CampPage;
