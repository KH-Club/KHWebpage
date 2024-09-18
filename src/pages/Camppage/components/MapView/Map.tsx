import React, { useState, useRef } from 'react';
import mapData from '@svg-maps/thailand';

interface MapProps {
  onProvinceSelect: (name: string | null) => void; // Add a callback for selecting a province
}

const ThailandMap = ({ onProvinceSelect }: MapProps) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null); // State for selected province
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeOutDelay: number = 100;

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredProvince(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredProvince(null);
    }, timeOutDelay);
  };

  const handleClick = (name: string) => {
    setSelectedProvince(name);
    onProvinceSelect(name);
  };

  return (
    <div style={{ position: 'relative' }}>
      <svg
        viewBox={mapData.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        width="50%"
        height="50%"
      >
        {mapData.locations.map((location: any) => (
          <path
            key={location.id}
            d={location.path}
            fill={selectedProvince === location.name ? 'black' : (hoveredProvince === location.name ? 'gray' : 'none')}
            stroke="black"
            strokeWidth="1"
            onMouseEnter={() => handleMouseEnter(location.name)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(location.name)}
          >
            <title>{location.name}</title>
          </path>
        ))}
      </svg>
    </div>
  );
};

export default ThailandMap;
