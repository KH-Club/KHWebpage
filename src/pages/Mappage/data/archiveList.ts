import { provinces } from "@/assets/data/provinces"
import {
	ArchiveProvinceCard,
	CampMapRegion,
	ProvinceSortOption,
	ProvinceStatusFilter,
	ProvinceSummary,
} from "../types"
import {
	getProvinceDisplayName,
	getRegionForProvince,
	mapRegions,
	visitedProvinceSummaryById,
} from "./campMapData"

export interface ArchiveListFilters {
	query: string
	region: CampMapRegion | "all"
	status: ProvinceStatusFilter
	sort: ProvinceSortOption
}

/**
 * Build archive cards for every Thailand province (visited + unvisited).
 */
export function buildArchiveProvinceCards(
	summariesById: Map<string, ProvinceSummary> = visitedProvinceSummaryById,
): ArchiveProvinceCard[] {
	return provinces.map((province) => {
		const summary = summariesById.get(province.id)

		if (summary) {
			return {
				provinceId: summary.provinceId,
				provinceName: summary.provinceName,
				region: summary.region,
				isVisited: true,
				visitCount: summary.visitCount,
				latestVisitName: summary.latestVisit.name,
				latestVisitCampId: summary.latestVisit.campID,
			}
		}

		return {
			provinceId: province.id,
			provinceName: getProvinceDisplayName(province.id, province.name),
			region: getRegionForProvince(province.id),
			isVisited: false,
			visitCount: 0,
		}
	})
}

export const allArchiveProvinceCards = buildArchiveProvinceCards()

function matchesQuery(card: ArchiveProvinceCard, query: string): boolean {
	const normalized = query.trim().toLowerCase()
	if (!normalized) return true

	const regionLabel = mapRegions[card.region]?.labelTh ?? card.region
	const haystack = [
		card.provinceName,
		card.provinceId,
		regionLabel,
		card.latestVisitName ?? "",
		card.latestVisitCampId != null ? String(card.latestVisitCampId) : "",
	]
		.join(" ")
		.toLowerCase()

	return haystack.includes(normalized)
}

/**
 * Filter and sort archive cards for the province list UI.
 */
export function filterAndSortArchiveCards(
	cards: ArchiveProvinceCard[],
	filters: ArchiveListFilters,
): ArchiveProvinceCard[] {
	const { query, region, status, sort } = filters

	const filtered = cards.filter((card) => {
		if (region !== "all" && card.region !== region) return false
		if (status === "visited" && !card.isVisited) return false
		if (status === "unvisited" && card.isVisited) return false
		return matchesQuery(card, query)
	})

	const sorted = [...filtered]

	switch (sort) {
		case "mostVisited":
			sorted.sort((a, b) => {
				if (b.visitCount !== a.visitCount) return b.visitCount - a.visitCount
				return a.provinceName.localeCompare(b.provinceName, "th")
			})
			break
		case "recentlyVisited":
			sorted.sort((a, b) => {
				const aKey = a.latestVisitCampId ?? -1
				const bKey = b.latestVisitCampId ?? -1
				if (bKey !== aKey) return bKey - aKey
				return a.provinceName.localeCompare(b.provinceName, "th")
			})
			break
		case "region":
			sorted.sort((a, b) => {
				const aRegion = mapRegions[a.region]?.labelTh ?? a.region
				const bRegion = mapRegions[b.region]?.labelTh ?? b.region
				const regionCmp = aRegion.localeCompare(bRegion, "th")
				if (regionCmp !== 0) return regionCmp
				return a.provinceName.localeCompare(b.provinceName, "th")
			})
			break
		case "alphabetical":
		default:
			sorted.sort((a, b) =>
				a.provinceName.localeCompare(b.provinceName, "th"),
			)
			break
	}

	return sorted
}

export function statusFilterFromMapMode(
	mode: "all" | "visited" | "unvisited",
): ProvinceStatusFilter {
	return mode
}

export function mapModeFromStatusFilter(
	status: ProvinceStatusFilter,
): "all" | "visited" | "unvisited" {
	return status
}
