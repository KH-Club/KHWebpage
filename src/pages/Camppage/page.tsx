import CampImage1 from "@/assets/KH52.jpg"; // Replace with actual images
import CampCard from "./components/CampCard";

interface Camp {
    name: string;
    location: string;
    imgSrc: string;
    leader: string;
}

const campData: Camp[] = [
    {
      name: 'Camp 1',
      location: 'Location 1',
      imgSrc: CampImage1,
      leader: 'Leader 1',
    },
    {
      name: 'Camp 2',
      location: 'Location 2',
      imgSrc: CampImage1,
      leader: 'Leader 2',
    },
    {
      name: 'Camp 3',
      location: 'Location 3',
      imgSrc: CampImage1,
      leader: 'Leader 3',
    },
    {
      name: 'Camp 4',
      location: 'Location 4',
      imgSrc: CampImage1,
      leader: 'Leader 4',
    },
    {
        name: 'Camp 1',
        location: 'Location 1',
        imgSrc: CampImage1,
        leader: 'Leader 1',
      },
      {
        name: 'Camp 2',
        location: 'Location 2',
        imgSrc: CampImage1,
        leader: 'Leader 2',
      },
      {
        name: 'Camp 3',
        location: 'Location 3',
        imgSrc: CampImage1,
        leader: 'Leader 3',
      },
      {
        name: 'Camp 4',
        location: 'Location 4',
        imgSrc: CampImage1,
        leader: 'Leader 4',
      },
    // Add more camps as needed
  ];
  
  const CampPage = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">ประวัติค่ายหอ</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campData.map((camp, index) => (
                    <CampCard 
                        campIndex={index} 
                        name={camp.name} 
                        imgSrc={camp.imgSrc} 
                        location={camp.location} 
                        leader={camp.leader}
                    />
                ))}
            </div>
        </div>
    );
}

  
  export default CampPage;
