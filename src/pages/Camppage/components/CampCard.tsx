interface CampCardProp{
    campIndex : number;
    name : string;
    imgSrc : string;
    location : string;
    leader : string;
}

const CampCard = (prop : CampCardProp) =>{
    return(
        <div key={prop.campIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
            src={prop.imgSrc}
            alt={prop.name}
            className="w-full h-40 object-cover"
        />
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{prop.name}</h2>
            <p className="text-gray-700 mb-2">Location: {prop.location}</p>
            <p className="text-gray-700">Leader: {prop.leader}</p>
        </div>
    </div>
    )
};

export default CampCard;