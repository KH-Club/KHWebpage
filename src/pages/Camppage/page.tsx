import { useEffect, useState } from "react";
import CampCard from "./components/CampCard";
import CampSearchComponent from "./components/CampSearch";
import { getCampsData } from "@/utils/getCampData";

interface Camp {
    id: number;
    name: string;
    location: string;
    imgSrc: string;
    director: string;
}

const CampPage = () => {
    const [campsData, setCampsData] = useState<Camp[]>([]);
    const [filteredCamps, setFilteredCamps] = useState<Camp[]>([]);

    const fetchCampsData = async () => {
        const campsData = await getCampsData();
        setCampsData(campsData);
        setFilteredCamps(campsData);
        return campsData;
    };

    useEffect(() => {
        fetchCampsData();
    }, []);

    const handleSearch = (query: string, filterBy: string) => {
        const filtered = campsData.filter((camp) =>
            camp[filterBy as keyof Camp]
                .toString()
                .toLowerCase()
                .includes(query.toLowerCase())
        );
        setFilteredCamps(filtered);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">ประวัติค่ายหอ</h1>
            <CampSearchComponent onSearch={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    );
};

export default CampPage;
