interface ActivityCardProp {
    tailwindClass: string;
    name: string;
    imgSrc: string;
    description: string;
    onClick: () => void;
}

const ActivityCard = (props: ActivityCardProp) => {
    return (
        <div 
            className={`${props.tailwindClass} relative cursor-pointer transition duration-300 ease-in-out transform hover:scale-105`} 
            onClick={props.onClick}
        >
            <img
                src={props.imgSrc}
                alt={props.name}
                className="h-64 w-full rounded-lg object-cover shadow-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold">
                {props.name}
            </div>
        </div>
    )
};

export default ActivityCard;
