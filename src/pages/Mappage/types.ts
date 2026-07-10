import { CampData } from "@/types/camp"

export type CampMapRegion =
	| "north"
	| "northeast"
	| "central"
	| "east"
	| "west"
	| "south"

/** Filter / highlight mode for the memory map */
export type MapMode = "all" | "visited" | "unvisited"

export interface MapStats {
	visitedCount: number
	campRecords: number
	totalProvinces: number
	unvisitedCount: number
	explorePercent: number
}

/** Selected province that has no camp records yet */
export interface UnvisitedProvinceInfo {
	id: string
	name: string
}

/** Status filter for the province archive list */
export type ProvinceStatusFilter = "all" | "visited" | "unvisited"

/** Sort options for the province archive list */
export type ProvinceSortOption =
	| "mostVisited"
	| "recentlyVisited"
	| "alphabetical"
	| "region"

/** One row in the full Thailand province archive (visited + unvisited) */
export interface ArchiveProvinceCard {
	provinceId: string
	provinceName: string
	region: CampMapRegion
	isVisited: boolean
	visitCount: number
	latestVisitName?: string
	latestVisitCampId?: number
}

export interface CampMapRegionInfo {
	id: CampMapRegion
	label: string
	/** Thai UI label for region chips and detail panels */
	labelTh: string
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
