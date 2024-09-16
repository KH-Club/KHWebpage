import { useEffect, useState } from "react";
import CampCard from "./components/CampCard";
import CampSearchComponent from "./components/CampSearch";
import { getMainCampsData } from "@/utils/getCampData";
import { CampData } from "@/types/camp";

const CampPage = () => {
    const [campsData, setCampsData] = useState<CampData[]>([]);
    const [filteredCamps, setFilteredCamps] = useState<CampData[]>([]);

    const fetchCampsData = async () => {
        const campsData = await getMainCampsData();
        setCampsData(campsData);
        setFilteredCamps(campsData);
        return campsData;
    };

    useEffect(() => {
        fetchCampsData();
    }, []);

    const handleSearch = (query: string, filterBy: string) => {
        const filtered = campsData.filter((camp) =>
            camp[filterBy as keyof CampData]
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
                        key={camp.campID}
                        id={camp.campID}
                        name={camp.name}
                        imgSrc={camp.imgSrc[0]}
                        location={camp.location}
                        director={camp.director}
                        date={camp.date}
                    />
                ))}
            </div>
        </div>
    );
};

export default CampPage;
