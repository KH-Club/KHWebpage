import React, { useState } from 'react';
import ThailandMap from './Map'; // Assuming ThailandMap is renamed to Map
import ProvinceDetails from './ProvinceDetails'; // New component for showing details
import { CampData } from '@/types/camp';
interface MapViewProps{
  campsList : CampData[]
}
const MapView = (props : MapViewProps) => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const filterCamps = props.campsList.filter((camp) => camp.province === selectedProvince)
  const handleProvinceSelect = (name: string | null) => {
    setSelectedProvince(name);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex-1 overflow-auto p-4">
        <ThailandMap  onProvinceSelect={handleProvinceSelect} />
      </div>
      <div className="w-full p-4 md:w-1/3">
        <ProvinceDetails provinceName={selectedProvince} campsList={filterCamps} />
      </div>
    </div>
  );
};

export default MapView;
