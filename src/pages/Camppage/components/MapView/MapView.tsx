import React, { useState } from 'react';
import ThailandMap from './Map'; // Assuming ThailandMap is renamed to Map
import ProvinceDetails from './ProvinceDetails'; // New component for showing details
import { CampData } from '@/types/camp';
interface MapViewProps{
  campsList : CampData[]
}
const MapView = (props : MapViewProps) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const filterCamps = props.campsList.filter((camp) => camp.province === hoveredProvince)
  const handleProvinceHover = (name: string | null) => {
    setHoveredProvince(name);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 overflow-auto p-4">
        <ThailandMap onProvinceHover={handleProvinceHover} />
      </div>
      <div className="w-full md:w-1/3 p-4">
        <ProvinceDetails provinceName={hoveredProvince} campsList={filterCamps} />
      </div>
    </div>
  );
};

export default MapView;
