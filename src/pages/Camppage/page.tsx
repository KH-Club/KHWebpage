import { useEffect, useState } from "react";
import CampSearchComponent from "./components/ListView/CampSearch";
import { getMainCampsData } from "@/utils/getCampData";
import { CampData } from "@/types/camp";
import ListView from "./components/ListView/ListView";

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
            <CampSearchComponent onSearch={handleSearch} />
            <ListView campsList={filteredCamps}/>
        </div>
    );
};

export default CampPage;
