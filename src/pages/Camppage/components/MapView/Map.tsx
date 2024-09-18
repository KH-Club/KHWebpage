import React, { useState, useRef } from 'react';
import mapData from '@svg-maps/thailand';

interface MapProps {
  onProvinceHover: (name: string | null) => void;
}

const ThailandMap = ({ onProvinceHover }: MapProps) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeOutDelay: number = 100;

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredProvince(name);
    onProvinceHover(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onProvinceHover(null);
    }, timeOutDelay);
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
            fill={hoveredProvince === location.name ? 'black' : 'none'}
            stroke="black"
            strokeWidth="1"
            onMouseEnter={() => handleMouseEnter(location.name)}
            onMouseLeave={handleMouseLeave}
          >
            <title>{location.name}</title>
          </path>
        ))}
      </svg>
    </div>
  );
};

export default ThailandMap;
