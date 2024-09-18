import { CampData } from '@/types/camp';
import CampCard from '../ListView/CampCard';

interface ProvinceDetailsProps {
  provinceName: string | null;
  campsList: CampData[];
}

const ProvinceDetails = ({ provinceName, campsList }: ProvinceDetailsProps) => {
  return (
    <div>
      <div>
        {provinceName ? (
          <div>
            <h3 className="text-lg font-semibold">{provinceName}</h3>
            {campsList.length > 0 ? (
              <ul>
                {campsList.map((camp) => (
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
              </ul>
            ) : (
              <p>No camps available for this province.</p>
            )}
          </div>
        ) : (
          <p>Hover over a province to see details.</p>
        )}
      </div>
    </div>
  );
};

export default ProvinceDetails;
