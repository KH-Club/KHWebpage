import { CampData } from '@/types/camp';
import CampCard from '../ListView/CampCard';

interface ProvinceDetailsProps {
  provinceName: string | null;
  campsList: CampData[];
}

const ProvinceDetails = ({ provinceName, campsList }: ProvinceDetailsProps) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <div>
        {provinceName ? (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              จังหวัด : {provinceName}
            </h3>
            {campsList.length > 0 ? (
              <ul className="space-y-4">
                {campsList.map((camp) => (
                  <li key={camp.campID}>
                    <CampCard
                      id={camp.campID}
                      name={camp.name}
                      imgSrc={camp.imgSrc[0]}
                      location={camp.location}
                      director={camp.director}
                      date={camp.date}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No camps available for this province.</p>
            )}
          </div>
        ) : (
          <p className="text-gray-600">Hover over a province to see details.</p>
        )}
      </div>
    </div>
  );
};

export default ProvinceDetails;
