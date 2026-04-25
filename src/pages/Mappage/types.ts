import { CampData } from "@/types/camp"

export type CampMapRegion =
	| "north"
	| "northeast"
	| "central"
	| "east"
	| "west"
	| "south"

export interface CampMapRegionInfo {
	id: CampMapRegion
	label: string
	color: string
	selectedColor: string
}

export interface CampVisit {
	campID: CampData["campID"]
	name: string
	date: string
	location: string
	director: string
	imageSrc?: string
	detailHref?: string
}

export interface ProvinceSummary {
	provinceId: string
	provinceName: string
	region: CampMapRegion
	visits: CampVisit[]
	visitCount: number
	latestVisit: CampVisit
	description: string
	imageSrc?: string
}
