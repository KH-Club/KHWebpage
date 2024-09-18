import { useEffect, useState } from "react";
import CampSearchComponent from "./components/ListView/CampSearch";
import { getMainCampsData } from "@/utils/getCampData";
import { CampData } from "@/types/camp";
import ListView from "./components/ListView/ListView";
import MapView from "./components/MapView/MapView";

const CampPage = () => {
    const [campsData, setCampsData] = useState<CampData[]>([]);
    const [filteredCamps, setFilteredCamps] = useState<CampData[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list'); // New state for view mode

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

    const toggleViewMode = (mode: 'list' | 'map') => {
        setViewMode(mode);
    };

    const ToggleView = () =>{
        return(
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">ประวัติค่ายหอ</h1>
                <div className="flex space-x-4">
                    <button
                        className={`rounded-lg px-4 py-2 ${viewMode === 'list' ? 'bg-blue-500 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-600 md:mt-0' : 'bg-gray-200'}`}
                        onClick={() => toggleViewMode('list')}
                    >
                        List View
                    </button>
                    <button
                        className={`rounded-lg px-4 py-2 ${viewMode === 'map' ? ' bg-blue-500 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-600 md:mt-0' : 'bg-gray-200'}`}
                        onClick={() => toggleViewMode('map')}
                    >
                        Map View
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <ToggleView/>
            {viewMode === 'list' ? (
                <>
                    <CampSearchComponent onSearch={handleSearch} />
                    <ListView campsList={filteredCamps}/>
                </>
            ) : (
                <MapView campsList={campsData}/> 
            )}
        </div>
    );
};

export default CampPage;
