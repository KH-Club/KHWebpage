interface CampCardProp{
    id : number;
    name : string;
    imgSrc : string;
    location : string;
    director: string;
}

const CampCard = (prop : CampCardProp) =>{
    return(
        <div key={prop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
            src={prop.imgSrc}
            alt={prop.name}
            className="w-full h-40 object-cover"
        />
        <div className="p-4">
            <h2 className="text-lg font-bold mb-2">ค่ายหอ ครั้งที่ {prop.id} "{prop.name}"</h2>
            <p className="text-gray-700 mb-2">จัดที่ {prop.location}</p>
            <p className="text-gray-700">ผู้อำนวยการค่าย : {prop.director}</p>
        </div>
    </div>
    )
};

export default CampCard;