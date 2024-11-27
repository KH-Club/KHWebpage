import { CampData } from "@/types/camp";
import CampCard from "./CampCard";

interface ListViewProp {
    campsList: CampData[];
}

export default function ListView(props: ListViewProp) {
    return (
        <div className="h-[768px] overflow-y-scroll rounded-lg bg-gray-50 p-4 shadow-lg">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {props.campsList.map((camp) => (
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
            </div>
        </div>
    );
}
