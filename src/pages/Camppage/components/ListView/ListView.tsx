import { memo } from "react"
import { CampData } from "@/types/camp"
import CampCard from "../CampCard"

export interface ListViewProps {
  campsList: CampData[]
}

const ListView = memo(function ListView({ campsList }: ListViewProps) {
  if (campsList.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50 p-4 shadow-lg">
        <p className="text-gray-500">No camps found matching your search.</p>
      </div>
    )
  }

  return (
    <div
      className="h-[768px] overflow-y-auto rounded-lg bg-gray-50 p-4 shadow-lg"
      role="list"
      aria-label="Camp list"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {campsList.map(camp => (
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
  )
})

export default ListView
