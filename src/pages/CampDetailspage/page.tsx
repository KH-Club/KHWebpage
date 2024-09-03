import { useParams } from 'react-router-dom';
import { useState } from 'react';
import getCampDataByCampID from '@/utils/getCampDataByCampID';
import { CampRawData } from '@/types/camp';

const CampDetailPage = () => {
    const { campID } = useParams<{ campID: string }>();
    const [campsData, setCampsData] = useState<CampRawData>();
    const campId: number = Number(campID)
    getCampDataByCampID(campId).then((data) => {
        if (data !== null) {
            setCampsData(data)
        }
    })
    return (
        <div className="container mx-auto p-6" >
            <h1 className="text-3xl font-bold mb-6 text-center">{campsData?.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div>
                        <img
                            src={campsData?.imgSrc}
                            alt={campsData?.name}
                            className="w-full object-cover rounded"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <h2>ผู้อำนวยการค่าย : {campsData?.director}</h2>
                        <h2>จัดที่ : {campsData?.location}</h2>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CampDetailPage;
